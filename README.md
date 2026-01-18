<div align="center">

# 🌱 Clean Campus (EcoLocate)

### *Empowering Sustainable Campus Communities*

[![Live Demo](https://img.shields.io/badge/🌐_Live-ecolocate.vercel.app-00C851?style=for-the-badge)](https://ecolocate.vercel.app)
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-4DB33D?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/mern-stack)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

**A comprehensive MERN stack platform for managing campus cleanliness, waste management, and environmental sustainability initiatives.**

[🌟 Features](#-features) • [🚀 Demo](#-live-demo) • [💻 Tech Stack](#-tech-stack) • [⚙️ Installation](#️-installation) • [🤝 Contributing](#-contributing)

---

</div>

## 📖 About The Project

**Clean Campus (EcoLocate)** is a modern web application designed to revolutionize how educational institutions manage campus cleanliness and environmental sustainability. By leveraging technology, we empower students, staff, and facility managers to collaborate in creating cleaner, greener, and more sustainable campus environments.

### 🎯 Mission

To create a platform that makes it easy for campus communities to report issues, track waste management, monitor cleanliness, and participate in environmental initiatives—all while promoting sustainable practices and community engagement.

---

## ✨ Features

### 🗺️ **Interactive Campus Map**

<table>
<tr>
<td width="60%">

- **Real-time Location Tracking**: Pinpoint exact locations of cleanliness issues
- **Interactive Markers**: Visual indicators for different issue types
- **Zone Management**: Organize campus into manageable cleaning zones
- **Navigation Support**: Easy directions to reported issue locations
- **Geo-fencing**: Automatic notifications for area-specific alerts

</td>
<td width="40%">

```javascript
// Location-based reporting
const reportIssue = {
  type: 'waste_overflow',
  location: {
    lat: 12.9716,
    lng: 77.5946
  },
  zone: 'Academic Block A'
}
```

</td>
</tr>
</table>

---

### 📝 **Issue Reporting System**

Report campus cleanliness and maintenance issues with ease:

| Feature | Description |
|---------|-------------|
| 📸 **Photo Upload** | Capture and attach images of issues for faster resolution |
| 🏷️ **Category Tags** | Classify issues: waste overflow, littering, maintenance, etc. |
| ⚡ **Priority Levels** | Mark urgent issues for immediate attention |
| 📍 **Location Pins** | Auto-detect or manually pin issue locations |
| 💬 **Comments** | Add detailed descriptions and updates |
| 🔔 **Status Tracking** | Follow your reports from submission to resolution |

---

### ♻️ **Waste Management Dashboard**

<div align="center">

| **Module** | **Functionality** |
|:----------:|:------------------|
| 🗑️ **Bin Monitoring** | Track waste bin fill levels across campus |
| 📊 **Analytics** | View waste generation patterns and trends |
| 🚛 **Collection Routes** | Optimize waste collection schedules |
| ♻️ **Recycling Stats** | Monitor recycling rates and impact |
| 📈 **Reports** | Generate comprehensive waste management reports |

</div>

---

### 👥 **User Management & Roles**

**Role-Based Access Control (RBAC)** ensures appropriate permissions:

```mermaid
graph TD
    A[Users] --> B[Students]
    A --> C[Staff]
    A --> D[Facility Managers]
    A --> E[Administrators]
    
    B --> F[Report Issues]
    B --> G[Track Status]
    
    C --> F
    C --> G
    C --> H[Update Reports]
    
    D --> F
    D --> H
    D --> I[Manage Zones]
    D --> J[Assign Tasks]
    
    E --> K[Full Access]
    E --> L[User Management]
    E --> M[Analytics Dashboard]
    
    style A fill:#4CAF50
    style E fill:#FF9800
```

---

### 📊 **Analytics & Insights**

- **Performance Metrics**: Track resolution times and efficiency
- **Heat Maps**: Identify problem areas requiring attention
- **Trend Analysis**: Monitor cleanliness improvements over time
- **Sustainability Metrics**: Calculate environmental impact
- **Custom Reports**: Generate reports for stakeholders
- **Data Export**: Download data in CSV/PDF formats

---

### 🔔 **Notification System**

Stay updated with real-time notifications:

- ✅ Issue status updates
- 🎯 Task assignments for staff
- ⏰ Scheduled maintenance reminders
- 🏆 Community achievements and milestones
- 📧 Email notifications
- 📱 In-app alerts

---

### 🌍 **Sustainability Initiatives**

<table>
<tr>
<td width="50%">

**Green Challenges**
- Campus-wide recycling competitions
- Waste reduction campaigns
- Eco-friendly behavior rewards
- Carbon footprint tracking

</td>
<td width="50%">

**Community Engagement**
- Volunteer event scheduling
- Environmental awareness campaigns
- Student-led initiatives
- Impact visualization

</td>
</tr>
</table>

---

## 💻 Tech Stack

<div align="center">

### **Frontend**

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![React Router](https://img.shields.io/badge/React_Router-6-CA4245?style=flat-square&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Axios](https://img.shields.io/badge/Axios-HTTP_Client-5A29E4?style=flat-square)](https://axios-http.com/)
[![CSS3](https://img.shields.io/badge/CSS3-Styling-1572B6?style=flat-square&logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Leaflet](https://img.shields.io/badge/Leaflet-Maps-199900?style=flat-square&logo=leaflet)](https://leafletjs.com/)

### **Backend**

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-ODM-880000?style=flat-square)](https://mongoosejs.com/)

### **Authentication & Security**

[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=json-web-tokens)](https://jwt.io/)
[![bcrypt](https://img.shields.io/badge/bcrypt-Encryption-003A70?style=flat-square)](https://www.npmjs.com/package/bcrypt)

### **Deployment**

[![Vercel](https://img.shields.io/badge/Vercel-Hosting-000000?style=flat-square&logo=vercel)](https://vercel.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-Cloud_DB-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/cloud/atlas)

</div>

---

## 🌐 Live Demo

Visit the live application: **[ecolocate.vercel.app](https://ecolocate.vercel.app)**

### Test Credentials

| Role | Username | Password |
|------|----------|----------|
| Student | `demo@student.edu` | `demo123` |
| Staff | `demo@staff.edu` | `demo123` |
| Admin | `demo@admin.edu` | `admin123` |

> **Note**: These are demo credentials. Please change passwords immediately after first login in production.

---

## ⚙️ Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local or Atlas) - [Get Started](https://www.mongodb.com/)
- **Git** - [Install](https://git-scm.com/)
- **npm** or **yarn** package manager

### 🚀 Quick Start

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/GaganCN10/clean-campus.git
cd clean-campus
```

#### 2️⃣ Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
touch .env
```

**Environment Variables** (`server/.env`):

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/clean-campus
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/clean-campus

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=30d

# Email Configuration (Optional - for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password

# Cloudinary (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Google Maps API (Optional - for mapping features)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

#### 3️⃣ Frontend Setup

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Create .env file
touch .env
```

**Environment Variables** (`client/.env`):

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_KEY=your_google_maps_api_key
```

#### 4️⃣ Database Setup

**Option A: Local MongoDB**
```bash
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

#### 5️⃣ Run the Application

Open **two terminal windows**:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
# Client runs on http://localhost:3000
```

#### 6️⃣ Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Documentation**: http://localhost:5000/api-docs (if configured)

---

## 🏗️ Project Structure

```
clean-campus/
├── client/                    # React frontend application
│   ├── public/               # Static files
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   │   ├── Auth/        # Authentication components
│   │   │   ├── Dashboard/   # Dashboard components
│   │   │   ├── Map/         # Map and location components
│   │   │   ├── Reports/     # Issue reporting components
│   │   │   └── Shared/      # Shared UI components
│   │   ├── pages/           # Page components
│   │   │   ├── Home.js
│   │   │   ├── Dashboard.js
│   │   │   ├── ReportIssue.js
│   │   │   └── Analytics.js
│   │   ├── context/         # React Context API
│   │   ├── services/        # API service functions
│   │   ├── utils/           # Utility functions
│   │   ├── styles/          # CSS/SCSS files
│   │   ├── App.js           # Main app component
│   │   └── index.js         # Entry point
│   ├── package.json
│   └── .env
│
├── server/                   # Node.js backend application
│   ├── config/              # Configuration files
│   │   └── db.js           # Database connection
│   ├── controllers/         # Route controllers
│   │   ├── authController.js
│   │   ├── issueController.js
│   │   ├── userController.js
│   │   └── analyticsController.js
│   ├── models/             # Mongoose models
│   │   ├── User.js
│   │   ├── Issue.js
│   │   ├── Zone.js
│   │   └── Report.js
│   ├── routes/             # API routes
│   │   ├── auth.js
│   │   ├── issues.js
│   │   ├── users.js
│   │   └── analytics.js
│   ├── middleware/         # Custom middleware
│   │   ├── auth.js        # JWT authentication
│   │   ├── error.js       # Error handling
│   │   └── upload.js      # File upload handling
│   ├── utils/              # Utility functions
│   │   ├── emailService.js
│   │   └── validators.js
│   ├── server.js           # Express app entry point
│   ├── package.json
│   └── .env
│
├── .gitignore
├── vercel.json              # Vercel deployment config
├── package.json             # Root package.json
└── README.md
```

---

## 🔑 Key Features Explained

### Issue Reporting Workflow

```javascript
// Example: Creating a new issue report
const newIssue = {
  title: "Overflowing waste bin",
  description: "The recycling bin near Building A is overflowing",
  category: "waste_management",
  priority: "high",
  location: {
    type: "Point",
    coordinates: [77.5946, 12.9716] // [longitude, latitude]
  },
  zone: "academic_block_a",
  images: ["image1.jpg", "image2.jpg"],
  reportedBy: userId
};

// Submit via API
await axios.post('/api/issues', newIssue);
```

### Real-time Status Updates

Issues move through these states:
1. **Reported** → New issue submitted
2. **Acknowledged** → Staff viewed the issue
3. **In Progress** → Actively being resolved
4. **Resolved** → Issue fixed, awaiting verification
5. **Closed** → Verified and completed

---

## 📱 User Roles & Permissions

### 🎓 Students
- Report campus cleanliness issues
- Track own report statuses
- View campus cleanliness map
- Participate in sustainability challenges
- Earn eco-points for contributions

### 👔 Staff
- View assigned issues
- Update issue status
- Add resolution notes
- Mark issues as resolved
- Access facility management tools

### 🛠️ Facility Managers
- Assign tasks to staff members
- Manage campus zones
- View analytics and reports
- Optimize cleaning schedules
- Monitor team performance

### 👑 Administrators
- Full system access
- User management
- Configure system settings
- Generate comprehensive reports
- Manage sustainability initiatives

---

## 📊 API Endpoints

### Authentication
```
POST   /api/auth/register          # Register new user
POST   /api/auth/login             # User login
GET    /api/auth/me                # Get current user
PUT    /api/auth/updatepassword    # Update password
```

### Issues
```
GET    /api/issues                 # Get all issues
POST   /api/issues                 # Create new issue
GET    /api/issues/:id             # Get single issue
PUT    /api/issues/:id             # Update issue
DELETE /api/issues/:id             # Delete issue
PUT    /api/issues/:id/status      # Update status
```

### Users
```
GET    /api/users                  # Get all users (admin)
GET    /api/users/:id              # Get single user
PUT    /api/users/:id              # Update user
DELETE /api/users/:id              # Delete user
```

### Analytics
```
GET    /api/analytics/dashboard    # Dashboard stats
GET    /api/analytics/issues       # Issue statistics
GET    /api/analytics/zones        # Zone performance
GET    /api/analytics/trends       # Trend analysis
```

---

## 🎨 Screenshots

<div align="center">

### Dashboard View
![Dashboard](https://via.placeholder.com/800x400/4CAF50/FFFFFF?text=Dashboard+View)

### Issue Reporting
![Report Issue](https://via.placeholder.com/800x400/2196F3/FFFFFF?text=Report+Issue)

### Interactive Map
![Campus Map](https://via.placeholder.com/800x400/FF9800/FFFFFF?text=Interactive+Campus+Map)

### Analytics Dashboard
![Analytics](https://via.placeholder.com/800x400/9C27B0/FFFFFF?text=Analytics+Dashboard)

</div>

---

## 🚀 Deployment

### Deploy to Vercel

The application is configured for easy Vercel deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**`vercel.json` Configuration:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "client/$1"
    }
  ]
}
```

### Environment Variables on Vercel

Add these in Vercel Dashboard → Settings → Environment Variables:
- `MONGODB_URI`
- `JWT_SECRET`
- `NODE_ENV=production`
- All other variables from `.env`

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test suite
npm test -- --testPathPattern=auth
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/YourAmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/YourAmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- 📝 Write clear, descriptive commit messages
- 🎨 Follow the existing code style
- ✅ Ensure all tests pass
- 📚 Update documentation as needed
- 🐛 Add tests for new features
- 💬 Be respectful and collaborative

### Code Style

- Use **ESLint** for JavaScript linting
- Follow **Airbnb JavaScript Style Guide**
- Use **Prettier** for code formatting
- Write meaningful variable and function names

---

## 🐛 Bug Reports & Feature Requests

### 🐞 Found a Bug?

Open an issue with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, etc.)

### 💡 Have an Idea?

We'd love to hear it! Open an issue with:
- Feature description
- Use case and benefits
- Possible implementation approach
- Mockups or wireframes (optional)

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Acknowledgments

- **MongoDB** for the robust database solution
- **React** community for excellent documentation
- **Vercel** for seamless deployment
- **Leaflet** for interactive mapping capabilities
- All contributors who helped build this platform
- Campus communities testing and providing feedback

---

## 📞 Contact & Support

**Project Maintainer**: Gagan CN

- 📧 Email: [Contact via GitHub](https://github.com/GaganCN10)
- 🐙 GitHub: [@GaganCN10](https://github.com/GaganCN10)
- 🔗 Project: [clean-campus](https://github.com/GaganCN10/clean-campus)
- 🌐 Live Demo: [ecolocate.vercel.app](https://ecolocate.vercel.app)

### Support the Project

If Clean Campus has been helpful for your institution:

- ⭐ Star the repository
- 🍴 Fork and contribute
- 📢 Share with others
- 💬 Provide feedback

---

## 🗺️ Roadmap

### 🎯 Current Phase (v1.0)
- [x] User authentication and authorization
- [x] Issue reporting system
- [x] Interactive campus map
- [x] Basic analytics dashboard
- [x] Role-based access control

### 🚀 Next Phase (v1.5)
- [ ] Mobile application (React Native)
- [ ] Push notifications
- [ ] Advanced analytics with ML predictions
- [ ] Integration with IoT sensors
- [ ] Automated task assignment

### 🌟 Future Vision (v2.0)
- [ ] AI-powered issue detection from images
- [ ] Chatbot for instant support
- [ ] Gamification with leaderboards
- [ ] Carbon footprint calculator
- [ ] Integration with campus management systems
- [ ] Multi-campus support
- [ ] Offline mode with sync

---

<div align="center">

### 🌱 Together, We Can Make Our Campuses Cleaner and Greener! 🌱

**Star ⭐ this repo if you find it useful!**

[![GitHub stars](https://img.shields.io/github/stars/GaganCN10/clean-campus?style=social)](https://github.com/GaganCN10/clean-campus/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/GaganCN10/clean-campus?style=social)](https://github.com/GaganCN10/clean-campus/network/members)

---

*Built with 💚 for sustainable campuses*

**Clean Campus • EcoLocate • Making a Difference, One Report at a Time**

</div>
