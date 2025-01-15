from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.review import Review
from app.schemas.review import ReviewCreate, ReviewResponse
from app.services.sentiment import SentimentAnalyzer
from typing import List

router = APIRouter()
sentiment_analyzer = SentimentAnalyzer()

@router.post("/reviews/", response_model=ReviewResponse)
async def create_review(review: ReviewCreate, db: Session = Depends(get_db)):
    sentiment, confidence = await sentiment_analyzer.analyze_sentiment(review.text)
    
    db_review = Review(
        text=review.text,
        sentiment=sentiment,
        confidence=confidence
    )
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

@router.get("/reviews/", response_model=List[ReviewResponse])
def get_reviews(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    reviews = db.query(Review).offset(skip).limit(limit).all()
    return reviews