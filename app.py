
from flask import Flask, render_template, request, redirect, url_for, session
app=Flask(__name__)
app.secret_key = 'many random bytes'
import sqlite3 as sql



con = sql.connect("users.db")
cur = con.cursor()

@app.route('/')
def mainP():
 return render_template('style.html') 


@app.route('/login', methods=['POST', 'GET'])
def login():
     
    with sql.connect("users.db") as con:

      if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
         # Create variables for easy access
         U_userName = request.form['username']
         U_password = request.form['password']
         cur = con.cursor()
         sq = 'SELECT U_userName, U_password FROM users WHERE U_userName = ?, U_password= ?'
         args = (U_userName, U_password)
         cur.execute(sq, args)
      
         users = cur.fetchone()
         cur.close()
        
         if users:
            session['loggedin'] = True
            #session['U_ID'] = users['U_ID']
            session['U_userName'] = users['U_userName']
            # Redirect to home page
            return redirect(url_for('home'))
         else:
            # Account doesnt exist or username/password incorrect
            msg = 'Incorrect username/password!'
    # Show the login form with message (if any)
      return render_template('login.html')
     
@app.route('/login/logout')
def logout():
    # Remove session data, this will log the user out
   session.pop('loggedin', None)
   session.pop('id', None)
   session.pop('username', None)
   # Redirect to login page
   return redirect(url_for('login'))

@app.route('/login/register', methods=['GET', 'POST'])
def register():
    # Output message if something goes wrong...
    msg = ''
    # Check if "username", "password" and "email" POST requests exist (user submitted form)
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'email' in request.form:
        # Create variables for easy access
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
            # Check if account exists using MySQL
        cursor = sql.connection.cursor(sql.cursors.DictCursor)
        cursor.execute('SELECT * FROM accounts WHERE username = %s', (username,))
        account = cursor.fetchone()
        # If account exists show error and validation checks
        if account:
            msg = 'Account already exists!'
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            msg = 'Invalid email address!'
        elif not re.match(r'[A-Za-z0-9]+', username):
            msg = 'Username must contain only characters and numbers!'
        elif not username or not password or not email:
            msg = 'Please fill out the form!'
        else:
            # Account doesnt exists and the form data is valid, now insert new account into accounts table
            cursor.execute('INSERT INTO accounts VALUES (NULL, %s, %s, %s)', (username, password, email,))
            sql.connection.commit()
            msg = 'You have successfully registered!'
    elif request.method == 'POST':
        # Form is empty... (no POST data)
        msg = 'Please fill out the form!'
    # Show registration form with message (if any)
    return render_template('register.html', msg=msg)

@app.route('/login/home')
def home():
    # Check if user is loggedin
    if 'loggedin' in session:
            
        # We need all the account info for the user so we can display it on the profile page
        cursor = sql.connection.cursor(sql.cursors.DictCursor)
        cursor.execute('SELECT * FROM accounts WHERE id = %s', (session['id'],))
        account = cursor.fetchone()
        # Show the profile page with account info
        return render_template('home.html', username=session['username'], account=account)
    # User is not loggedin redirect to login page
    return redirect(url_for('login'))

@app.route('/login/profile')
def profile():
    # Check if user is loggedin
    if 'loggedin' in session:
        # We need all the account info for the user so we can display it on the profile page
        cursor = sql.connection.cursor(sql.cursors.DictCursor)
        cursor.execute('SELECT * FROM accounts WHERE id = %s', (session['id'],))
        account = cursor.fetchone()
        # Show the profile page with account info
        return render_template('profile.html', account=account)
    # User is not loggedin redirect to login page
    return redirect(url_for('login'))

if __name__ == "__main__":
    app.run(debug=True)




