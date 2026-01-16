// Calculator Functions
let calcDisplay = '0';
let previousValue = 0;
let operation = null;
let shouldResetDisplay = false;

function updateCalcDisplay() {
    document.getElementById('calcDisplay').value = calcDisplay;
}

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        calcDisplay = value;
        shouldResetDisplay = false;
    } else {
        if (calcDisplay === '0' && value !== '.') {
            calcDisplay = value;
        } else if (value === '.' && calcDisplay.includes('.')) {
            return;
        } else {
            calcDisplay += value;
        }
    }
    updateCalcDisplay();
}

function clearDisplay() {
    calcDisplay = '0';
    previousValue = 0;
    operation = null;
    shouldResetDisplay = false;
    updateCalcDisplay();
}

function calculateResult() {
    if (operation === null) return;
    
    let result;
    const currentValue = parseFloat(calcDisplay);
    
    switch(operation) {
        case '+':
            result = previousValue + currentValue;
            break;
        case '-':
            result = previousValue - currentValue;
            break;
        case '*':
            result = previousValue * currentValue;
            break;
        case '/':
            result = previousValue / currentValue;
            break;
        default:
            return;
    }
    
    calcDisplay = result.toString();
    operation = null;
    previousValue = 0;
    shouldResetDisplay = true;
    updateCalcDisplay();
}

// Override append to handle operators
const originalAppendToDisplay = appendToDisplay;
window.appendToDisplay = function(value) {
    if (['+', '-', '*', '/'].includes(value)) {
        if (operation !== null) {
            calculateResult();
        }
        previousValue = parseFloat(calcDisplay);
        operation = value;
        shouldResetDisplay = true;
    } else {
        originalAppendToDisplay(value);
    }
};

// Chatbot Functions
const chatResponses = {
    'hello': 'Hi there! Welcome to my portfolio. How can I help you today?',
    'hi': 'Hello! Feel free to ask me about my projects, skills, or experience.',
    'skills': 'I have expertise in Python, Flask, JavaScript, React, Flutter, Dart, and more. Check the Skills section for details!',
    'projects': 'I have several projects including a Media Converter and more. Visit the Projects section to learn more!',
    'contact': 'You can reach me via email or through my GitHub and LinkedIn profiles. Scroll to the Contact section!',
    'education': 'I hold a Diploma in Software Development and a Leadership Certification.',
    'experience': 'I am a Senior Full-Stack Developer with expertise in building web and mobile applications.',
    'github': 'You can find my GitHub profile linked in the contact section.',
    'calculator': 'I have a calculator tool on this page! Scroll to the Calculator section to try it.',
    'help': 'You can ask me about: skills, projects, contact, education, experience, github, or calculator.',
    'default': 'That\'s interesting! Feel free to ask me about my projects, skills, or how to contact me.'
};

function toggleChatbot() {
    const widget = document.querySelector('.chatbot-widget');
    widget.classList.toggle('minimized');
}

function sendChatMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    input.value = '';
    
    // Get bot response
    setTimeout(() => {
        const response = getBotResponse(message);
        addChatMessage(response, 'bot');
    }, 300);
}

function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function addChatMessage(text, sender) {
    const messagesDiv = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function getBotResponse(message) {
    const lowerMessage = message.toLowerCase().trim();
    
    // Check for exact matches
    for (let key in chatResponses) {
        if (lowerMessage.includes(key)) {
            return chatResponses[key];
        }
    }
    
    // Default response
    return chatResponses['default'];
}

// Initialize chatbot with welcome message
document.addEventListener('DOMContentLoaded', async () => {
    updateCalcDisplay();
    await loadPortfolioData();
    setupEventListeners();
    
    // Add initial bot message
    setTimeout(() => {
        addChatMessage('👋 Hi! I\'m your portfolio assistant. Ask me anything!', 'bot');
    }, 500);
});

async function loadPortfolioData() {
    try {
        const response = await fetch('/api/profile');
        const data = await response.json();
        
        // Update basic info
        document.getElementById('fullName').textContent = data.name;
        document.getElementById('jobTitle').textContent = data.title;
        document.getElementById('description').textContent = data.description;
        document.getElementById('contactEmail').href = `mailto:${data.email}`;
        
        // Update social links
        document.getElementById('githubLink').href = data.github || '#';
        document.getElementById('linkedinLink').href = data.linkedin || '#';
        document.getElementById('emailLink').href = `mailto:${data.email}`;
        
        // Update profile image
        if (data.profile_image) {
            document.getElementById('profileImage').src = `/uploads/profile/${data.profile_image}`;
        }
        
        // Load certifications
        loadCertifications(data.certifications);
        
        // Load skills
        loadSkills(data.skills);
        
        // Load projects
        loadProjects(data.projects);
        
    } catch (error) {
        console.error('Error loading portfolio data:', error);
    }
}

function loadCertifications(certifications) {
    const certList = document.getElementById('certList');
    certList.innerHTML = '';
    
    certifications.forEach(cert => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${cert.name}</strong><br>
            <small>${cert.date}</small>
        `;
        certList.appendChild(li);
    });
}

function loadSkills(skills) {
    const skillsGrid = document.getElementById('skillsGrid');
    skillsGrid.innerHTML = '';
    
    skills.forEach(skillGroup => {
        const div = document.createElement('div');
        div.className = 'skill-category';
        div.innerHTML = `
            <h3>${skillGroup.category}</h3>
            <ul>
                ${skillGroup.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;
        skillsGrid.appendChild(div);
    });
}

function loadProjects(projects) {
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const div = document.createElement('div');
        div.className = 'project-card';
        div.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-technologies">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                ${project.github !== '#' ? `<a href="${project.github}" target="_blank">View on GitHub</a>` : ''}
                ${project.demo ? `<a href="${project.demo}" target="_blank">Live Demo</a>` : ''}
            </div>
        `;
        projectsGrid.appendChild(div);
    });
}

function setupEventListeners() {
    // Image upload
    document.getElementById('imageUpload').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            const response = await fetch('/api/profile/upload-image', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            if (response.ok) {
                document.getElementById('profileImage').src = `/uploads/profile/${result.filename}`;
                showNotification('Profile image updated successfully!', 'success');
            } else {
                showNotification(result.error || 'Error uploading image', 'error');
            }
        } catch (error) {
            console.error('Upload error:', error);
            showNotification('Error uploading image', 'error');
        }
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
