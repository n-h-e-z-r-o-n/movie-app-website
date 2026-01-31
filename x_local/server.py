from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
import random
import string

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

DB_LOCATION = 'Database/database.db'

def get_db_connection():
    conn = sqlite3.connect(DB_LOCATION)
    conn.row_factory = sqlite3.Row
    return conn

# Helper to ensure unique email for dummy profiles
def generate_dummy_email(name):
    random_suffix = ''.join(random.choices(string.ascii_lowercase + string.digits, k=4))
    return f"{name.replace(' ', '_').lower()}_{random_suffix}@local.com"

@app.route('/getProfiles', methods=['GET'])
def get_profiles():
    try:
        conn = get_db_connection()
        profiles = conn.execute('SELECT id, name, ProfileIMG FROM users').fetchall()
        conn.close()
        return jsonify({'massage': [dict(row) for row in profiles]})
    except Exception as e:
        return jsonify({'massage': str(e)})

@app.route('/createProfile', methods=['POST'])
def create_profile():
    try:
        data = request.form
        name = data.get('name')
        profile_img = data.get('ProfileIMG', '/Assets/account.png')
        
        # Generate dummy credentials
        email = generate_dummy_email(name)
        password = "dummy_password"
        watchlist = '[]'
        messages = '[]'
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('INSERT INTO users (name, email, password, watchlist, Messages, ProfileIMG) VALUES (?, ?, ?, ?, ?, ?)',
                       (name, email, password, watchlist, messages, profile_img))
        user_id = cursor.lastrowid
        conn.commit()
        
        # Determine strict user dict to return
        user_dict = {
            'id': user_id,
            'name': name,
            'email': email,
            'watchlist': watchlist,
            'Messages': messages,
            'ProfileIMG': profile_img
        }
        
        # Automatically set as active user for seamless flow (optional, but good UX)
        cursor.execute('DELETE FROM current_session')
        cursor.execute('INSERT INTO current_session (user_id) VALUES (?)', (user_id,))
        conn.commit()
        conn.close()
        
        return jsonify({'massage': user_dict})
    except Exception as e:
        return jsonify({'massage': str(e)})

@app.route('/loginProfile', methods=['POST'])
def login_profile():
    try:
        user_id = request.form.get('id')
        conn = get_db_connection()
        user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
        
        if user:
            # Set as active user in DB
            conn.execute('DELETE FROM current_session')
            conn.execute('INSERT INTO current_session (user_id) VALUES (?)', (user_id,))
            conn.commit()
            
            user_dict = dict(user)
            del user_dict['password']
            conn.close()
            return jsonify({'massage': user_dict})
        else:
            conn.close()
            return jsonify({'massage': 'User not found'})
    except Exception as e:
        return jsonify({'massage': str(e)})

@app.route('/updateProfile', methods=['POST'])
def update_profile():
    try:
        data = request.form
        user_id = data.get('id')
        name = data.get('name')
        profile_img = data.get('ProfileIMG')
        
        conn = get_db_connection()
        # Update name and image. If argument is missing, keep existing (optional logic, but here we expect both or handle in frontend)
        # Simplified: Update both provided.
        conn.execute('UPDATE users SET name = ?, ProfileIMG = ? WHERE id = ?', (name, profile_img, user_id))
        conn.commit()
        
        # Fetch updated user to return
        user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
        conn.close()
        
        if user:
            user_dict = dict(user)
            del user_dict['password']
            return jsonify({'massage': user_dict})
        else:
            return jsonify({'massage': 'User not found after update'})
            
    except Exception as e:
        return jsonify({'massage': str(e)})

@app.route('/getActiveUser', methods=['GET'])
def get_active_user():

    try:
        conn = get_db_connection()
        session = conn.execute('SELECT user_id FROM current_session LIMIT 1').fetchone()
        
        if session:
            user_id = session['user_id']
            user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
            conn.close()
            if user:
                user_dict = dict(user)
                del user_dict['password']
                return jsonify({'massage': user_dict})
        
        conn.close()
        return jsonify({'massage': None})
    except Exception as e:
        return jsonify({'massage': str(e)})

@app.route('/logout', methods=['POST'])
def logout():
    try:
        conn = get_db_connection()
        conn.execute('DELETE FROM current_session')
        conn.commit()
        conn.close()
        return jsonify({'massage': 'Logged out successfully'})
    except Exception as e:
        return jsonify({'massage': str(e)})

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
    
    conn = None
    try:
        # Initialize DB tables if not exists
        conn = sqlite3.connect(DB_LOCATION)
        
        # Users table
        conn.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                watchlist TEXT,
                Messages TEXT,
                ProfileIMG TEXT
            )
        ''')

        # Session table to strictly maintain active user
        conn.execute('''
            CREATE TABLE IF NOT EXISTS current_session (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER
            )
        ''')
        
        conn.commit()
        print(f"Database checked/initialized at {DB_LOCATION}")
    except Exception as e:
        print(f"Database error: {e}")
    finally:
        if conn:
            conn.close()

    print("Starting server on http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
