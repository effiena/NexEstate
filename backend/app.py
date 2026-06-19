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

# ✅ FIX: CORS must allow frontend domain
CORS(
    app,
    supports_credentials=True,
    origins=[
        "https://yoorirealtyventures.up.railway.app",
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# =========================================================
# DATABASE
# =========================================================

DATABASE_URL = os.environ.get("DATABASE_URL")

if DATABASE_URL:
    app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
else:
    DB_PATH = os.path.join(BASE_DIR, "nexestate.db")
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + DB_PATH

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# =========================================================
# JWT
# =========================================================

app.config["JWT_SECRET_KEY"] = os.environ.get(
    "JWT_SECRET_KEY",
    "nexestate_default_secret_change_me"
)

jwt = JWTManager(app)

# =========================================================
# UPLOAD FOLDER (FIXED FOR RAILWAY)
# =========================================================

UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# =========================================================
# DB INIT
# =========================================================

db = SQLAlchemy(app)

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
    user_id = db.Column(db.Integer, nullable=False)

    title = db.Column(db.String(200), nullable=False)
    property_type = db.Column(db.String(100))
    address = db.Column(db.String(255))
    state = db.Column(db.String(100))
    selling_price = db.Column(db.Float)

    images = db.Column(db.Text)

# =========================================================
# HOME
# =========================================================

@app.route("/")
def home():
    return jsonify({"app": "NexEstate PRO", "status": "running"})

# =========================================================
# AUTH
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

    return jsonify({"message": "User registered"})


@app.route("/login", methods=["POST"])
def login():
    data = request.json

    user = User.query.filter_by(email=data["email"]).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    if not check_password_hash(user.password, data["password"]):
        return jsonify({"message": "Invalid password"}), 401

    token = create_access_token(identity=str(user.id))

    return jsonify({"token": token})

# =========================================================
# STATIC FILES (IMAGES)
# =========================================================

@app.route("/uploads/<path:filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)


# =========================================================
# LISTING IMAGES API (MAIN FIXED VERSION)
# =========================================================

@app.route("/listing-images/<folder>", methods=["GET"])
def listing_images(folder):

    folder_path = os.path.join(app.config["UPLOAD_FOLDER"], folder)

    if not os.path.exists(folder_path):
        return jsonify([])

    files = [
        f for f in os.listdir(folder_path)
        if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp"))
    ]

    base_url = request.host_url.rstrip("/")

    return jsonify([
        f"{base_url}/uploads/{folder}/{file}"
        for file in files
    ])


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

    # IMPORTANT: folder name is required from frontend or derived
    folder = request.form.get("folder")

    files = request.files.getlist("images")

    image_names = []

    # create folder if not exists
    folder_path = os.path.join(app.config["UPLOAD_FOLDER"], folder)
    os.makedirs(folder_path, exist_ok=True)

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
        images=",".join(image_names)
    )

    db.session.add(listing)
    db.session.commit()

    return jsonify({
        "message": "Listing created",
        "folder": folder,
        "images": image_names
    })


# =========================================================
# SEARCH LISTINGS (FIXED - NOW CONSISTENT)
# =========================================================

@app.route("/search", methods=["GET"])
def search():

    listings = Listing.query.all()
    output = []

    base_url = request.host_url.rstrip("/")

    for l in listings:

        # ⚠️ You MUST store folder name in DB or derive it consistently
        folder = l.title.replace(" ", "").lower()

        image_list = []

        if l.images:
            for img in l.images.split(","):
                image_list.append(
                    f"{base_url}/uploads/{folder}/{img}"
                )

        output.append({
            "id": l.id,
            "title": l.title,
            "price": l.selling_price,
            "state": l.state,
            "folder": folder,
            "images": image_list
        })

    return jsonify(output)

@app.route("/calculator")
def calculator():
    return send_from_directory("static", "della_calculator.html")

# =========================================================
# RUN
# =========================================================

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
