"""
Machine Learning service for visa and scholarship matching

Uses TF-IDF vectorization and cosine similarity to match user profiles
with visa/scholarship requirements.
"""
import os
import pickle
import numpy as np
from typing import List, Dict, Any, Tuple
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.linear_model import LogisticRegression
import spacy

from utils import logger, cache

# Load spacy model for NLP
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    logger.warning("Spacy model not found. Run: python -m spacy download en_core_web_sm")
    nlp = None

# ============================================================================
# Text Processing
# ============================================================================

def preprocess_text(text: str) -> str:
    """
    Preprocess text for TF-IDF vectorization
    
    Args:
        text: Input text string
        
    Returns:
        Preprocessed text string
    """
    if not text:
        return ""
    
    # Convert to lowercase
    text = text.lower()
    
    # Use spacy for lemmatization if available
    if nlp:
        doc = nlp(text)
        tokens = [token.lemma_ for token in doc if not token.is_stop and not token.is_punct]
        return " ".join(tokens)
    
    # Simple preprocessing if spacy not available
    return text

def extract_profile_features(profile: Dict[str, Any]) -> str:
    """
    Extract text features from user profile
    
    Args:
        profile: User profile dictionary
        
    Returns:
        Combined text representation of profile
    """
    features = []
    
    # Education
    if profile.get("education_level"):
        features.append(profile["education_level"])
    
    if profile.get("field_of_study"):
        features.append(profile["field_of_study"])
    
    # Skills
    if profile.get("skills"):
        features.extend(profile["skills"])
    
    # Languages
    if profile.get("languages"):
        features.extend(profile["languages"])
    
    # Goals
    if profile.get("goals"):
        features.append(profile["goals"])
    
    # Work experience (convert to text)
    if profile.get("work_experience_years"):
        years = profile["work_experience_years"]
        if years == 0:
            features.append("entry level no experience")
        elif years <= 2:
            features.append("junior entry level")
        elif years <= 5:
            features.append("mid level experienced")
        else:
            features.append("senior experienced professional")
    
    return " ".join(features)

def extract_opportunity_features(opportunity: Dict[str, Any]) -> str:
    """
    Extract text features from opportunity
    
    Args:
        opportunity: Opportunity dictionary
        
    Returns:
        Combined text representation of opportunity
    """
    features = []
    
    # Name and country
    if opportunity.get("name"):
        features.append(opportunity["name"])
    
    if opportunity.get("country"):
        features.append(opportunity["country"])
    
    # Requirements
    requirements = opportunity.get("requirements", {})
    if isinstance(requirements, dict):
        for key, value in requirements.items():
            if isinstance(value, str):
                features.append(value)
            elif isinstance(value, list):
                features.extend([str(v) for v in value])
    
    # Details
    if opportunity.get("details"):
        features.append(opportunity["details"])
    
    return " ".join(features)

# ============================================================================
# Matching Algorithm
# ============================================================================

class MatchingService:
    """Service for matching users with opportunities using ML"""
    
    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            max_features=500,
            stop_words='english',
            ngram_range=(1, 2),
            min_df=1,
            max_df=0.9
        )
        self.model_loaded = False
        self.approval_model = None
        self._load_approval_model()
    
    def _load_approval_model(self):
        """Load pre-trained approval prediction model"""
        model_path = os.path.join(os.path.dirname(__file__), "..", "data", "visa_model.pkl")
        
        if os.path.exists(model_path):
            try:
                with open(model_path, 'rb') as f:
                    self.approval_model = pickle.load(f)
                self.model_loaded = True
                logger.info("Loaded visa approval prediction model")
            except Exception as e:
                logger.error(f"Failed to load approval model: {str(e)}")
        else:
            logger.warning(f"Approval model not found at {model_path}")
    
    def calculate_matches(
        self,
        user_profile: Dict[str, Any],
        opportunities: List[Dict[str, Any]],
        threshold: float = 0.3
    ) -> List[Tuple[Dict[str, Any], float]]:
        """
        Calculate match scores between user profile and opportunities
        
        Args:
            user_profile: User profile dictionary
            opportunities: List of opportunity dictionaries
            threshold: Minimum similarity score to include (0-1)
            
        Returns:
            List of (opportunity, match_score) tuples, sorted by score
        """
        cache_key = f"matches_{hash(str(user_profile))}"
        cached_result = cache.get(cache_key)
        if cached_result:
            logger.info("Returning cached matches")
            return cached_result
        
        # Extract features
        user_text = preprocess_text(extract_profile_features(user_profile))
        
        if not user_text:
            logger.warning("Empty user profile features")
            return []
        
        opp_texts = [
            preprocess_text(extract_opportunity_features(opp))
            for opp in opportunities
        ]
        
        # Create TF-IDF vectors
        all_texts = [user_text] + opp_texts
        
        try:
            tfidf_matrix = self.vectorizer.fit_transform(all_texts)
        except Exception as e:
            logger.error(f"TF-IDF vectorization failed: {str(e)}")
            return []
        
        # Calculate cosine similarity
        user_vector = tfidf_matrix[0:1]
        opp_vectors = tfidf_matrix[1:]
        
        similarities = cosine_similarity(user_vector, opp_vectors)[0]
        
        # Filter and sort results
        matches = []
        for i, score in enumerate(similarities):
            if score >= threshold:
                opp_copy = opportunities[i].copy()
                matches.append((opp_copy, float(score)))
        
        matches.sort(key=lambda x: x[1], reverse=True)
        
        # Cache results for 1 hour
        cache.set(cache_key, matches, ttl=3600)
        
        logger.info(f"Found {len(matches)} matches above threshold {threshold}")
        return matches
    
    def predict_approval_probability(
        self,
        user_profile: Dict[str, Any],
        opportunity: Dict[str, Any]
    ) -> float:
        """
        Predict probability of approval for visa/scholarship
        
        Args:
            user_profile: User profile dictionary
            opportunity: Opportunity dictionary
            
        Returns:
            Approval probability (0-1)
        """
        if not self.model_loaded or self.approval_model is None:
            # Fallback: use match score as proxy
            matches = self.calculate_matches(user_profile, [opportunity])
            if matches:
                return min(matches[0][1] * 1.2, 1.0)  # Boost match score slightly
            return 0.5
        
        try:
            # Extract features for prediction
            features = self._extract_prediction_features(user_profile, opportunity)
            
            # Predict probability
            prob = self.approval_model.predict_proba([features])[0][1]
            return float(prob)
            
        except Exception as e:
            logger.error(f"Approval prediction failed: {str(e)}")
            # Fallback to match score
            matches = self.calculate_matches(user_profile, [opportunity])
            if matches:
                return matches[0][1]
            return 0.5
    
    def _extract_prediction_features(
        self,
        user_profile: Dict[str, Any],
        opportunity: Dict[str, Any]
    ) -> List[float]:
        """
        Extract numerical features for approval prediction model
        
        Args:
            user_profile: User profile dictionary
            opportunity: Opportunity dictionary
            
        Returns:
            List of numerical features
        """
        features = []
        
        # Age (normalized to 0-1, assuming range 18-60)
        age = user_profile.get("age", 25)
        features.append((age - 18) / 42)
        
        # Education level (ordinal encoding)
        edu_levels = {
            "High School": 0.2,
            "Associate": 0.4,
            "Bachelor": 0.6,
            "Master": 0.8,
            "PhD": 1.0
        }
        edu = user_profile.get("education_level", "Bachelor")
        features.append(edu_levels.get(edu, 0.6))
        
        # Work experience (normalized, assuming max 20 years)
        work_exp = user_profile.get("work_experience_years", 0)
        features.append(min(work_exp / 20, 1.0))
        
        # Number of skills (normalized, assuming max 20)
        num_skills = len(user_profile.get("skills", []))
        features.append(min(num_skills / 20, 1.0))
        
        # Language count (normalized, assuming max 5)
        num_languages = len(user_profile.get("languages", []))
        features.append(min(num_languages / 5, 1.0))
        
        # Budget vs cost ratio
        budget = user_profile.get("budget", 0)
        cost = opportunity.get("cost", 0)
        if cost > 0:
            features.append(min(budget / cost, 2.0) / 2.0)
        else:
            features.append(1.0)
        
        # Historical approval rate
        approval_rate = opportunity.get("approval_rate", 0.5)
        features.append(approval_rate)
        
        # Pad to expected number of features (adjust as needed)
        while len(features) < 10:
            features.append(0.0)
        
        return features[:10]  # Return exactly 10 features

# Global service instance
matching_service = MatchingService()

# ============================================================================
# Convenience Functions
# ============================================================================

def get_visa_matches(
    user_profile: Dict[str, Any],
    visa_opportunities: List[Dict[str, Any]],
    top_n: int = 10
) -> List[Dict[str, Any]]:
    """
    Get top visa matches for user
    
    Args:
        user_profile: User profile dictionary
        visa_opportunities: List of visa opportunities
        top_n: Number of top matches to return
        
    Returns:
        List of matched visas with scores
    """
    matches = matching_service.calculate_matches(user_profile, visa_opportunities)
    
    results = []
    for opp, score in matches[:top_n]:
        opp["match_score"] = score
        opp["approval_probability"] = matching_service.predict_approval_probability(
            user_profile, opp
        )
        results.append(opp)
    
    return results

def get_scholarship_matches(
    user_profile: Dict[str, Any],
    scholarship_opportunities: List[Dict[str, Any]],
    top_n: int = 10
) -> List[Dict[str, Any]]:
    """
    Get top scholarship matches for user
    
    Args:
        user_profile: User profile dictionary
        scholarship_opportunities: List of scholarship opportunities
        top_n: Number of top matches to return
        
    Returns:
        List of matched scholarships with scores
    """
    matches = matching_service.calculate_matches(user_profile, scholarship_opportunities)
    
    results = []
    for opp, score in matches[:top_n]:
        opp["match_score"] = score
        opp["approval_probability"] = matching_service.predict_approval_probability(
            user_profile, opp
        )
        results.append(opp)
    
    return results
