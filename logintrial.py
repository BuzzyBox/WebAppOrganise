
from flask import Flask, render_template, request, redirect, url_for, session
from gogetform import tamsForms
import sqlite3
from mysqlx import Statement

app=Flask(__name__)
app.secret_key="__privateKey__"

@app.route('/')
def mainP():
 return render_template('style.html') 


def __init__(self):
    con=sqlite3.connect('users1.db')
    c=con.cursor
    c.execute('CREATE TABLE users1(username text, passWord,text)')
    con.commit()

@app.route('/login', methods=["POST","GET"])
def login():
    if request.method=='POST':
        username=request.form['username']
        passWord=request.form['passWord']
        con=sqlite3.connect('users1.db')
        c=con.cursor()
        statement=f"SELECT * from users1 WHERE username='{username}' AND passWord='{passWord}';"
        c.execute(statement)
        if not c.fetchone():
            return render_template('login.html')
        else:
            return render_template('home.html')


    else:
        request.methos=='GET'
        return render_template('login.html')
 



@app.route('/register', methods=["POST","GET"])
def registerForm():
    tamsForms=tamsForms()
    con=sqlite3.connect('users1.db')
    c=con.cursor()
    if request.method=='POST':
        if(request.form["username"]!="" and request.form["passWord"]!=""):
            username=request.form["username"]
            passWord=request.form["passWord"]
            statement=f"SELECT * from users1 WHERE sername='{username}' AND passWord ='{passWord}';"
            c.execute(statement)
            data=c.fetchone()
            if data:
                #Add in a error pop up window?
                return render_template('style.html') 
            else:
                if not data:
                    c.execute("INSERT INTO users1 (username,passWord) VALUES (?,?)", (username,passWord))
                    con.commit()
                    con.close()
                return render_template('login.html')



    elif request.method=='GET':
        return render_template('register.html', form=tamsForms)

