# Elastiq.AI Movie Review Sentiment Analysis

A full-stack Python web application that analyzes movie reviews using Cohere's AI for sentiment analysis. The application features a React frontend and FastAPI backend.

## Implementation Approach

### Architecture
- **Frontend**: React.js with modern UI components
- **Backend**: FastAPI (Python) with SQLite database
- **AI Integration**: Cohere API for sentiment analysis
- **Deployment**: Docker containerization for easy deployment

### Key Features
1. Real-time sentiment analysis of movie reviews
2. Sentiment classification (Positive/Negative/Neutral)
3. Confidence score for each analysis
4. SQLite database for storing reviews and results
5. Clean, responsive UI

## Setup Instructions

### Prerequisites
- Python 3.9+
- Node.js 18+
- Docker and Docker Compose (for containerized deployment)
- Cohere API Key

### Local Development Setup

1. **Clone the Repository**

git clone https://github.com/your-username/elastiq-take-home-assessment.git
cd elastiq-take-home-assessment

Backend Setup

cd movie-sentiment-app/backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate 
 # On Windows: 
 venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with your Cohere API key
echo "COHERE_API_KEY=your_api_key_here" > .env

# Start the backend server
uvicorn app.main:app --reload

Frontend Setup

bashCopycd movie-sentiment-app/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
Running with Docker
bashCopy# Build and start containers
docker-compose up --build
Application Access

Frontend: http://localhost:5173 (development) or http://localhost:3000 (production)
Backend API: http://localhost:8000
API Documentation: http://localhost:8000/docs

Testing

Access the frontend application
Enter a movie review in the text area
Click "Analyze Sentiment"
View the sentiment analysis results

Additional Information
API Endpoints

POST /reviews/: Submit a review for sentiment analysis
GET /reviews/: Retrieve all analyzed reviews

Environment Variables

COHERE_API_KEY: Your Cohere API key for sentiment analysis
DATABASE_URL: SQLite database URL (defaults to local SQLite file)

Database

SQLite database file location: backend/movie_reviews.db
Automatically created on first run

Deployment
The application is containerized and can be deployed to any cloud provider. Included Docker configuration supports deployment to:

GCP Compute Engine
AWS EC2
Azure VMs

Future Improvements

Add user authentication
Implement review history with sorting and filtering
Add batch processing capability
Enhance error handling and user feedback
Add rate limiting and API security

Tech Stack Details

Frontend: React, TailwindCSS, Axios
Backend: FastAPI, SQLAlchemy, Pydantic
Database: SQLite
AI: Cohere API
Containerization: Docker, Docker Compose

