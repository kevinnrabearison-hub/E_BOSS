import axios from 'axios';

// Configuration de l'API pour le dashboard admin
const ADMIN_API_URL = 'http://localhost:5000/api';

const adminAPI = {
  // Envoyer les données d'analyse au dashboard admin
  sendAnalysisData: async (postData, analysisData) => {
    try {
      const payload = {
        post_id: postData.id,
        post_content: postData.content,
        post_author: postData.author,
        analysis: analysisData,
        timestamp: new Date().toISOString(),
        type: 'post_analysis'
      };

      const response = await axios.post(`${ADMIN_API_URL}/admin/analysis`, payload);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données d\'analyse au dashboard admin:', error);
      throw error;
    }
  },

  // Obtenir les statistiques d'analyse pour le dashboard admin
  getAnalysisStats: async () => {
    try {
      const response = await axios.get(`${ADMIN_API_URL}/admin/analysis/stats`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques d\'analyse:', error);
      throw error;
    }
  },

  // Signaler un post pour revue admin
  reportPost: async (postData, reason, analysisData = null) => {
    try {
      const payload = {
        post_id: postData.id,
        post_content: postData.content,
        post_author: postData.author,
        reason: reason,
        analysis_data: analysisData,
        timestamp: new Date().toISOString(),
        type: 'post_report'
      };

      const response = await axios.post(`${ADMIN_API_URL}/admin/reports`, payload);
      return response.data;
    } catch (error) {
      console.error('Erreur lors du signalement du post:', error);
      throw error;
    }
  },

  // Obtenir les posts signalés
  getReportedPosts: async () => {
    try {
      const response = await axios.get(`${ADMIN_API_URL}/admin/reports`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des posts signalés:', error);
      throw error;
    }
  }
};

export default adminAPI;
