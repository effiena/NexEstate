from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity
)
from werkzeug.security import generate_password_hash, check_password_hash
import os

# =========================================================
# APP CONFIG
# =========================================================

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

db_path = os.path.abspath(
    os.path.join(BASE_DIR, '../database/nexestate.db')
)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = "nexestate_super_secure_2026_realestate_key_12345"

db = SQLAlchemy(app)
jwt = JWTManager(app)

# =========================================================
# USER MODEL
# =========================================================

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    phone = db.Column(db.String(50))
    ren_tag = db.Column(db.String(50))
    agency = db.Column(db.String(100))
    bio = db.Column(db.Text)
    profile_image = db.Column(db.String(255))

    successful_sales = db.Column(db.Integer, default=0)
    total_commission = db.Column(db.Float, default=0)

    listings = db.relationship('Listing', backref='user', lazy=True)


# =========================================================
# LISTING MODEL (UPDATED)
# =========================================================

class Listing(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # BASIC
    title = db.Column(db.String(200), nullable=False)
    property_type = db.Column(db.String(100))
    address = db.Column(db.String(255))
    state = db.Column(db.String(100))

    # PRICING
    bank_value = db.Column(db.Float)
    selling_price = db.Column(db.Float)
    commission = db.Column(db.Float)

    # PROPERTY DETAILS
    size_sqft = db.Column(db.Integer)
    bedrooms = db.Column(db.Integer)
    bathrooms = db.Column(db.Integer)
    parking = db.Column(db.Integer)

    lease_type = db.Column(db.String(50))   # Leasehold / Freehold
    condition = db.Column(db.String(50))     # Renovated / Semi / Original

    landmark = db.Column(db.String(255))
    community = db.Column(db.String(255))

    description = db.Column(db.Text)

    # OWNER
    owner_name = db.Column(db.String(100))
    owner_contact = db.Column(db.String(50))

    # AGENT
    agent_name = db.Column(db.String(100))
    agent_phone = db.Column(db.String(50))
    agent_email = db.Column(db.String(120))

    # STATUS
    status = db.Column(db.String(50), default='active')
    deal_closed = db.Column(db.Boolean, default=False)
    sold_price = db.Column(db.Float)

    created_at = db.Column(db.DateTime, server_default=db.func.now())


# =========================================================
# HOME
# =========================================================

@app.route('/')
def home():
    return jsonify({"app": "NexEstate", "status": "running"})


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
# PROFILE
# =========================================================

@app.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email
    })


# =========================================================
# CREATE LISTING
# =========================================================

@app.route('/listings', methods=['POST'])
@jwt_required()
def create_listing():
    data = request.json
    user_id = int(get_jwt_identity())

    listing = Listing(
        user_id=user_id,
        title=data.get('title'),

        property_type=data.get('property_type'),
        address=data.get('address'),
        state=data.get('state'),

        bank_value=data.get('bank_value'),
        selling_price=data.get('selling_price'),
        commission=data.get('commission'),

        size_sqft=data.get('size_sqft'),
        bedrooms=data.get('bedrooms'),
        bathrooms=data.get('bathrooms'),
        parking=data.get('parking'),

        lease_type=data.get('lease_type'),
        condition=data.get('condition'),

        landmark=data.get('landmark'),
        community=data.get('community'),

        description=data.get('description'),

        owner_name=data.get('owner_name'),
        owner_contact=data.get('owner_contact'),

        agent_name=data.get('agent_name'),
        agent_phone=data.get('agent_phone'),
        agent_email=data.get('agent_email')
    )

    db.session.add(listing)
    db.session.commit()

    return jsonify({
        "message": "Listing created successfully",
        "listing_id": listing.id
    })


# =========================================================
# MY LISTINGS
# =========================================================

@app.route('/my-listings', methods=['GET'])
@jwt_required()
def my_listings():
    user_id = int(get_jwt_identity())

    listings = Listing.query.filter_by(user_id=user_id).all()

    output = []

    for l in listings:
        output.append({
            "id": l.id,
            "title": l.title,
            "bank_value": l.bank_value,
            "selling_price": l.selling_price,
            "commission": l.commission,
            "size_sqft": l.size_sqft,
            "bedrooms": l.bedrooms,
            "bathrooms": l.bathrooms,
            "parking": l.parking,
            "lease_type": l.lease_type,
            "condition": l.condition,
            "landmark": l.landmark,
            "community": l.community,
            "state": l.state,
            "address": l.address,
            "status": l.status
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
    listing.bank_value = data.get('bank_value', listing.bank_value)
    listing.selling_price = data.get('selling_price', listing.selling_price)
    listing.commission = data.get('commission', listing.commission)

    listing.state = data.get('state', listing.state)
    listing.address = data.get('address', listing.address)

    listing.lease_type = data.get('lease_type', listing.lease_type)
    listing.condition = data.get('condition', listing.condition)

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


# =========================================================
# SEARCH
# =========================================================

@app.route('/search', methods=['GET'])
def search():
    state = request.args.get('state')
    query = Listing.query

    if state:
        query = query.filter(Listing.state == state)

    results = query.all()

    output = []
    for l in results:
        output.append({
            "id": l.id,
            "title": l.title,
            "selling_price": l.selling_price,
            "state": l.state,
            "bedrooms": l.bedrooms,
            "bathrooms": l.bathrooms
        })

    return jsonify(output)


# =========================================================
# RUN APP
# =========================================================

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(host='0.0.0.0', port=5000, debug=True)
