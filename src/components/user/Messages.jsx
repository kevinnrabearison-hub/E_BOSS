import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/theme-context';
import DashboardNavbar from './dashboard-navbar';
import Sidebar from './sidebar';
import Footer from '../footer';

const Messages = () => {
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const messages = [
    {
      id: 1,
      sender: 'Marie Dubois',
      avatar: 'MD',
      subject: 'Question sur le Sprint 2',
      preview: 'Bonjour, j\'ai une question concernant la deuxième tâche du sprint...',
      time: '10:30',
      unread: true,
      fullMessage: 'Bonjour, j\'ai une question concernant la deuxième tâche du sprint. Je ne suis pas sûr de comprendre comment implémenter la fonctionnalité de validation. Pourriez-vous me donner quelques indices ?\n\nJ\'ai essayé plusieurs approches mais je bloque sur la partie où il faut vérifier les données côté client avant l\'envoi.\n\nMerci d\'avance pour votre aide !',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 2,
      sender: 'System',
      avatar: 'SY',
      subject: 'Rappel de cours',
      preview: 'N\'oubliez pas votre cours de React Hooks prévu demain...',
      time: '09:15',
      unread: true,
      fullMessage: 'N\'oubliez pas votre cours de React Hooks prévu demain à 14h00. Nous aborderons les sujets suivants :\n\n• useState et useEffect avancés\n• Custom hooks\n• Performance optimization\n• Context API\n\nLe lien Zoom sera envoyé 30 minutes avant le début.\n\nÀ demain !',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      sender: 'Thomas Martin',
      avatar: 'TM',
      subject: 'Projet collaboratif',
      preview: 'Veux-tu rejoindre notre groupe pour le projet final...',
      time: 'Hier',
      unread: false,
      fullMessage: 'Salut !\n\nJe te contacte pour te proposer de rejoindre notre groupe pour le projet final. On est actuellement 3 personnes et on cherche une 4ème personne pour compléter l\'équipe.\n\nNotre projet consiste à créer une application de gestion de tâches avec :\n- Interface React\n- Backend Node.js\n- Base de données MongoDB\n- Authentification JWT\n\nSi ça t\'intéresse, fais-le moi savoir et on peut discuter des détails.\n\nThomas',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 4,
      sender: 'Sophie Laurent',
      avatar: 'SL',
      subject: 'Feedback sur ton projet',
      preview: 'J\'ai regardé ton dernier projet, c\'est vraiment impressionnant...',
      time: '2 jours',
      unread: false,
      fullMessage: 'Salut !\n\nJ\'ai pris le temps de regarder ton dernier projet sur GitHub, et je dois dire que c\'est vraiment impressionnant !\n\nJ\'ai particulièrement aimé :\n- La structure du code est très propre\n- L\'interface utilisateur est intuitive\n- Les animations sont fluides\n- La documentation est complète\n\nPetite suggestion : tu pourrais ajouter des tests unitaires pour améliorer la qualité du code.\n\nContinue comme ça, tu es sur la bonne voie !\n\nSophie',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 5,
      sender: 'Alex Chen',
      avatar: 'AC',
      subject: 'Session de codage',
      preview: 'Tu es dispo pour une session de pair programming demain...',
      time: '3 jours',
      unread: false,
      fullMessage: 'Hey !\n\nJe me demandais si tu serais dispo pour une session de pair programming demain après-midi ?\n\nJ\'aimerais qu\'on travaille ensemble sur l\'algorithme de tri que j\'essaie d\'implémenter. J\'ai quelques idées mais je bloque sur l\'optimisation.\n\nDis-moi si ça t\'intéresse et à quelle heure tu serais libre.\n\nAlex',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const filteredMessages = messages.filter(msg =>
    msg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <DashboardNavbar onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'md:ml-72' : 'md:ml-0'}`}>
        <div className={`h-[calc(100vh-4rem)] ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className={`h-full flex ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Liste des messages */}
      <div className={`w-96 border-r ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        {/* Header */}
        <div className={`p-4 pt-6 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Messages
          </h2>
          
          {/* Barre de recherche */}
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher des messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-xl border transition-all ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              }`}
            />
            <svg 
              className={`absolute left-3 top-2.5 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Liste */}
        <div className="overflow-y-auto h-[calc(100vh-12rem)]">
          {filteredMessages.map((message) => (
            <motion.div
              key={message.id}
              onClick={() => setSelectedMessage(message)}
              className={`p-4 border-b cursor-pointer transition-all ${
                theme === 'dark' ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-100'
              } ${selectedMessage?.id === message.id ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100') : ''}
              ${message.unread ? (theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50') : ''}
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${message.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {message.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {message.sender}
                    </h3>
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {message.time}
                    </span>
                  </div>
                  <h4 className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                    {message.subject}
                  </h4>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} truncate`}>
                    {message.preview}
                  </p>
                </div>
                {message.unread && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contenu du message */}
      <div className="flex-1 flex flex-col">
        {selectedMessage ? (
          <>
            {/* Header du message */}
            <div className={`p-4 pt-6 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${selectedMessage.color} flex items-center justify-center text-white font-bold`}>
                  {selectedMessage.avatar}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {selectedMessage.sender}
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {selectedMessage.time}
                  </p>
                </div>
                <button className={`p-2 rounded-lg transition-all ${
                  theme === 'dark' 
                    ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
              <h2 className={`text-lg font-semibold mt-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {selectedMessage.subject}
              </h2>
            </div>

            {/* Corps du message */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className={`whitespace-pre-wrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {selectedMessage.fullMessage}
              </div>
            </div>

            {/* Zone de réponse */}
            <div className={`p-3 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-end gap-2">
                <button className={`p-2 rounded-lg transition-all ${
                  theme === 'dark' 
                    ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <textarea
                  placeholder="Tapez un message..."
                  className={`flex-1 p-2 rounded-lg border resize-none h-10 max-h-32 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <button className={`p-2 rounded-lg transition-all ${
                  theme === 'dark' 
                    ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-medium text-sm">
                  Envoyer
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
              }`}>
                <svg className={`w-10 h-10 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Sélectionnez un message
              </h3>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Choisissez un message dans la liste pour voir son contenu
              </p>
            </div>
          </div>
        )}
      </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Messages;
