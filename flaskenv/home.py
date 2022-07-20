from flask import Flask, render_template,Request
import sqlite3 as sql

app=Flask(__name__)

#URL Home Page
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/enternew')
def new_user():
    return render_template('home.html')

@app.route('/UpdateUserByID', methods=['get','post'])
def contact1():
    if request.method =='POST':
        try:
            Notes = request.form['Notes']
            Name =request.form['Name']
            Did_Today =request.form['Did_Today']
            Obstacles_Faced=request.form['Obstacles_Faced']
            Did_Yesterday =request.form['Did_Yesterday']
            # No Blank Input
            if not Notes or Name or Did_Today or Obstacles_Faced or Did_Today:
                with sql.connect("ProfileScrums.db") as con:
                    cur = con.cursor()
                    cur.execute("insert into ProfileScrums(Notes,Name,Did_Today,Obstacles_Faced,Did_Yesterday) values(?,?,?,?,?)",\
                    (Notes,Name,Did_Today,Obstacles_Faced,Did_Yesterday))

                    con.commit()
                    msg= "Succesfully added"
            else:
                msg ="Error in insert information"
                con.rollback()
        except:
             msg ="Error in insert information"
             con.rollback()
        
        finally:
            return render_template('home.html', msg = msg)
@app.route('/home.html')
def list():
    con = sql.connect("Student.db")
    con.row_factory = sql.Row
    cur = con.cursor()

    cur.execute("select *from Student")
    rows = cur.fetchall()
    return render_template("home.html", rows = rows)

#URL CONNECT
@app.route('/enternew')
def new_scrums():
    return render_template('home.html')
#URL Connect to html get & post
@app.route('/UpdateUserByID', methods=['GET','POST'])
def contact():
    if request.method == 'POST':
        try:
            Notes =request.form['Notes']
            Name =request.form['Name']
            Did_Today =request.form['Did_Today']
            Obstacles_Faced=request.form['Obstacles_Faced']
            Did_Yesterday= request.form['Did_Yesterday']
            if not Notes or Name or Did_Today or Obstacles_Faced or Did_Yesterday:
                with sql.connect("Student.db") as con:
                    cur = con.cursor()
                    cur.execute("insert into User(Notes, Name,Did_Today,Obstacles_Faced,Did_Yesterday) values(?,?,?,?,?)",\
                    (Notes,Name,Did_Today,Obstacles_Faced,Did_Yesterday))

                    con.commit()
                    msg= "Yes"
            else:
                msg= "ERROR in insert operation"
                con.rollback()
        except:
            msg= "error in insert operation"
            con.rollback()
        finally:
            return render_template('home.html',msg= msg)
            con.close()

if __name__ =='__main__':
    app.run(debug=True)