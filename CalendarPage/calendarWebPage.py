from flask import Flask, render_template
app = Flask(__name__)


@app.route('/')
def introduction():
    return "Hello World"


@app.route('/mycalendar')
def index():
    return render_template('calendarWebPage.html')


if __name__ == '__main__':
    app.run(debug=True)
