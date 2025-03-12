from flask import Flask, render_template, request
import os
import psycopg2

app = Flask(__name__)


DATABASE_URL = os.environ['DATABASE_URL']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contact', methods=['POST'])
def contact():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']
    

    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        cur.execute("INSERT INTO contacts (name, email, message) VALUES (%s, %s, %s)", (name, email, message))
        conn.commit()
        cur.close()
        conn.close()
        return "Success"
    except Exception as e:
        print(e)
        return "Error"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
