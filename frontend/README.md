# app Frontend Application

## Overview
The "app" project is a web application that consists of a frontend built with React.js and a backend powered by Node.js and Express. This application features a simple prediction game, wallet management, and Google Single Sign-On (SSO) authentication.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)
- MongoDB (for database)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd app/frontend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

### Running the Application
To start the frontend application, run:
```
npm start
```
This will start the development server and open the application in your default web browser.

### Folder Structure
- **public/**: Contains static assets such as images and icons.
- **src/**: Contains the source code for the React application.
  - **components/**: Reusable components like Navbar and Game.
  - **pages/**: Different pages of the application including Home, Dashboard, and Login.
  - **App.js**: Main application component that sets up routing.
  - **index.js**: Entry point for the React application.
  - **api.js**: Functions for making API calls to the backend.

### Features
- **Home Page**: A welcome screen with a "Login with Google" button.
- **Dashboard**: Displays the user's wallet information after logging in.
- **Prediction Game**: A simple heads/tails prediction game.

### API Integration
The frontend communicates with the backend via RESTful API endpoints for authentication, wallet operations, and game participation.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.