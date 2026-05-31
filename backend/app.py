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
# CORS (CLEAN FIX - IMPORTANT)
# =========================================================
CORS(
    app,
    resources={r"/*": {"origins": "*"}},
    supports_credentials=False
)

@app.after_request
def after_request(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
    return response

# =========================================================
# PATHS
# =========================================================
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

DB_PATH = os.path.join(BASE_DIR, "nexestate.db")

UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

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

# IMPORTANT: use YOUR OWN backend, not old one
BASE_URL = "https://nexestate-production.up.railway.app"

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
        description=description,
        images=f"{folder}:{','.join(image_names)}"
    )

    db.session.add(listing)
    db.session.commit()

    return jsonify({
        "message": "Listing created",
        "folder": folder,
        "images": image_names
    })

# =========================================================
# SEARCH (MAIN FIX - FRONTEND USES THIS)
# =========================================================
@app.route("/search")
def search():
    listings = Listing.query.all()

    output = []

    for listing in listings:
        images = []

        if listing.images and ":" in listing.images:
            folder, files = listing.images.split(":", 1)

            for file in files.split(","):
                images.append(f"{BASE_URL}/uploads/{folder}/{file}")

        output.append({
            "id": listing.id,
            "title": listing.title,
            "selling_price": listing.selling_price,
            "state": listing.state,
            "bedrooms": listing.bedrooms,
            "bathrooms": listing.bathrooms,
            "images": images
        })

    return jsonify(output)

# =========================================================
# SERVE IMAGES (IMPORTANT FIX)
# =========================================================
@app.route("/uploads/<folder>/<filename>")
def serve_upload(folder, filename):
    path = os.path.join(UPLOAD_FOLDER, folder, filename)
    return send_from_directory(os.path.dirname(path), filename)

# =========================================================
# TEST
# =========================================================
@app.route("/test")
def test():
    return jsonify({"ok": True})

# =========================================================
# DEBUG
# =========================================================
@app.route("/debug")
def debug():
    folders = os.listdir(UPLOAD_FOLDER) if os.path.exists(UPLOAD_FOLDER) else []

    return jsonify({
        "upload_folder": UPLOAD_FOLDER,
        "folders": folders
    })

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
