from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

DB_LOCATION = './database.db'

def get_db_connection():
    conn = sqlite3.connect(DB_LOCATION)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.form
        email = data.get('email')
        password = data.get('password')
        
        conn = get_db_connection()
        user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
        conn.close()

        if user:
            if user['password'] == password:
                user_dict = dict(user)
                del user_dict['password'] # Don't send password back 
                return jsonify({'massage': user_dict})
            else:
                return jsonify({'massage': 'Invalid password'})
        else:
            return jsonify({'massage': 'User not found'})
    except Exception as e:
        return jsonify({'massage': str(e)})

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.form
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        watchlist = '[]'
        messages = '[]'
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Check if user exists
        existing_user = cursor.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
        if existing_user:
            conn.close()
            return jsonify({'massage': 'User already exists'})
            
        cursor.execute('INSERT INTO users (name, email, password, watchlist, Messages) VALUES (?, ?, ?, ?, ?)',
                       (name, email, password, watchlist, messages))
        conn.commit()
        conn.close()
        
        return jsonify({'massage': 'User added successfully'})
    except Exception as e:
        return jsonify({'massage': str(e)})


@app.route('/getWatchlist', methods=['POST'])
def get_watchlist():
    try:
        email = request.form.get('email')
        conn = get_db_connection()
        user = conn.execute('SELECT watchlist FROM users WHERE email = ?', (email,)).fetchone()
        conn.close()
        
        if user:
            return jsonify({'massage': user['watchlist']})
        return jsonify({'massage': 'Error fetching'})
    except Exception as e:
        return jsonify({'massage': str(e)})

@app.route('/updateWatchlist', methods=['POST'])
def update_watchlist():
    try:
        email = request.form.get('email')
        watchlist = request.form.get('watchlist')
        
        conn = get_db_connection()
        conn.execute('UPDATE users SET watchlist = ? WHERE email = ?', (watchlist, email))
        conn.commit()
        conn.close()
        return jsonify({'massage': 'Watchlist updated successfully'})
    except Exception as e:
        return jsonify({'massage': str(e)})

@app.route('/getMessageslist', methods=['POST'])
def get_messages():
    try:
        email = request.form.get('email')
        conn = get_db_connection()
        user = conn.execute('SELECT Messages FROM users WHERE email = ?', (email,)).fetchone()
        conn.close()
        
        if user:
            return jsonify({'massage': user['Messages']})
        return jsonify({'massage': 'Error fetching'})
    except Exception as e:
         return jsonify({'massage': str(e)})

@app.route('/updateMassagelist', methods=['POST'])
def update_messages():
    try:
        email = request.form.get('email')
        messages = request.form.get('Messages')
        
        conn = get_db_connection()
        conn.execute('UPDATE users SET Messages = ? WHERE email = ?', (messages, email))
        conn.commit()
        conn.close()
        return jsonify({'massage': 'Messages updated successfully'})
    except Exception as e:
        return jsonify({'massage': str(e)})

@app.route('/getUser', methods=['POST'])
def get_user():
    try:
        email = request.form.get('email')
        conn = get_db_connection()
        user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
        conn.close()
        
        if user:
            user_dict = dict(user)
            del user_dict['password']
            return jsonify({'massage': user_dict})
        return jsonify({'massage': 'User not found'})
    except Exception as e:
        return jsonify({'massage': str(e)})

@app.route('/requestPasswordReset', methods=['POST'])
def reset_password():
    return jsonify({'massage': 'If this email exists, a reset link has been sent (Mock)'})

if __name__ == '__main__':
    # Create Database folder if not exists
    if not os.path.exists('Database'):
        os.makedirs('Database')
    
    # Initialize DB table if not exists (Basic check)
    if not os.path.exists(DB_LOCATION):
        conn = sqlite3.connect(DB_LOCATION)
        conn.execute('''
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                watchlist TEXT,
                Messages TEXT,
                ProfileIMG TEXT
            )
        ''')
        conn.close()
        print(f"Created new database at {DB_LOCATION}")

    print("Starting server on http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
