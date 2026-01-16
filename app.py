from flask import Flask, render_template, request, jsonify, send_file
from werkzeug.utils import secure_filename
import os
from datetime import datetime
import json

app = Flask(__name__)

# Configuration
UPLOAD_FOLDER = 'uploads/profile'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Portfolio Data (can be stored in JSON file later)
PORTFOLIO_DATA = {
    'name': 'Your Name',
    'title': 'Senior Full-Stack Developer',
    'email': 'your.email@example.com',
    'github': 'https://github.com/yourusername',
    'linkedin': 'https://linkedin.com/in/yourprofile',
    'description': 'Passionate full-stack developer with expertise in Python, Flask, Flutter, and Dart. Solving complex problems with innovative solutions.',
    'profile_image': None,
    'certifications': [
        {
            'name': 'Leadership Certification',
            'date': '2024'
        },
        {
            'name': 'Diploma in Software Development',
            'date': '2023'
        }
    ],
    'skills': [
        {'category': 'Backend', 'items': ['Python', 'Flask', 'Django', 'REST APIs']},
        {'category': 'Frontend', 'items': ['HTML5', 'CSS3', 'JavaScript', 'React']},
        {'category': 'Mobile', 'items': ['Flutter', 'Dart', 'Cross-Platform']},
        {'category': 'Tools & Databases', 'items': ['Git', 'Docker', 'PostgreSQL', 'MongoDB']}
    ],
    'projects': [
        {
            'title': 'Media Converter',
            'description': 'Professional media conversion tool - converts video to MP3 and audio to video formats',
            'github': 'https://github.com/yourusername/media-converter',
            'demo': '#',
            'technologies': ['Python', 'FFmpeg', 'Flask', 'API']
        }
    ]
}

# Routes
@app.route('/')
def home():
    return render_template('index.html', data=PORTFOLIO_DATA)

@app.route('/api/profile')
def get_profile():
    return jsonify(PORTFOLIO_DATA)

@app.route('/api/profile/update', methods=['POST'])
def update_profile():
    try:
        data = request.json
        
        # Update basic info
        if 'name' in data:
            PORTFOLIO_DATA['name'] = data['name']
        if 'title' in data:
            PORTFOLIO_DATA['title'] = data['title']
        if 'email' in data:
            PORTFOLIO_DATA['email'] = data['email']
        if 'github' in data:
            PORTFOLIO_DATA['github'] = data['github']
        if 'linkedin' in data:
            PORTFOLIO_DATA['linkedin'] = data['linkedin']
        if 'description' in data:
            PORTFOLIO_DATA['description'] = data['description']
        
        return jsonify({'success': True, 'message': 'Profile updated'}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/profile/upload-image', methods=['POST'])
def upload_profile_image():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Only image files allowed (png, jpg, jpeg, gif)'}), 400
        
        filename = secure_filename(f"profile_{datetime.now().timestamp()}.{file.filename.rsplit('.', 1)[1].lower()}")
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        PORTFOLIO_DATA['profile_image'] = filename
        
        return jsonify({
            'success': True,
            'filename': filename,
            'message': 'Profile image uploaded'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/skills', methods=['GET', 'POST'])
def manage_skills():
    if request.method == 'POST':
        try:
            skills = request.json
            PORTFOLIO_DATA['skills'] = skills
            return jsonify({'success': True, 'message': 'Skills updated'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    return jsonify(PORTFOLIO_DATA['skills']), 200

@app.route('/api/certifications', methods=['GET', 'POST'])
def manage_certifications():
    if request.method == 'POST':
        try:
            certifications = request.json
            PORTFOLIO_DATA['certifications'] = certifications
            return jsonify({'success': True, 'message': 'Certifications updated'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    return jsonify(PORTFOLIO_DATA['certifications']), 200

@app.route('/api/projects', methods=['GET', 'POST'])
def manage_projects():
    if request.method == 'POST':
        try:
            projects = request.json
            PORTFOLIO_DATA['projects'] = projects
            return jsonify({'success': True, 'message': 'Projects updated'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    return jsonify(PORTFOLIO_DATA['projects']), 200

@app.route('/uploads/profile/<filename>')
def serve_image(filename):
    return send_file(os.path.join(app.config['UPLOAD_FOLDER'], filename))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
