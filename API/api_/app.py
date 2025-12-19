from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uvicorn
from datetime import datetime
import json

app = FastAPI()

# Stockage en mémoire (à remplacer par une base de données réelle)
analysis_data_store = []
reports_store = []

class TutorRequest(BaseModel):
    question: str
    answer: str

class AnalysisData(BaseModel):
    post_id: int
    post_content: str
    post_author: str
    analysis: Dict[str, Any]
    timestamp: str
    type: str

class ReportData(BaseModel):
    post_id: int
    post_content: str
    post_author: str
    reason: str
    analysis_data: Optional[Dict[str, Any]] = None
    timestamp: str
    type: str

@app.post("/tutor")
def tutor(data: TutorRequest):
    return {
        "status": "incorrect",
        "hint": "essaie de factoriser",
        "next_step": "isoler le terme commun"
    }

# Endpoints pour l'analyse et les signalements admin
@app.post("/api/admin/analysis")
async def receive_analysis_data(data: AnalysisData):
    """Reçoit les données d'analyse du frontend"""
    try:
        analysis_data_store.append(data.dict())
        return {
            "status": "success",
            "message": "Données d'analyse reçues avec succès",
            "total_analyses": len(analysis_data_store)
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Erreur lors de la réception des données: {str(e)}"
        }

@app.get("/api/admin/analysis/stats")
async def get_analysis_stats():
    """Retourne les statistiques d'analyse pour le dashboard admin"""
    try:
        if not analysis_data_store:
            return {
                "total_analyses": 0,
                "sentiment_distribution": {},
                "fake_news_count": 0,
                "recent_analyses": []
            }
        
        # Calculer les statistiques
        sentiment_counts = {"positive": 0, "negative": 0, "neutral": 0}
        fake_news_count = 0
        
        for analysis in analysis_data_store:
            # Compter les sentiments
            if "sentiment" in analysis.get("analysis", {}):
                sentiment = analysis["analysis"]["sentiment"].get("analysis", {}).get("sentiment", {}).get("sentiment", "neutral")
                if sentiment in sentiment_counts:
                    sentiment_counts[sentiment] += 1
            
            # Compter les fake news
            if "fake_news" in analysis.get("analysis", {}):
                status = analysis["analysis"]["fake_news"].get("status", "")
                if status in ["fake", "suspicious"]:
                    fake_news_count += 1
        
        # Obtenir les analyses récentes
        recent_analyses = sorted(
            analysis_data_store, 
            key=lambda x: x.get("timestamp", ""), 
            reverse=True
        )[:5]
        
        return {
            "total_analyses": len(analysis_data_store),
            "sentiment_distribution": sentiment_counts,
            "fake_news_count": fake_news_count,
            "recent_analyses": recent_analyses
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Erreur lors de la récupération des statistiques: {str(e)}"
        }

@app.post("/api/admin/reports")
async def receive_report(data: ReportData):
    """Reçoit un signalement de post"""
    try:
        reports_store.append(data.dict())
        return {
            "status": "success",
            "message": "Signalement reçu avec succès",
            "total_reports": len(reports_store)
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Erreur lors de la réception du signalement: {str(e)}"
        }

@app.get("/api/admin/reports")
async def get_reports():
    """Retourne la liste des posts signalés"""
    try:
        return {
            "status": "success",
            "reports": sorted(reports_store, key=lambda x: x.get("timestamp", ""), reverse=True),
            "total_reports": len(reports_store)
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Erreur lors de la récupération des signalements: {str(e)}"
        }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)