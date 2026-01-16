# Professional Portfolio Website

A modern, professional portfolio website built with Flask to showcase your skills, projects, and experience as a senior full-stack developer.

## Features

✨ **Professional Design**
- Modern, responsive layout
- Smooth animations and transitions
- Professional color scheme

👤 **Profile Management**
- Upload and display profile image
- Customize name, title, and bio
- Add GitHub and LinkedIn links
- Update contact information

🎓 **Showcase Your Credentials**
- Display certifications
- List technical skills by category
- Feature your projects
- Link to GitHub repositories

📱 **Fully Responsive**
- Mobile-friendly design
- Works on all devices
- Touch-optimized navigation

## Installation

### Prerequisites
- Python 3.8+
- pip

### Setup

1. **Install dependencies:**
```bash
pip install -r requirements.txt
```

2. **Run the application:**
```bash
python app.py
```

3. **Open in browser:**
```
http://localhost:8080
```

## Project Structure

```
portfolio_website/
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── templates/
│   └── index.html        # Main HTML template
├── static/
│   ├── css/
│   │   └── style.css     # Styling
│   └── js/
│       └── main.js       # JavaScript functionality
└── uploads/
    └── profile/          # Profile images storage
```

## API Endpoints

### Get Profile
```
GET /api/profile
```

### Update Profile
```
POST /api/profile/update
Content-Type: application/json

{
  "name": "Your Name",
  "title": "Your Title",
  "email": "your@email.com",
  "github": "https://github.com/username",
  "linkedin": "https://linkedin.com/in/username",
  "description": "Your description"
}
```

### Upload Profile Image
```
POST /api/profile/upload-image
Content-Type: multipart/form-data

file: <image-file>
```

### Get Skills
```
GET /api/skills
```

### Update Skills
```
POST /api/skills
Content-Type: application/json
```

### Get Certifications
```
GET /api/certifications
```

### Update Certifications
```
POST /api/certifications
Content-Type: application/json
```

### Get Projects
```
GET /api/projects
```

### Update Projects
```
POST /api/projects
Content-Type: application/json
```

## Customization

### Update Your Information

Edit the `PORTFOLIO_DATA` dictionary in `app.py`:

```python
PORTFOLIO_DATA = {
    'name': 'Your Name',
    'title': 'Senior Full-Stack Developer',
    'email': 'your.email@example.com',
    'github': 'https://github.com/yourusername',
    'linkedin': 'https://linkedin.com/in/yourprofile',
    'description': 'Your professional description',
    # ... more fields
}
```

### Customize Styling

Modify `static/css/style.css` to change colors, fonts, and layouts.

Color variables available:
- `--primary-color`: #667eea
- `--secondary-color`: #764ba2
- `--accent-color`: #f093fb

## Deployment

### Deploy to Vercel

1. **Create a Vercel account** at https://vercel.com

2. **Create `vercel.json`:**
```json
{
  "builds": [
    {"src": "app.py", "use": "@vercel/python"}
  ],
  "routes": [
    {"src": "/(.*)", "dest": "app.py"}
  ]
}
```

3. **Create `.vercelignore`:**
```
uploads/
completed_projects/
```

4. **Push to Git and deploy:**
```bash
git push origin main
```

Then import your repository in Vercel dashboard.

## Technologies Used

- **Backend:** Python, Flask
- **Frontend:** HTML5, CSS3, JavaScript
- **Styling:** Modern CSS with gradients and animations
- **Deployment:** Vercel

## Skills & Certifications

Your portfolio highlights:
- Full-stack development expertise
- Leadership certification
- Diploma achievements
- Technical proficiency in multiple languages

## Contact

Include your preferred contact method in the portfolio settings.

## License

© 2026 Your Portfolio. All rights reserved.
