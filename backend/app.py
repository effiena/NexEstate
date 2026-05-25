from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity
)
from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)

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

app.config["JWT_SECRET_KEY"] = (
    "nexestate_super_secure_2026_realestate_key_12345"
)

db = SQLAlchemy(app)
jwt = JWTManager(app)

# =========================================================
# DATABASE MODELS
# =========================================================

# -------------------------
# USER MODEL
# -------------------------
# -------------------------
# USER MODEL
# -------------------------
class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    # BASIC INFO
    name = db.Column(
        db.String(100),
        nullable=False
    )

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    password = db.Column(
        db.String(255),
        nullable=False
    )

    # AGENT INFO
    phone = db.Column(db.String(50))

    ren_tag = db.Column(
        db.String(50)
    )

    agency = db.Column(
        db.String(100)
    )

    bio = db.Column(
        db.Text
    )

    profile_image = db.Column(
        db.String(255)
    )

    # PERFORMANCE
    successful_sales = db.Column(
        db.Integer,
        default=0
    )

    total_commission = db.Column(
        db.Float,
        default=0
    )

    # RELATIONSHIP
    listings = db.relationship(
        'Listing',
        backref='user',
        lazy=True
    )


# -------------------------
# LISTING MODEL
# -------------------------
class Listing(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey('user.id'),
        nullable=False
    )

    title = db.Column(
        db.String(200),
        nullable=False
    )

    property_type = db.Column(
        db.String(100)
    )

    address = db.Column(
        db.String(255)
    )

    state = db.Column(
        db.String(100)
    )

    price = db.Column(
        db.Float
    )

    built_up = db.Column(
        db.String(50)
    )

    land_size = db.Column(
        db.String(50)
    )

    bedrooms = db.Column(
        db.Integer
    )

    bathrooms = db.Column(
        db.Integer
    )

    parking = db.Column(
        db.Integer
    )

    description = db.Column(
        db.Text
    )

    owner_name = db.Column(
        db.String(100)
    )

    owner_contact = db.Column(
        db.String(50)
    )

    # AGENT DETAILS
    agent_name = db.Column(
        db.String(100)
    )

    agent_phone = db.Column(
        db.String(50)
    )

    agent_email = db.Column(
        db.String(120)
    )

    # SALES STATUS
    status = db.Column(
        db.String(50),
        default='active'
    )

    deal_closed = db.Column(
        db.Boolean,
        default=False
    )

    sold_price = db.Column(
        db.Float
    )

    commission_amount = db.Column(
        db.Float,
        default=0
    )

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )
# =========================================================
# HOME ROUTE
# =========================================================

@app.route('/')
def home():

    return jsonify({
        "app": "NexEstate",
        "status": "running"
    })

# =========================================================
# REGISTER
# =========================================================

@app.route('/register', methods=['POST'])
def register():

    data = request.json

    # CHECK EXISTING EMAIL
    existing_user = User.query.filter_by(
        email=data['email']
    ).first()

    if existing_user:
        return jsonify({
            "message": "Email already registered"
        }), 400

    hashed_password = generate_password_hash(
        data['password']
    )

    new_user = User(
        name=data['name'],
        email=data['email'],
        password=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User registered successfully"
    })

# =========================================================
# LOGIN
# =========================================================

@app.route('/login', methods=['POST'])
def login():

    data = request.json

    user = User.query.filter_by(
        email=data['email']
    ).first()

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404

    if not check_password_hash(
        user.password,
        data['password']
    ):
        return jsonify({
            "message": "Invalid password"
        }), 401

    token = create_access_token(
        identity=str(user.id)
    )

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
        return jsonify({
            "message": "User not found"
        }), 404

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email
    })

# =========================================================
# GET USERS
# =========================================================

@app.route('/users', methods=['GET'])
def get_users():

    users = User.query.all()

    output = []

    for user in users:

        output.append({
            "id": user.id,
            "name": user.name,
            "email": user.email
        })

    return jsonify(output)

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
        title=data['title'],
        property_type=data.get('property_type'),
        address=data.get('address'),
        state=data.get('state'),
        price=data.get('price'),

        built_up=data.get('built_up'),
        land_size=data.get('land_size'),

        bedrooms=data.get('bedrooms'),
        bathrooms=data.get('bathrooms'),
        parking=data.get('parking'),

        description=data.get('description'),

        owner_name=data.get('owner_name'),
        owner_contact=data.get('owner_contact'),

        # ✅ FIXED: ADD THIS
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

    listings = Listing.query.filter_by(
        user_id=user_id
    ).all()

    output = []

    for l in listings:

        output.append({

            "id": l.id,

            "title": l.title,

            "price": l.price,

            "state": l.state,

            "status": l.status,

            "agent_name": l.agent_name,

            "agent_phone": l.agent_phone,

            "agent_email": l.agent_email
        })

    return jsonify(output)

# =========================================================
# UPDATE LISTING
# =========================================================

@app.route('/listings/<int:id>', methods=['PUT'])
@jwt_required()
def update_listing(id):

    user_id = int(get_jwt_identity())

    listing = Listing.query.filter_by(
        id=id,
        user_id=user_id
    ).first()

    if not listing:
        return jsonify({
            "message": "Listing not found"
        }), 404

    data = request.json

    listing.title = data.get(
        'title',
        listing.title
    )

    listing.price = data.get(
        'price',
        listing.price
    )

    listing.address = data.get(
        'address',
        listing.address
    )

    listing.state = data.get(
        'state',
        listing.state
    )

    listing.agent_name = data.get(
        'agent_name',
        listing.agent_name
    )

    listing.agent_phone = data.get(
        'agent_phone',
        listing.agent_phone
    )

    listing.agent_email = data.get(
        'agent_email',
        listing.agent_email
    )

    db.session.commit()

    return jsonify({
        "message": "Listing updated successfully"
    })

# =========================================================
# DELETE LISTING
# =========================================================

@app.route('/listings/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_listing(id):

    user_id = int(get_jwt_identity())

    listing = Listing.query.filter_by(
        id=id,
        user_id=user_id
    ).first()

    if not listing:
        return jsonify({
            "message": "Listing not found"
        }), 404

    db.session.delete(listing)
    db.session.commit()

    return jsonify({
        "message": "Listing deleted successfully"
    })

# =========================================================
# SEARCH LISTINGS
# =========================================================

@app.route('/search', methods=['GET'])
def search_listings():

    state = request.args.get('state')

    min_price = request.args.get('min_price')

    max_price = request.args.get('max_price')

    query = Listing.query

    # FILTER STATE
    if state:
        query = query.filter(
            Listing.state == state
        )

    # FILTER MIN PRICE
    if min_price:
        query = query.filter(
            Listing.price >= float(min_price)
        )

    # FILTER MAX PRICE
    if max_price:
        query = query.filter(
            Listing.price <= float(max_price)
        )

    listings = query.all()

    output = []

    for l in listings:

        output.append({

            "id": l.id,

            "title": l.title,

            "property_type": l.property_type,

            "address": l.address,

            "state": l.state,

            "price": l.price,

            "bedrooms": l.bedrooms,

            "bathrooms": l.bathrooms,

            "parking": l.parking,

            "agent_name": l.agent_name,

            "agent_phone": l.agent_phone,

            "agent_email": l.agent_email
        })

    return jsonify(output)

# =========================================================
# MAIN
# =========================================================

if __name__ == '__main__':

    with app.app_context():
        db.create_all()

    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )
