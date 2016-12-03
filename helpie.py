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
def createrequest():
    response = {}
    if request.method == "POST":
        data = json.loads(request.data)
        user_id = int(data['user_id'])
        title = data['title']
        desc = data['description']
        item_list = data['list']
        loc_id = int(data['loc_id'])
        deadline = data['deadline']

        #from datetime import datetime
        #datetime_object = datetime.strptime(deadline,'%Y-%m-%d %H:%M')
        #string = datetime.strftime('%Y-%m-%d %H:%M')

        db = MySQLdb.connect("localhost","root","academica","helpie")
        cursor = db.cursor()

        sql_loc = "INSERT INTO requests(owner_id, title, description, loc_id, deadline) VALUES(%i,'%s','%s',%i,'%s')" % (user_id,title,desc,loc_id,deadline)
        try:
            cursor.execute(sql_loc)
            db.commit()
            sql_confirm = "SELECT id FROM requests WHERE owner_id='%s' AND title='%s' AND description='%s' AND loc_id=%i AND deadline='%s' " % (user_id,title,desc,loc_id,deadline)
            cursor.execute(sql_confirm)
            results = cursor.fetchall()
            req_id=results[0][0]
            for i in range(len(item_list)):
                sql_item = "INSERT INTO items(request_id,info) VALUES(%i,'%s')" % (req_id,item_list[i]['item'])
                cursor.execute(sql_item)
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

@app.route('/listrequests', methods=["GET", "POST"])
def listrequests():
    response = {}
    if request.method == "POST":
        data = json.loads(request.data)
        user_id = int(data['user_id'])
        db = MySQLdb.connect("localhost","root","academica","helpie")
        cursor = db.cursor()
        sql_requests = "SELECT * FROM requests WHERE owner_id!=%i AND state='active'" % (user_id)
        try:
            cursor.execute(sql_requests)
            n_results = cursor.rowcount
            if n_results>0:
                results = cursor.fetchall()
                requests = []
                for row in results:
                    r_id = row[0]
                    owner_id = row[1]
                    title = row[2]
                    description = row[3]
                    loc_id = row[4]
                    deadline = row[6]
                    #Name
                    sql_owner = "SELECT name FROM users WHERE id=%i" % (owner_id)
                    cursor.execute(sql_owner)
                    owner_result = cursor.fetchall()
                    owner_name = owner_result[0][0]
                    #Feedback
                    sql_feedback = "SELECT feedback_owner FROM requests WHERE owner_id=%i AND state='ended'" % (owner_id)
                    cursor.execute(sql_feedback)
                    fb_result = cursor.fetchall()
                    feedback = 0
                    if (len(fb_result)>0):
                        for fb in fb_result:
                            feedback += fb[0]
                        feedback = feedback / len(fb_result)
                    #Location
                    sql_loc = "SELECT * FROM locations WHERE id=%i" % (loc_id)
                    cursor.execute(sql_loc)
                    loc_result =  cursor.fetchall()
                    longitude = loc_result[0][3]
                    latitude = loc_result[0][4]
                    #Items
                    sql_items = "SELECT * FROM items WHERE request_id=%i" % (r_id)
                    cursor.execute(sql_items)
                    items_result = cursor.fetchall()
                    items = []
                    for item in items_result:
                        items.append(item[2])

                    requests.append({"id": r_id, "owner": owner_name, "feedback": feedback,"title": title.decode('latin1'), "description": description.decode('latin1'), "list": items, "longitude": str(longitude), "latitude": str(latitude),"deadline": deadline.strftime('%Y-%m-%d %H:%M')})
                response = {"state" : 1, "msg" : "success","requests" : requests}
            else:
                response = { "state" : 0, "msg" : "No locations found."}
        except:
            response = { "state" : 0, "msg" : "Error accessing DB."}
        db.close()
        return json.dumps(response)
    else:
        response = {"state" : 0, "msg" : "Error."}
        return json.dumps(response)

@app.route('/acceptrequest', methods=["GET", "POST"])
def acceptrequest():
    response = {}
    if request.method == "POST":
        data = json.loads(request.data)
        user_id = int(data['user_id'])
        req_id = int(data['req_id'])
        db = MySQLdb.connect("localhost","root","academica","helpie")
        cursor = db.cursor()
        sql_request = "SELECT state FROM requests WHERE id=%i FOR UPDATE" % (req_id)
        try:
            print sql_request
            cursor.execute(sql_request)
            results = cursor.fetchall()
            print "OLA"
            print results[0][0]
            if (results[0][0]=="active"):
                sql_accept = "UPDATE requests SET state='accepted', helper_id=%i WHERE id=%i" %(user_id, req_id)
                cursor.execute(sql_accept)
                db.commit()
                response = { "state" : 1, "msg" : "Request accepted with success."}
            else:
                db.rollback()
                response = { "state" : 0, "msg" : "Request already accepted."}
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
