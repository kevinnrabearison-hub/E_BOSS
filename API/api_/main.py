from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Dict, Optional
import uvicorn
import asyncio
import json
from datetime import datetime
import re
import random
import os
import uuid

# Import des modules IA
from chatbot import ChatbotAI
from fake_news_detector import FakeNewsDetector
from message_analyzer import MessageAnalyzer
from dashboard_automation import DashboardAutomation

app = FastAPI(title="Educational Platform AI API", version="1.0.0")

# Configuration pour les fichiers statiques
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialisation des services IA
chatbot = ChatbotAI()
fake_news_detector = FakeNewsDetector()
message_analyzer = MessageAnalyzer()
dashboard_automation = DashboardAutomation()

# Modèles de données
class TutorRequest(BaseModel):
    question: str
    answer: str
    context: Optional[str] = None

class ChatRequest(BaseModel):
    message: str
    user_id: Optional[str] = None
    context: Optional[str] = None

class FakeNewsRequest(BaseModel):
    content: str
    source: Optional[str] = None
    metadata: Optional[Dict] = None

class MessageAnalysisRequest(BaseModel):
    message: str
    sender_id: Optional[str] = None
    context: Optional[str] = None
    priority: Optional[str] = "normal"

class DashboardAutomationRequest(BaseModel):
    action: str
    parameters: Optional[Dict] = None
    user_context: Optional[Dict] = None

# Routes Chatbot
@app.post("/api/chatbot/chat")
async def chatbot_chat(request: ChatRequest):
    """Chatbot éducatif"""
    try:
        response = await chatbot.generate_response(
            message=request.message,
            user_id=request.user_id,
            context=request.context
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/chatbot/tutor")
async def tutor_ai(request: TutorRequest):
    """Tutor IA pour vérification des réponses"""
    try:
        result = await chatbot.check_answer(
            question=request.question,
            answer=request.answer,
            context=request.context
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/chatbot/suggestions/{topic}")
async def get_suggestions(topic: str):
    """Suggestions de sujets et ressources"""
    try:
        suggestions = await chatbot.get_suggestions(topic)
        return suggestions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Routes Fake News Detection
@app.post("/api/fake-news/detect")
async def detect_fake_news(request: FakeNewsRequest):
    """Détection de fake news"""
    try:
        result = await fake_news_detector.analyze_content(
            content=request.content,
            source=request.source,
            metadata=request.metadata
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/fake-news/batch-analyze")
async def batch_analyze_news(requests: List[FakeNewsRequest]):
    """Analyse batch de contenu"""
    try:
        results = []
        for req in requests:
            result = await fake_news_detector.analyze_content(
                content=req.content,
                source=req.source,
                metadata=req.metadata
            )
            results.append(result)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/fake-news/stats")
async def get_fake_news_stats():
    """Statistiques de détection"""
    try:
        stats = await fake_news_detector.get_statistics()
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Routes Message Analysis
@app.post("/api/messages/analyze")
async def analyze_message(request: MessageAnalysisRequest):
    """Analyse de message éphémère"""
    try:
        result = await message_analyzer.analyze_message(
            message=request.message,
            sender_id=request.sender_id,
            context=request.context,
            priority=request.priority
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/messages/priority-queue")
async def get_priority_queue():
    """File d'attente des messages prioritaires"""
    try:
        queue = await message_analyzer.get_priority_queue()
        return queue
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/messages/mark-processed/{message_id}")
async def mark_message_processed(message_id: str):
    """Marquer un message comme traité"""
    try:
        result = await message_analyzer.mark_processed(message_id)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Routes Dashboard Automation
@app.post("/api/dashboard/automate")
async def automate_dashboard(request: DashboardAutomationRequest):
    """Automatisation du dashboard"""
    try:
        result = await dashboard_automation.execute_action(
            action=request.action,
            parameters=request.parameters,
            user_context=request.user_context
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/dashboard/insights")
async def get_dashboard_insights():
    """Insights et recommandations automatiques"""
    try:
        insights = await dashboard_automation.generate_insights()
        return insights
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/dashboard/analytics")
async def get_analytics():
    """Analytics automatisés"""
    try:
        analytics = await dashboard_automation.get_analytics()
        return analytics
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Routes de santé et monitoring
@app.get("/api/health")
async def health_check():
    """Vérification de santé des services IA"""
    try:
        services = {
            "chatbot": await chatbot.health_check(),
            "fake_news_detector": await fake_news_detector.health_check(),
            "message_analyzer": await message_analyzer.health_check(),
            "dashboard_automation": await dashboard_automation.health_check()
        }
        return {
            "status": "healthy",
            "timestamp": datetime.now().isoformat(),
            "services": services
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/metrics")
async def get_metrics():
    """Métriques d'utilisation"""
    try:
        metrics = {
            "chatbot": await chatbot.get_metrics(),
            "fake_news_detector": await fake_news_detector.get_metrics(),
            "message_analyzer": await message_analyzer.get_metrics(),
            "dashboard_automation": await dashboard_automation.get_metrics()
        }
        return metrics
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Modèle pour le téléchargement de fichiers
class UploadResponse(BaseModel):
    message: str
    files: List[dict]

@app.post("/api/upload", response_model=UploadResponse)
async def upload_files(files: List[UploadFile] = File(...)):
    """
    Télécharge un ou plusieurs fichiers.
    
    - **files**: Liste de fichiers à télécharger (max 5 fichiers, 5MB par fichier)
    """
    try:
        saved_files = []
        
        for file in files:
            # Vérifier le type de fichier
            file_ext = file.filename.split('.')[-1].lower()
            if file_ext not in {"png", "jpg", "jpeg", "gif"}:
                raise HTTPException(
                    status_code=400,
                    detail=f"Type de fichier non autorisé pour {file.filename}. Types autorisés: png, jpg, jpeg, gif"
                )
                
            # Lire le contenu pour vérifier la taille
            contents = await file.read()
            if len(contents) > 5 * 1024 * 1024:  # 5MB
                raise HTTPException(
                    status_code=400,
                    detail=f"Le fichier {file.filename} dépasse la taille maximale autorisée de 5MB"
                )
                
            # Générer un nom de fichier unique
            filename = f"{uuid.uuid4()}.{file_ext}"
            file_path = os.path.join(UPLOAD_DIR, filename)
            
            # Sauvegarder le fichier
            with open(file_path, "wb") as buffer:
                buffer.write(contents)
                
            saved_files.append({
                "filename": filename,
                "original_name": file.filename,
                "content_type": file.content_type,
                "size": len(contents),
                "url": f"/{UPLOAD_DIR}/{filename}"
            })
            
        return {
            "message": "Fichiers téléchargés avec succès",
            "files": saved_files
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors du téléchargement des fichiers: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
