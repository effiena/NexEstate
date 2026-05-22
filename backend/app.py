from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)
CORS(app)

# ✅ FIRST define BASE_DIR
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# ✅ THEN build db path
db_path = os.path.abspath(os.path.join(BASE_DIR, '../database/nexestate.db'))

# JWT Secret Key (IMPORTANT)
app.config["JWT_SECRET_KEY"] = "nexestate_super_secure_2026_realestate_key_12345"

jwt = JWTManager(app)

# ✅ THEN configure database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    listings = db.relationship('Listing', backref='user', lazy=True)

#Listings
class Listing(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    title = db.Column(db.String(200), nullable=False)
    property_type = db.Column(db.String(100))
    address = db.Column(db.String(255))
    state = db.Column(db.String(100))
    price = db.Column(db.Float)

    built_up = db.Column(db.String(50))
    land_size = db.Column(db.String(50))

    bedrooms = db.Column(db.Integer)
    bathrooms = db.Column(db.Integer)
    parking = db.Column(db.Integer)

    description = db.Column(db.Text)

    owner_name = db.Column(db.String(100))
    owner_contact = db.Column(db.String(50))

    # ✅ ADD THIS
    agent_name = db.Column(db.String(100))
    agent_phone = db.Column(db.String(50))
    agent_email = db.Column(db.String(120))

    status = db.Column(db.String(50), default='active')

    created_at = db.Column(db.DateTime, server_default=db.func.now())


# Home Route
@app.route('/')
def home():
    return jsonify({
        "app": "NexEstate",
        "status": "running"
    })

# Register Route
@app.route('/register', methods=['POST'])
def register():
    data = request.json

    hashed_password = generate_password_hash(data['password'])

    new_user = User(
        name=data['name'],
        email=data['email'],
        password=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"})


# Login
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

# Profile
@app.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()   # STRING, DO NOT convert

    user = User.query.get(int(user_id))  # convert only for DB lookup

    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email
    })
# Get Users
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
        owner_contact=data.get('owner_contact')
    )

    db.session.add(listing)
    db.session.commit()

    return jsonify({
        "message": "Listing created successfully",
        "listing_id": listing.id
    })

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
            "price": l.price,
            "state": l.state,
            "status": l.status,
            "agent_name": l.agent_name,
            "agent_phone": l.agent_phone,
            "agent_email": l.agent_email


        })

    return jsonify(output)

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

    listing.title = data.get('title', listing.title)
    listing.price = data.get('price', listing.price)
    listing.address = data.get('address', listing.address)
    listing.state = data.get('state', listing.state)

    db.session.commit()

    return jsonify({
        "message": "Listing updated successfully"
    })

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

@app.route('/search', methods=['GET'])
def search_listings():

    state = request.args.get('state')
    min_price = request.args.get('min_price')
    max_price = request.args.get('max_price')

    query = Listing.query

    if state:
        query = query.filter(Listing.state == state)

    if min_price:
        query = query.filter(Listing.price >= float(min_price))

    if max_price:
        query = query.filter(Listing.price <= float(max_price))

    listings = query.all()

    output = []

    for l in listings:
        output.append({
            "id": l.id,
            "title": l.title,
            "price": l.price,
            "state": l.state
        })

    return jsonify(output)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    
    app.run(host="0.0.0.0", port=5000, debug=True)
