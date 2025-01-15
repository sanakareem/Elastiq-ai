import cohere
import os
from dotenv import load_dotenv

load_dotenv()

class SentimentAnalyzer:
    def __init__(self):
        self.co = cohere.Client(os.getenv("COHERE_API_KEY"))
        self.examples = [
            {"text": "This movie was absolutely amazing!", "label": "Positive"},
            {"text": "The plot was confusing and the acting was terrible.", "label": "Negative"},
            {"text": "It was okay, nothing special.", "label": "Neutral"},
            {"text": "Brilliant performance by the entire cast!", "label": "Positive"},
            {"text": "I wouldn't recommend this movie to anyone.", "label": "Negative"},
            {"text": "It had its moments, but overall just average.", "label": "Neutral"}
        ]

    async def analyze_sentiment(self, text: str) -> tuple[str, float]:
        try:
            # Convert examples to the format expected by Cohere
            formatted_examples = [
                {"text": ex["text"], "label": ex["label"]} 
                for ex in self.examples
            ]
            
            response = self.co.classify(
                model='large',
                inputs=[text],
                examples=formatted_examples
            )
            
            prediction = response.classifications[0]
            return prediction.prediction, float(prediction.confidence)
            
        except Exception as e:
            print(f"Error in sentiment analysis: {str(e)}")
            # Return a default response in case of error
            return "Neutral", 0.0