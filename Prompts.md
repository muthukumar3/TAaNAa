Create a new project called "app" with the following setup:

1. This project contains two separate applications:
   - **frontend**: React.js app (mobile responsive, works on mobile browsers)
   - **backend**: Node.js with Express

2. **Frontend requirements**:
   - Built with React.js + modern hooks
   - Mobile responsive layout using CSS grid/flexbox or a UI library like Material UI
   - Home page: welcome screen, "Login with Google" button (no registration, Google SSO only)
   - Basic wallet dashboard page after login
   - Page for simple prediction game (heads/tails)
   - Connect frontend to backend via REST API

3. **Backend requirements**:
   - Node.js with Express
   - MongoDB for data storage
   - Implement Google SSO authentication (no email/password registration)
   - Basic role-based authorization support
   - Endpoints for:
     - Wallet deposit (crypto deposits are logged only, no actual payment gateway for now)
     - Prediction game participation
     - Wallet balance fetch/update
     - Withdraw request logging (manual processing for now)
   - Basic high-level configuration:
     - Environment variables for DB, ports, Google OAuth keys
     - CORS setup for frontend
     - Error handling middleware
   - Use Mongoose for MongoDB models

4. **Game logic** (basic placeholder for now):
   - Users can predict heads or tails
   - Winning users get funds transferred from losing users proportionally
   - App takes a small commission from total pool
   - This logic will be basic for now and refined later

5. General:
   - Structure the project with `frontend/` and `backend/` folders
   - Use `.env` for configuration
   - Include README in root explaining how to run both apps


app/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── middlewares/
│   │   │   └── authMiddleware.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Wallet.js
│   │   │   └── Prediction.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── walletRoutes.js
│   │   │   └── gameRoutes.js
│   │   ├── utils/
│   │   │   └── calculateWinners.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── Game.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Dashboard.js
│   │   │   └── Login.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── api.js
│   ├── package.json
│   └── README.md
│
└── README.md


backend/package.json
json
Copy
Edit
{
  "name": "app-backend",
  "version": "1.0.0",
  "main": "src/server.js",
  "type": "module",
  "scripts": {
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "mongoose": "^7.6.0",
    "passport": "^0.7.0",
    "passport-google-oauth20": "^2.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}

