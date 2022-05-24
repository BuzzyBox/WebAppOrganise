from flask import Flask, render_template, redirect, url_for, request

app=Flask(__name__)

@app.route('/')
def index():
    return render_template('style.html') 

if __name__ == "__main__":
    app.run(debug=True)

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['username'] != 'admin' or request.form['password'] != 'admin':
            error = 'Invalid Credentials. Please try again.'
        else:
            return redirect(url_for('home'))
    return render_template('style.html', error=error)