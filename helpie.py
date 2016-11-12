import MySQLdb
import bcrypt
import json
from flask import *
app = Flask(__name__)

@app.route('/register', methods=["GET", "POST"])
def register():
    response = {}
    if request.method == "POST":
        data = json.loads(request.data)
        email = data['email']
        name = data['name']
        password = data['password']
        db = MySQLdb.connect("localhost","root","academica","helpie")
        cursor = db.cursor()
        sql_check_email = "SELECT * FROM users WHERE email='%s'" % (email)
        try:
            cursor.execute(sql_check_email)
            n_results = cursor.rowcount
            if n_results==0:
                #encrypted_pw = bcrypt.hashpw(bpassword, bcrypt.gensalt(10))
                #print encrypted_pw
                sql_register = "INSERT INTO users(name, email, encrypted_password) VALUES('%s','%s','%s')" % (name,email,password)
                try:
                    cursor.execute(sql_register)
                    db.commit()
                    response = { "state" : 1, "msg" : "Registered with success."}
                except:
                    db.rollback()
                    response = { "state" : 0, "msg" : "Error registering."}
            else:
               response = { "state" : 0, "msg" : "Email already registered."}
        except:
            response = { "state" : 0, "msg" : "Error accessing DB."}
        db.close()
        return json.dumps(response)
    else:
        response = {"state" : 0, "msg" : "Error."}
        return json.dumps(response)


@app.route('/login', methods=["GET", "POST"])
def login():
    response = {}
    if request.method == "POST":
        data = json.loads(request.data)
        email = data['email']
        password = data['password']
        db = MySQLdb.connect("localhost","root","academica","helpie")
        cursor = db.cursor()
        sql_check_email = "SELECT * FROM users WHERE email='%s'" % (email)
        try:
            cursor.execute(sql_check_email)
            n_results = cursor.rowcount
            if n_results==1:
                result = cursor.fetchall()
                if (result[0][3]==password):
                    response = { "state" : 1, "msg" : "Login with success.", "id" : result[0][0], "name" : result[0][1], "email" : result[0][2]}
                else:
                    response = { "state" : 0, "msg" : "Wrong credentials."}
            else:
                response = { "state" : 0, "msg" : "Error user not found."}
        except:
            response = { "state" : 0, "msg" : "Error accessing DB."}
        db.close()
        return json.dumps(response)
    else:
        response = {"state" : 0, "msg" : "Error."}
        return json.dumps(response)


@app.route('/savelocation', methods=["GET", "POST"])
def savelocation():
    response = {}
    if request.method == "POST":
        data = json.loads(request.data)
        user_id = int(data['id'])
        name = data['name']
        longitude = float(data['longitude'])
        latitude = float(data['latitude'])
        db = MySQLdb.connect("localhost","root","academica","helpie")
        cursor = db.cursor()
        sql_loc = "INSERT INTO locations(user_id, name, longitude, latitude) VALUES(%i,'%s',%f,%f)" % (user_id,name,longitude,latitude)
        try:
            cursor.execute(sql_loc)
            db.commit()
            response = { "state" : 1, "msg" : "Location saved with success."}
        except:
            db.rollback()
            response = { "state" : 0, "msg" : "Error accessing DB."}
        db.close()
        return json.dumps(response)
    else:
        response = {"state" : 0, "msg" : "Error."}
        return json.dumps(response)

@app.route('/mylocations', methods=["GET", "POST"])
def mylocations():
    response = {}
    if request.method == "POST":
        data = json.loads(request.data)
        user_id = int(data['user_id'])
        db = MySQLdb.connect("localhost","root","academica","helpie")
        cursor = db.cursor()
        sql_check_email = "SELECT * FROM locations WHERE user_id=%i" % (user_id)
        try:
            cursor.execute(sql_check_email)
            n_results = cursor.rowcount
            if n_results>0:
                results = cursor.fetchall()
                locations = []
                for row in results:
                    loc_id = row[0]
                    name = row[2]
                    longitude = row[3]
                    latitude = row[4]
                    locations.append({"id": loc_id, "name" : name, "longitude" : str(longitude), "latitude" : str(latitude)})
                response = {"state" : 1, "locations" : locations}
            else:
                response = { "state" : 0, "msg" : "No locations found."}
        except:
            response = { "state" : 0, "msg" : "Error accessing DB."}
        db.close()
        return json.dumps(response)
    else:
        response = {"state" : 0, "msg" : "Error."}
        return json.dumps(response)


@app.route('/deletelocation', methods=["GET", "POST"])
def deletelocation():
    response = {}
    if request.method == "POST":
        data = json.loads(request.data)
        loc_id = int(data['loc_id'])
        db = MySQLdb.connect("localhost","root","academica","helpie")
        cursor = db.cursor()
        sql_check_email = "DELETE FROM locations WHERE id=%i" % (loc_id)
        try:
            cursor.execute(sql_check_email)
            db.commit()
            response = {"state" : 1, "msg" : "Location deleted with success."}
        except:
            response = { "state" : 0, "msg" : "Error accessing DB."}
        db.close()
        return json.dumps(response)
    else:
        db.rollback()
        response = {"state" : 0, "msg" : "Error."}
        return json.dumps(response)


@app.route('/createrequest', methods=["GET", "POST"])
def savelocation():
    response = {}
    if request.method == "POST":
        data = json.loads(request.data)
        user_id = int(data['user_id'])
        title = data['title']
        desc = data['description']
        loc_id = data['loc_id']
        deadline = int(data['deadline'])
        #from datetime import datetime
        #datetime_object = datetime.strptime(deadline,'%Y-%m-%d %H:%M')
        #string = datetime.strftime('%Y-%m-%d %H:%M')
        db = MySQLdb.connect("localhost","root","academica","helpie")
        cursor = db.cursor()
        sql_loc = "INSERT INTO requests(owner_id, title, description, loc_id, deadline) VALUES(%i,'%s','%s',%i,'%s')" % (user_id,desc,loc_id,deadline)
        try:
            cursor.execute(sql_loc)
            db.commit()
            response = { "state" : 1, "msg" : "Request created with success."}
        except:
            db.rollback()
            response = { "state" : 0, "msg" : "Error accessing DB."}
        db.close()
        return json.dumps(response)
    else:
        response = {"state" : 0, "msg" : "Error."}
        return json.dumps(response)



if __name__ == '__main__':
        app.run(host= '0.0.0.0',threaded=True, debug=True)
