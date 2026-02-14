# ar-resume-analyzer
A full-stack AR Resume Analyzer that transforms traditional resumes into interactive holographic displays with intelligent scoring and QR/marker-based visualization.

# Resume Builder & Analyzer

A comprehensive professional resume builder with gamified analyzer and AR display support.

## Features

Dynamic Resume Builder - Build professional resumes with multiple sections
Gamified Analyzer - Score your resume, get suggestions, and optimize for ATS
AR Display - View your resume in Augmented Reality using Hiro marker
Sign-In System - Secure access with localStorage persistence
Backend Integration - Full Node.js/Express backend support
Professional UI - Beautiful Bootstrap-based interface with smooth UX

## Project Structure

```
resume-builder-analyzer/
├── client/                 # Frontend files
│   ├── index.html         # Resume builder dashboard
│   ├── signin.html        # Sign-in page
│   ├── analyzer.html      # Resume analyzer
│   ├── ar.html            # AR resume viewer
│   ├── script.js          # Resume builder logic
│   ├── analyzer.js        # Analyzer scoring engine
│   └── style.css          # Styles (if needed)
├── server/
│   └── server.js          # Express backend
├── resumes.json           # Resume storage
└── package.json           # Dependencies
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm

### Install Dependencies

```bash
cd resume-builder-analyzer
npm install express cors
```

## Running the Project

### Option 1: Full Backend + Frontend (Recommended)

```bash
cd server
node server.js
```

Then open: **http://localhost:3000**

- Server serves all frontend files
- Resume data syncs to both localStorage and backend
- API endpoints available at `/api/` routes

### Option 2: Frontend Only (Quick Start)

Simply open `client/index.html` in a browser, or use any local server:

```bash
cd client
python -m http.server 8000
# or
npx http-server
```

Then open: **http://localhost:8000**

## Usage Guide

### 1. Sign In
- Email: `user@example.com`
- Password: `Password123`

### 2. Build Resume
- Fill in all resume sections (Personal, Experience, Education, Skills, etc.)
- Click "Generate Resume"
- Click "View Resume" to see the professional layout

### 3. Analyze Resume
- Go to "Analyze & Improve"
- Paste your resume text
- Get instant feedback with:
  - Overall score (0-100)
  - Detailed analysis
  - ATS compatibility score
  - Actionable improvement suggestions

### 4. View in AR
- Fill resume form → Click "View Resume"
- Point webcam at **Hiro Marker** image
- Resume displays in AR on the marker

## API Endpoints

If running backend server:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Serve index.html |
| `/api/health` | GET | Server health check |
| `/api/saveResume` | POST | Save resume data |
| `/api/getResume` | GET | Retrieve saved resume |

### Example API Call

```javascript
// Save resume
fetch('/api/saveResume', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fullName: 'John Doe',
    email: 'john@example.com',
    skills: 'JavaScript, Python, React'
    // ... other fields
  })
})

// Get resume
fetch('/api/getResume').then(res => res.json())
```

## Technologies Used

- **Frontend**: HTML5, CSS3, Bootstrap 5, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js, CORS
- **AR**: A-Frame, AR.js
- **Storage**: LocalStorage + File System (JSON)

## Browser Requirements

- Modern browser with WebCamera support (Chrome, Firefox, Edge)
- HTTPS recommended for production AR features
- Enable camera permissions when prompted

## Demo Credentials

- **Email**: user@example.com
- **Password**: Password123

## Tips for Best Results

### Resume Analysis
- Use professional action words: "Developed", "Managed", "Led", "Implemented"
- Include technical skills relevant to your role
- Add measurable results (numbers, percentages, achievements)
- Keep word count between 150-500 words

### AR Display
- Use the Hiro marker (search "AR.js Hiro marker" for printable version)
- Good lighting improves AR tracking
- Hold marker steady for best text display
- Marker size: 4x4 inches minimum recommended

## Troubleshooting

**"No resume data found"**
- Make sure you filled and saved the resume first
- Check if localStorage is enabled in your browser

**AR not displaying**
- Ensure you're pointing at the Hiro marker
- Check webcam permissions
- Try in a well-lit area
- Use a printed or displayed Hiro marker

**Server won't start**
- Port 3000 may be in use: `netstat -ano | findstr :3000` (Windows)
- Kill process or change port in server.js
- Ensure dependencies installed: `npm install`

**API calls failing**
- Check if server is running on port 3000
- Verify CORS is enabled (it is by default)
- Check browser console for errors

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Resume import (PDF/DOCX)
- Export to PDF
- Multiple resume templates
- AI-powered suggestions
- Cloud storage sync
- Resume analytics dashboard
- Version history tracking

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, check the console logs and ensure:
1. All dependencies are installed
2. Server is running (if using backend)
3. Browser allows camera and storage access
4. You're using a modern browser

---

**Made with care for Resume Builders**
