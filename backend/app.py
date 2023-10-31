from flask import Flask, request, jsonify, session
from datetime import datetime, timedelta, timezone, date, timedelta
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
from flask_cors import CORS
from func import calculate_age

import json


app = Flask(__name__)
CORS(app, supports_credentials=True)


app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Anupa2001'
app.config['MYSQL_DB'] = 'database_v4'


mysql = MySQL(app)

app.secret_key = 'your_secret_key_here'
bcrypt = Bcrypt(app)

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
# app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)


@app.route('/', methods=["POST"])
def hello_world():
    return 'Hello, World!'

###8888
@app.route("/signup/<type>", methods=["POST"])
def signup(type):
    # # Extract data from the JSON request data
    email = request.json["email"]
    firstName = request.json["firstName"]
    lastName = request.json["lastName"]
    gender = request.json["gender"]
    addressLine1 = request.json["addressLine1"]
    addressLine2 = request.json["addressLine2"]
    country = request.json["country"]
    city = request.json["city"]
    birthday = request.json["birthday"]
    passportNumber = request.json["passportNumber"]

    age = calculate_age(birthday)
    address = addressLine1 + " " + addressLine2 + " " + city

    cursor = mysql.connection.cursor()

    cursor.execute("""call check_user_exsits(%s);;""", (email,))
    Id1 = cursor.fetchall()
    if Id1:
        return jsonify({"error": "Email already exists"}), 409
    
    cursor.execute("""call check_passport(%s);;""", (passportNumber,))
    Id2 = cursor.fetchall()
    if Id2:
        return jsonify({"error": "passport already exists"}), 410

    if (type == "r"):

        password = request.json["password"]
        hashed_password = bcrypt.generate_password_hash(password)
        cursor.execute("""call new_user(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);""",
                    ("new_user", firstName, lastName, 0, age, email, gender, passportNumber, address, country, birthday, hashed_password,))

    else:

        cursor.execute("""call Unregistered(%s, %s, %s, %s, %s, %s, %s, %s, %s);""",
                    (firstName, lastName, age, email, gender, passportNumber, address, country, birthday,))
        
       
    cursor.execute("""SELECT passenger_id FROM passenger ORDER BY passenger_id DESC LIMIT 1;""")
    passenger_id = cursor.fetchone()[0]
    mysql.connection.commit()
    cursor.close()
    
 
    return jsonify({
        "message": "User created successfully",
        "passenger_id": passenger_id,
    }), 201

###8888
@app.route("/login", methods=["POST"])
def login_user():
    # Extract email and password from the JSON request data
    email = request.json["email"]
    password = request.json["password"]

    # Query the database for a user with the given email
    cur = mysql.connection.cursor()
    cur.execute("""call check_login(%s);""", (email,))
    user_password = cur.fetchone()

    if not user_password:
        return jsonify({"error": "Invalid Username or Password"}), 401

    stored_password_hash = user_password[0]

    # Check if the provided password matches the hashed password in the database
    if not bcrypt.check_password_hash(stored_password_hash, password):
        return jsonify({"error": "Invalid Username or Password"}), 401

    access_token = create_access_token(identity=email)
    cur.execute("""SELECT passenger_id FROM registered_passenger where email = %s;""",(email,))
    passenger_id = cur.fetchone()[0]

    cur.close()

    return jsonify({
        "access_token": access_token,
        "email": email,
        "passenger_id": passenger_id
    })

###8888
@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

###8888
@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

###8888
@app.route('/profile/<getemail>', methods=["GET"])
@jwt_required()
def my_profile(getemail):
    print(getemail)
    if not getemail:
        return jsonify({"error": "Unauthorized Access"}), 401

    cur = mysql.connection.cursor()
    # cur.execute("""select passenger_id, first_name, last_name, email, booking_frequency from registered_passenger where email = %s;""", (getemail,)) #edit this for get necessary data
    cur.execute("""call get_profile(%s);""", (getemail,))
    results = cur.fetchone()
    passenger_id = results[0]
    first_name = results[1]
    last_name = results[2]
    email = results[3]
    booking_frequency = results[4]

    cur.close()

    response_body = {
        "passenger_id": passenger_id,
        "email": email,
        "passenger_id": passenger_id,
        "booking_frequency": booking_frequency,
        "first_name": first_name,
        "last_name": last_name
    }

    return response_body

###8888
@app.route('/getflight', methods=["POST"])
def get_flight():
    departureLocation = request.json["departureLocation"]
    departureDate = request.json["departureDate"]
    arrivalLocation = request.json["arrivalLocation"]

    cur = mysql.connection.cursor()
    cur.execute("""call RequestFlights(%s, %s, %s);""",
                (departureLocation, arrivalLocation, departureDate,))
    results = cur.fetchone()
    if not results:
        return jsonify({"error": "No flights found"}), 401
    cur.close()


    flight_schedule_id = results[0]
    flight_date = results[1].strftime("%Y-%m-%d")

    departure_time = results[2]
    hours, remainder = divmod(departure_time.seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    departure_time_str = f"{hours:02d}:{minutes:02d}:{seconds:02d}"
    
    arival_time = results[3].strftime("%Y-%m-%d %H:%M:%S")

    aircraft_id = results[4]
    flight_status = results[5]
    flight_id = results[6]

    response_body = {
        "flight_schedule_id": flight_schedule_id,
        "flight_date": flight_date,
        "departure_time": departure_time_str,
        "arival_time": arival_time,
        "aircraft_id": aircraft_id,
        "flight_status": flight_status,
        "flight_id": flight_id
    }

    return jsonify(response_body), 200

### this for get the flight details
# @app.route('/available', methods=["POST"])
# def available():
#     flight_schedule_id = request.json["flight_schedule_id"]
#     flight_date
#     cur = mysql.connection.cursor()
#     return jsonify()


@app.route('/booking', methods=["POST"])
def booking():
    flight_schedule_id = int(request.json["flight_schedule_id"])
    passenger_id = int(request.json["passenger_id"])
    seat_no = int(request.json["seat_no"])

    current_date = datetime.now().date()

    cur = mysql.connection.cursor()

    cur.execute("""select availability from seat where seat_no = %s and flight_schedule_id = %s;""",(seat_no, flight_schedule_id,))
    availability = cur.fetchone()[0]

    if availability == 1:
        return jsonify({"error": "Seat not available"}), 401

    cur.execute("""insert into booking (flight_schedule_id, passenger_id, seat_no, payment_status, booking_date) value (%s, %s, %s, true, %s);""",(flight_schedule_id, passenger_id, seat_no,current_date,))
    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "Booking Successful"}), 201


@app.route('/viweticket', methods=["POST"])
def viweTicket():
    passenger_id = request.json["passenger_id"]
    cur = mysql.connection.cursor()
    cur.execute("""select * from ticket where passenger_id = %s;""", (passenger_id,))
    results = cur.fetchall()
    
    if not results:
        return jsonify({"error": "No tickets found"}), 401
    cur.close()

    return jsonify(results), 201

##############################################################################################################
###8888
@app.route('/get_flight_schedule', methods=["POST"])
def get_flight_schedule():
    get_date = request.json["get_date"]
    # get_date = request.args.get('get_date')
    
    cur = mysql.connection.cursor()
    cur.execute("""call flight_schedule(%s);""",(get_date,))

    
    results1 = cur.fetchall()
    
    if not results1:
        return jsonify({"error": "No flight schedule found"}), 401
    cur.close()

    results = [None] * len(results1)

    for i in range(len(results1)):
        
        results[i] = list(results1[i])   

        departure_time = results[i][3]
        hours, remainder = divmod(departure_time.seconds, 3600)
        minutes, seconds = divmod(remainder, 60)
        departure_time_str = f"{hours:02d}:{minutes:02d}:{seconds:02d}"
        results[i][3] = departure_time_str

        arival_time = results[i][4].strftime("%Y-%m-%d %H:%M:%S")
        results[i][4] = arival_time


    return jsonify(results), 201



@app.route('/passengers_above_18', methods=["POST"])
def passengers_above_18():
    flight_no = request.json["flight_no"]

    cur = mysql.connection.cursor()
    cur.execute("""call get_all_passengers_above_18(%s);""",(flight_no,))
    results = cur.fetchall()
    if not results:
        return jsonify({"error": "No passenger list found"}), 401
    cur.close()

    return jsonify(results), 201


@app.route('/passengers_below_18', methods=["POST"])
def passengers_below_18():
    flight_no = request.json["flight_no"]

    cur = mysql.connection.cursor()
    cur.execute("""call get_all_passengers_below_18(%s);""",(flight_no,))
    results = cur.fetchall()
    if not results:
        return jsonify({"error": "No passenger list found"}), 401
    cur.close()

    return jsonify(results), 201

@app.route('/passengers_list', methods=["POSt"])
def passengers_list():
    flight_no = request.json["flight_no"]

    cur = mysql.connection.cursor()
    cur.execute("""call get_all_passengers(%s);""",(flight_no,))
    results = cur.fetchall()
    if not results:
        return jsonify({"error": "No passenger list found"}), 401
    cur.close()

    return jsonify(results), 201

@app.route('/number_of_passengers_for_dest_range', methods=["POSt"])
def number_of_passengers_for_dest_range():
    date1 = request.json["date1"]
    date2 = request.json["date2"]
    destination = request.json["destination"]

    cur = mysql.connection.cursor()
    cur.execute("""call number_of_passengers_for_dest_range(%s,%s,%s);""",(destination,date1, date2,))
    results = cur.fetchall()
    if not results:
        return jsonify({"error": "No passenger list found"}), 401
    cur.close()

    return jsonify(results), 201

@app.route('/handleNumber_of_bookings_for_dest_range', methods=["POSt"])
def handleNumber_of_bookings_for_dest_range():
    date1 = request.json["date1"]
    date2 = request.json["date2"]
    ptype = request.json["ptype"]

    cur = mysql.connection.cursor()
    cur.execute("""select get_bookcount_by_type_date(%s,%s,%s);""",(date1, date2, ptype,))
    results = cur.fetchall()
    if not results:
        return jsonify({"error": "No booking list found"}), 401
    cur.close()

    return jsonify(results), 201

@app.route('/handleTotalRevenue', methods=["POSt"])
def handleTotalRevenue():
    Atype = request.json["Atype"]

    cur = mysql.connection.cursor()
    cur.execute("""select revenue_by_ac_model(%s);""",(Atype,))
    results = cur.fetchall()
    if not results:
        return jsonify({"error": "No booking list found"}), 401
    cur.close()

    return jsonify(results), 201

@app.route('/past_flight', methods=["POST"])
def past_flight():
    departureLocation = request.json["departureLocation"]
    arrivalLocation = request.json["arrivalLocation"]

    cur = mysql.connection.cursor()
    cur.execute("""call past_flight(%s, %s);""",(arrivalLocation, departureLocation,))
    results = cur.fetchall()
    if not results:
        return jsonify({"error": "No flights found"}), 401
    cur.close()
    return jsonify(results), 201

@app.route('/getAircraft', methods=["POST"])
def getAircraft():
    flight_schedule_id = request.json["flight_schedule_id"]
    cur = mysql.connection.cursor()
    cur.execute("""call get_aircraft_model(%s);""", (flight_schedule_id,))
    results = cur.fetchone()[0]
    return jsonify(results), 201

if __name__ == '__main__':
    app.run()
