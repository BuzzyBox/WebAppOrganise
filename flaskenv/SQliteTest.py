from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL, MySQLdb

app = Flask(__name__)
app.secret_key = 'many random bytes'


# Connecting to the MySQL server to import the data for the calendar and table planner
# I am unsure how this will work for someone without MySQL or even if it makes a new database
# So I highly suggest importing something to flask or python that supports this application

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'crud2'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)


# Main page for the planner
# If we had more time we would've connected each other's code to make the links work along with one another

@app.route('/')
def index():
    cursor = mysql.connection.cursor()
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute("SELECT * FROM events ORDER BY id")
    calendar = cur.fetchall()
    return render_template('SQliteTest.html', calendar=calendar)


# Inserting/Creating the main data for the calendar and table planner

@app.route('/inset', methods=['POST'])
def insert():
    cursor = mysql.connection.cursor()
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    if request.method == 'POST':
        flash("Data Inserted Successfully!")
        title = request.form['title']
        start = request.form['start']
        end = request.form['end']
        print(title)
        print(start)
        cur.execute("INSERT INTO events (title,start_event,end_event) VALUES (%s,%s,%s)", [title, start, end])
        mysql.connection.commit()
        cur.close()
        return redirect(url_for('index'))


# Changing the current data within the calendar and table planner

@app.route("/update", methods=["POST", "GET"])
def update():
    cursor = mysql.connection.cursor()
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    if request.method == 'POST':

        title = request.form['title']
        start = request.form['start']
        end = request.form['end']
        id = request.form['id']
        print(title)
        print(start)
        cur.execute("UPDATE events SET title = %s, start_event = %s, end_event = %s WHERE id = %s",
                    [title, start, end, id])
        mysql.connection.commit()
        cur.close()
        return redirect(url_for('index'))


# Deleting the current data located within the calendar and table planner

@app.route("/ajax_delete/<string:id>", methods=["GET", "POST"])
def ajax_delete(id):

    flash("Record has been Deleted Successfully")
    con = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    con.execute("DELETE FROM events WHERE id = %s" % (id))
    mysql.connection.commit()
    con.close()
    return redirect(url_for('index'))


if __name__ == "__main__":
    app.run(debug=True)
