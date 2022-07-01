
# C:\flaskenv

#from mysqlx import Statement
from flask import Flask, render_template, request, url_for
from gogetform import tamsForms
import sqlite3

app=Flask(__name__)
app.secret_key = 'many random bytes'
tamsForms=tamsForms()

@app.route('/')
def mainP():
 return render_template('style.html') 


def __init__(self):
    con=sqlite3.connect('users1.db')
    c=con.cursor
    c.execute('CREATE TABLE users1(U_fName text, U_lName text, U_username text, U_passWord text, U_email text, U_company text)')
    con.commit()

@app.route('/login', methods=["POST","GET"])
def login():
    if request.method=='POST':
        U_username=request.form['U_username']
        U_passWord=request.form['U_passWord']
        con=sqlite3.connect('users1.db')
        c=con.cursor()
        statement=f"SELECT * from users1 WHERE U_username='{U_username}' AND U_passWord='{U_passWord}';"
        c.execute(statement)
        if not c.fetchone():
            return render_template('login.html')
        else:
            return render_template('home.html')


    else:
        request.method=='GET'
        return render_template('login.html')
 



@app.route('/register', methods=["POST","GET"])
def registerForm():
    
    con=sqlite3.connect('users1.db')
    c=con.cursor()
    if request.method=='POST':
        if(request.form["U_fName"]!="" and request.form["U_lName"]!=""and request.form["U_username"]!="" and request.form["U_passWord"]!="" and  request.form["U_email"]!=""):
            U_username=request.form["U_username"]
            U_passWord=request.form["U_passWord"]
            U_fName=request.form["U_fName"]
            U_lName=request.form["U_lName"]
            U_email=request.form["U_email"]
            statement=f"SELECT * from users1 WHERE U_fName='{U_fName}' AND U_lName ='{U_lName}' AND U_username='{U_username}' AND U_passWord ='{U_passWord}' AND U_email='{U_email}';"
            c.execute(statement)
            data=c.fetchone()
            if data:
                #Add in a error pop up window?
                return render_template('style.html') 
            else:
                if not data:
                    c.execute("INSERT INTO users1 (U_fName, U_lName,U_username,U_passWord,U_email) VALUES (?,?,?,?,?)", (U_fName, U_lName,U_username,U_passWord,U_email))
                    con.commit()
                    con.close()
                return render_template('login.html')



    elif request.method=='GET':
     return render_template('register.html', form=tamsForms)

@app.route('/login/home')
def home():
 return render_template('home.html') 

@app.route('/login/pages')
def pages():
 return render_template('pages.html') 

@app.route('/login/cal')
def calendar():
 return render_template('SQliteTest.html') 









if __name__ == "__main__":
     app.run(debug=True)     
        




