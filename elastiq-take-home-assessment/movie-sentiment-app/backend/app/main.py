from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import endpoints
from app.db.database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Movie Review Sentiment Analysis")

# Configure CORS with specific origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # React dev server
        "http://localhost:3000",  # Production build
        "http://172.18.0.3:5173",  # Docker network
        "https://frontend-service-utm5.onrender.com",  # Render frontend URL
        "https://elastiq-ai-frontend.onrender.com"     # Alternative Render frontend URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Include routers
app.include_router(endpoints.router)

@app.get("/")
async def root():
    return {"message": "Movie Review Sentiment Analysis API"}