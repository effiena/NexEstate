from flask import Flask, request, jsonify, send_from_directory, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import os

# =========================================================
# APP INIT
# =========================================================
app = Flask(__name__)

# =========================================================
# CORS (ALLOW ALL - DEV + PRODUCTION SAFE FOR API)
# =========================================================
CORS(app)

# =========================================================
# BASE DIR
# =========================================================
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# =========================================================
# CONFIG
# =========================================================
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DATABASE_URL",
    "sqlite:///" + os.path.join(BASE_DIR, "nexestate.db")
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.config["JWT_SECRET_KEY"] = os.environ.get(
    "JWT_SECRET_KEY",
    "nexestate_super_secure_2026"
)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# =========================================================
# EXTENSIONS
# =========================================================
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


class Listing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    title = db.Column(db.String(200), nullable=False)
    property_type = db.Column(db.String(100))
    address = db.Column(db.String(255))
    state = db.Column(db.String(100))
    selling_price = db.Column(db.Float)
    bedrooms = db.Column(db.Integer)
    bathrooms = db.Column(db.Integer)
    parking = db.Column(db.Integer)
    description = db.Column(db.Text)

    # format: folder:file1,file2,file3
    images = db.Column(db.Text)

# =========================================================
# HELPERS
# =========================================================
def build_image_urls(folder, files):
    return [
        url_for("serve_upload", folder=folder, filename=f, _external=True)
        for f in files if f.strip()
    ]

# =========================================================
# HOME
# =========================================================
@app.route("/")
def home():
    return jsonify({"app": "NexEstate PRO", "status": "running"})

# =========================================================
# REGISTER
# =========================================================
@app.route("/register", methods=["POST"])
def register():
    data = request.json

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"message": "Email already registered"}), 400

    user = User(
        name=data["name"],
        email=data["email"],
        password=generate_password_hash(data["password"])
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"})

# =========================================================
# LOGIN
# =========================================================
@app.route("/login", methods=["POST"])
def login():
    data = request.json

    user = User.query.filter_by(email=data["email"]).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    if not check_password_hash(user.password, data["password"]):
        return jsonify({"message": "Invalid password"}), 401

    token = create_access_token(identity=str(user.id))

    return jsonify({
        "message": "Login successful",
        "token": token
    })

# =========================================================
# CREATE LISTING
# =========================================================
@app.route("/listings", methods=["POST"])
@jwt_required()
def create_listing():
    user_id = int(get_jwt_identity())

    title = request.form.get("title")
    property_type = request.form.get("property_type")
    address = request.form.get("address")
    state = request.form.get("state")
    selling_price = request.form.get("selling_price")
    description = request.form.get("description")

    bedrooms = request.form.get("bedrooms")
    bathrooms = request.form.get("bathrooms")
    parking = request.form.get("parking")

    folder = secure_filename(title.replace(" ", "_"))
    folder_path = os.path.join(UPLOAD_FOLDER, folder)
    os.makedirs(folder_path, exist_ok=True)

    files = request.files.getlist("images")
    image_names = []

    for file in files:
        filename = secure_filename(file.filename)
        file.save(os.path.join(folder_path, filename))
        image_names.append(filename)

    listing = Listing(
        user_id=user_id,
        title=title,
        property_type=property_type,
        address=address,
        state=state,
        selling_price=selling_price,
        bedrooms=bedrooms,
        bathrooms=bathrooms,
        parking=parking,
        description=description,
        images=f"{folder}:{','.join(image_names)}"
    )

    db.session.add(listing)
    db.session.commit()

    return jsonify({"message": "Listing created"})

# =========================================================
# GET ALL LISTINGS (MAIN ENDPOINT)
# =========================================================
@app.route("/listings", methods=["GET"])
def get_listings():
    listings = Listing.query.all()
    output = []

    for l in listings:
        images = []

        if l.images and ":" in l.images:
            folder, files = l.images.split(":", 1)
            file_list = files.split(",")
            images = build_image_urls(folder, file_list)

        output.append({
            "id": l.id,
            "title": l.title,
            "property_type": l.property_type,
            "address": l.address,
            "state": l.state,
            "selling_price": l.selling_price,
            "bedrooms": l.bedrooms,
            "bathrooms": l.bathrooms,
            "parking": l.parking,
            "description": l.description,
            "images": images
        })

    return jsonify(output)

# =========================================================
# GET SINGLE LISTING
# =========================================================
@app.route("/listings/<int:listing_id>")
def get_listing(listing_id):
    l = Listing.query.get_or_404(listing_id)

    images = []

    if l.images and ":" in l.images:
        folder, files = l.images.split(":", 1)
        images = build_image_urls(folder, files.split(","))

    return jsonify({
        "id": l.id,
        "title": l.title,
        "property_type": l.property_type,
        "address": l.address,
        "state": l.state,
        "selling_price": l.selling_price,
        "bedrooms": l.bedrooms,
        "bathrooms": l.bathrooms,
        "parking": l.parking,
        "description": l.description,
        "images": images
    })

# =========================================================
# SERVE IMAGES (LOCAL + RAILWAY AUTO WORKS)
# =========================================================
@app.route("/uploads/<folder>/<filename>")
def serve_upload(folder, filename):
    return send_from_directory(
        os.path.join(UPLOAD_FOLDER, folder),
        filename
    )

# =========================================================
# DEBUG
# =========================================================
@app.route("/debug")
def debug():
    return jsonify({
        "upload_folder": UPLOAD_FOLDER,
        "files": os.listdir(UPLOAD_FOLDER)
    })

# =========================================================
# RUN
# =========================================================
if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
