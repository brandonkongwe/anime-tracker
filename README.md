# Anime Tracker

A (bare minimum) full-stack web application for tracking your anime watching progress. Built with Vue.js frontend and Express.js backend.

## Features

- User authentication (register/login)
- Search anime using the Jikan API (only returns 3 per second due to rate limiting)
- Add anime to your personal list
- Track watching status, episodes watched, and rating
- Edit and delete entries
- User profile management

## Tech Stack

### Frontend
- Vue 3
- Vue Router
- Pinia for state management
- Tailwind CSS for styling
- Axios for API calls
- Font Awesome icons

### Backend
- Express.js
- MySQL database
- bcrypt for password hashing
- Express Session for authentication
- CORS enabled

## Setup

### Prerequisites
- Node.js
- MySQL
- npm or yarn

### Database Setup
1. Create a MySQL database
2. Run the SQL commands in `db.sql` to create the required tables

### Backend Setup
1. Navigate to the backend directory:
   
    ```sh
    cd backend
    ```

3. Install dependencies:
   
    ```bash
    npm install
    ```

4. Configure environment variables in .env:

    ```bash
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=your_username
    DB_PASSWORD=your_password
    DB_NAME=anime
    SESSION_SECRET=your_session_secret
    PORT=5000
    ```

5. Start the server:

   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```
   
2. Install dependencies:

   ```bash
   npm install
   ```
   
3. Start the development server:

   ```bash
   npm run dev
   ```
   
4. Build for production:

   ```bash
   npm run build
   ```
   
### API Endpoints
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /anime-list` - Get user's anime list
- `POST /add-anime` - Add anime to list
- `PUT /anime-list/:id` - Update anime entry
- `DELETE /anime-list/:id` - Delete anime entry
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `DELETE /profile` - Delete user profile
