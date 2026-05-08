# app Backend

## Overview
The app project consists of a backend application built with Node.js and Express, designed to support a prediction game with wallet functionalities. This README provides instructions for setting up and running the backend application.

## Prerequisites
- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)
- Google OAuth credentials for authentication

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd app/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory and add the following environment variables:
   ```
   PORT=5000
   MONGODB_URI=<your_mongodb_connection_string>
   GOOGLE_CLIENT_ID=<your_google_client_id>
   GOOGLE_CLIENT_SECRET=<your_google_client_secret>
   ```

## Running the Application

To start the backend server in development mode, run:
```
npm run dev
```

The server will start on the specified port (default is 5000).

## API Endpoints

### Authentication
- `POST /auth/google` - Authenticate user with Google SSO.

### Wallet Operations
- `POST /wallet/deposit` - Log a crypto deposit.
- `GET /wallet/balance` - Fetch the user's wallet balance.

### Prediction Game
- `POST /game/play` - Participate in the prediction game.
- `GET /game/results` - Fetch results of the prediction game.

## Folder Structure
- `src/` - Contains the source code for the backend application.
  - `config/` - Database connection logic.
  - `middlewares/` - Authentication middleware.
  - `models/` - Mongoose models for User, Wallet, and Prediction.
  - `routes/` - API routes for authentication, wallet, and game functionalities.
  - `utils/` - Utility functions for game logic.
  - `app.js` - Initializes the Express application.
  - `server.js` - Entry point for the backend server.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.