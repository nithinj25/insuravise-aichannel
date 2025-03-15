
# Insurance Finder Application

This is a full-stack application for finding and comparing insurance plans. The application consists of a React frontend and a Node.js/Express backend.

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example` and add your OpenAI API key.

4. Start the server:
   ```
   npm start
   ```

The server will run on port 5000 by default.

### Frontend Setup

1. Install dependencies in the root directory:
   ```
   npm install
   ```

2. Create a `.env` file based on `.env.example`.

3. Start the development server:
   ```
   npm run dev
   ```

The frontend will run on port 5173 by default.

## Available Endpoints

### Insurance Plans
- GET `/api/insurance-plans` - Get all insurance plans
- GET `/api/insurance-plans/:type` - Get insurance plans by type
- GET `/api/insurance-plans/details/:id` - Get insurance plan details

### Recommendations
- POST `/api/recommendations/personalized` - Get personalized recommendations

### Policy Analysis
- POST `/api/policy/analyze` - Analyze policy PDF
- POST `/api/policy/summarize` - Summarize policy from URL

### Chat
- POST `/api/chat/response` - Get AI chat response

## Technologies Used

- Frontend: React, TypeScript, Tailwind CSS, shadcn/ui
- Backend: Node.js, Express
- APIs: OpenAI
