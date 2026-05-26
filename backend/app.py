from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity
)
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from flask import send_from_directory
import os

# =========================================================
# APP CONFIG
# =========================================================

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

DB_PATH = os.path.abspath(os.path.join(BASE_DIR, '../database/nexestate.db'))
UPLOAD_FOLDER = os.path.abspath(
    os.path.join(BASE_DIR, '../mobile/YooriODLegacy/uploads')
)

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + DB_PATH
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = "nexestate_super_secure_2026_realestate_key_12345"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

db = SQLAlchemy(app)
jwt = JWTManager(app)

# =========================================================
# MODELS
# =========================================================

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    phone = db.Column(db.String(50))
    ren_tag = db.Column(db.String(50))
    agency = db.Column(db.String(100))

    listings = db.relationship('Listing', backref='user', lazy=True)


class Listing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    title = db.Column(db.String(200), nullable=False)
    property_type = db.Column(db.String(100))
    address = db.Column(db.String(255))
    state = db.Column(db.String(100))

    selling_price = db.Column(db.Float)

    bedrooms = db.Column(db.Integer)
    bathrooms = db.Column(db.Integer)
    parking = db.Column(db.Integer)

    description = db.Column(db.Text)

    agent_name = db.Column(db.String(100))
    agent_phone = db.Column(db.String(50))
    agent_email = db.Column(db.String(120))

    # ⭐ NEW: store image filenames (comma-separated)
    images = db.Column(db.Text)

    status = db.Column(db.String(50), default="active")

# =========================================================
# SERVE IMAGES
# =========================================================

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# =========================================================
# HOME
# =========================================================

@app.route('/')
def home():
    return jsonify({"app": "NexEstate PRO", "status": "running"})

# =========================================================
# REGISTER
# =========================================================

@app.route('/register', methods=['POST'])
def register():
    data = request.json

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "Email already registered"}), 400

    user = User(
        name=data['name'],
        email=data['email'],
        password=generate_password_hash(data['password'])
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"})

# =========================================================
# LOGIN
# =========================================================

@app.route('/login', methods=['POST'])
def login():
    data = request.json

    user = User.query.filter_by(email=data['email']).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    if not check_password_hash(user.password, data['password']):
        return jsonify({"message": "Invalid password"}), 401

    token = create_access_token(identity=str(user.id))

    return jsonify({
        "message": "Login successful",
        "token": token
    })

# =========================================================
# CREATE LISTING + IMAGE UPLOAD
# =========================================================

@app.route('/listings', methods=['POST'])
@jwt_required()
def create_listing():
    user_id = int(get_jwt_identity())

    # TEXT FIELDS
    title = request.form.get('title')
    property_type = request.form.get('property_type')
    address = request.form.get('address')
    state = request.form.get('state')
    selling_price = request.form.get('selling_price')
    description = request.form.get('description')

    # FILES
    files = request.files.getlist("images")

    image_names = []

    for file in files:
        if file:
            filename = secure_filename(file.filename)
            save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(save_path)
            image_names.append(filename)

    listing = Listing(
        user_id=user_id,
        title=title,
        property_type=property_type,
        address=address,
        state=state,
        selling_price=selling_price,
        description=description,
        images=",".join(image_names)
    )

    db.session.add(listing)
    db.session.commit()

    return jsonify({
        "message": "Listing created successfully",
        "listing_id": listing.id,
        "images": image_names
    })

# =========================================================
# GET ALL LISTINGS (WITH IMAGE URLS)
# =========================================================

@app.route('/search', methods=['GET'])
def search():
    listings = Listing.query.all()

    output = []

    for l in listings:

        image_list = []
        if l.images:
            for img in l.images.split(","):
                image_list.append(f"/uploads/{img}")

        output.append({
            "id": l.id,
            "title": l.title,
            "selling_price": l.selling_price,
            "state": l.state,
            "bedrooms": l.bedrooms,
            "bathrooms": l.bathrooms,
            "images": image_list
        })

    return jsonify(output)

# =========================================================
# UPDATE LISTING
# =========================================================

@app.route('/listings/<int:id>', methods=['PUT'])
@jwt_required()
def update_listing(id):
    user_id = int(get_jwt_identity())

    listing = Listing.query.filter_by(id=id, user_id=user_id).first()

    if not listing:
        return jsonify({"message": "Listing not found"}), 404

    data = request.json

    listing.title = data.get('title', listing.title)
    listing.selling_price = data.get('selling_price', listing.selling_price)
    listing.address = data.get('address', listing.address)
    listing.state = data.get('state', listing.state)

    db.session.commit()

    return jsonify({"message": "Listing updated successfully"})

# =========================================================
# DELETE LISTING
# =========================================================

@app.route('/listings/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_listing(id):
    user_id = int(get_jwt_identity())

    listing = Listing.query.filter_by(id=id, user_id=user_id).first()

    if not listing:
        return jsonify({"message": "Listing not found"}), 404

    db.session.delete(listing)
    db.session.commit()

    return jsonify({"message": "Listing deleted successfully"})

# ==============
# LISTING IMAGES
# ==============
@app.route('/listing-images/<folder>', methods=['GET'])
def listing_images(folder):
    base_path = os.path.join(BASE_DIR, '../mobile/YooriODLegacy/uploads', folder)

    if not os.path.exists(base_path):
        return jsonify([])

    files = os.listdir(base_path)

    images = [
        f"http://127.0.0.1:5000/uploads/{folder}/{file}"
        for file in files
        if file.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))
    ]

    return jsonify(images)

@app.route('/uploads/<folder>/<filename>')
def serve_upload(folder, filename):

    folder_path = os.path.join(UPLOAD_FOLDER, folder)

    print("Serving from:", folder_path)  # DEBUG

    return send_from_directory(folder_path, filename)
# =========================================================
# RUN
# =========================================================

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(host='0.0.0.0', port=5000, debug=True)
