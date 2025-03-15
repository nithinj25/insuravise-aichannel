
# InsuraAI Backend Server

This is the backend server for the InsuraAI application, providing APIs for insurance recommendations, policy analysis, and AI chat features.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Navigate to the server directory
```bash
cd server
```

3. Install dependencies
```bash
npm install
# or
yarn install
```

4. Create an environment file
```bash
cp .env.example .env
```

5. Update the `.env` file with your actual API keys and configuration

### Running the Server

```bash
npm start
# or
yarn start
```

The server will start on port 5000 by default (or the port specified in your .env file).

## API Endpoints

### Chat Service
- `POST /api/chat/response` - Get AI chat response

### Policy Analysis
- `POST /api/policy/analyze` - Analyze insurance policy PDF
- `POST /api/policy/summarize` - Summarize policy from URL

### Insurance Plans
- `GET /api/insurance-plans` - Get all insurance plans with optional filters
- `GET /api/insurance-plans/:type` - Get insurance plans by type
- `GET /api/insurance-plans/details/:id` - Get insurance plan details

### Recommendations
- `POST /api/recommendations/personalized` - Get personalized insurance recommendations

## Environment Variables

- `PORT` - Server port (default: 5000)
- `OPENAI_API_KEY` - Your OpenAI API key (required for AI chat)
- `ALLOWED_ORIGINS` - Comma-separated list of allowed CORS origins

## Development

For local development, make sure both the frontend and backend are running simultaneously. The frontend should be configured to make API calls to `http://localhost:5000` or the port you've configured.
