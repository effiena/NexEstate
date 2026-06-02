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
import os

# =========================================================
# APP INIT
# =========================================================
app = Flask(__name__)

# =========================================================
# CORS (CLEAN)
# =========================================================
CORS(app)

# =========================================================
# PATHS
# =========================================================
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, "nexestate.db")

UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

BASE_URL = "https://nexestate-production.up.railway.app"

# =========================================================
# CONFIG
# =========================================================
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DATABASE_URL",
    "sqlite:///" + DB_PATH
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

    images = db.Column(db.Text)

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

    image_names = []
    files = request.files.getlist("images")

    for file in files:
        if file:
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

    return jsonify({
        "message": "Listing created successfully",
        "listing_id": listing.id
    })

# =========================================================
# GET ALL LISTINGS (NEW MAIN API)
# =========================================================
@app.route("/listings", methods=["GET"])
def get_listings():
    listings = Listing.query.all()
    output = []

    for listing in listings:
        images = []

        if listing.images and ":" in listing.images:
            folder, files = listing.images.split(":", 1)

            for file in files.split(","):
                if file.strip():
                    images.append(f"{BASE_URL}/uploads/{folder}/{file}")

        output.append({
            "id": listing.id,
            "title": listing.title,
            "property_type": listing.property_type,
            "address": listing.address,
            "state": listing.state,
            "selling_price": listing.selling_price,
            "bedrooms": listing.bedrooms,
            "bathrooms": listing.bathrooms,
            "parking": listing.parking,
            "description": listing.description,
            "images": images
        })

    return jsonify(output)

# =========================================================
# SINGLE LISTING
# =========================================================
@app.route("/listing/<int:listing_id>", methods=["GET"])
def get_listing(listing_id):
    listing = Listing.query.get_or_404(listing_id)

    images = []

    if listing.images and ":" in listing.images:
        folder, files = listing.images.split(":", 1)

        for file in files.split(","):
            if file.strip():
                images.append(f"{BASE_URL}/uploads/{folder}/{file}")

    return jsonify({
        "id": listing.id,
        "title": listing.title,
        "property_type": listing.property_type,
        "address": listing.address,
        "state": listing.state,
        "selling_price": listing.selling_price,
        "bedrooms": listing.bedrooms,
        "bathrooms": listing.bathrooms,
        "parking": listing.parking,
        "description": listing.description,
        "images": images
    })

# =========================================================
# SERVE IMAGES
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
    exists = os.path.exists(UPLOAD_FOLDER)

    return jsonify({
        "upload_folder": UPLOAD_FOLDER,
        "exists": exists,
        "folders": os.listdir(UPLOAD_FOLDER) if exists else []
    })

# =========================================================
# TEST
# =========================================================
@app.route("/test")
def test():
    return jsonify({"ok": True})

# =========================================================
# RUN
# =========================================================
if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000))
    )
