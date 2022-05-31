from flask import Flask, render_template

app = Flask(__name__)

events = [
    {
        'todo': 'EventTest',
        'date': '2022-06-01',
    },
    {
        'todo': 'EventTest2',
        'date': '2022-06-02',
    }
]

@app.route('/')
def introduction():
    return "Hello World"


@app.route('/mycalendar')
def index():
    return render_template('calendarWebPage.html', events = events)


if __name__ == '__main__':
    app.run(debug=True)
