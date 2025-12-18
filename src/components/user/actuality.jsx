import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/theme-context';
import DashboardNavbar from './dashboard-navbar';
import Sidebar from './sidebar';
import Footer from '../footer';

const Actualite = () => {
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [newPost, setNewPost] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);
  
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Marie Dubois',
      avatar: 'MD',
      time: 'Il y a 2 heures',
      content: 'Super session de codage aujourd\'hui ! J\'ai enfin réussi à implémenter le système d\'authentification avec JWT.',
      likes: 12,
      comments: 3,
      liked: false,
      image: null
    },
    {
      id: 2,
      author: 'Thomas Martin',
      avatar: 'TM',
      time: 'Il y a 4 heures',
      content: 'Quelqu\'un connaît un bon tutoriel sur React Hooks ? Je bloque sur useEffect avec les API.',
      likes: 8,
      comments: 7,
      liked: true,
      image: null
    }
  ]);

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: 'Vous',
        avatar: 'VO',
        time: 'Maintenant',
        content: newPost,
        likes: 0,
        comments: 0,
        liked: false,
        image: null
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setShowCreatePost(false);
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  return (
    <>
      <DashboardNavbar onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'md:ml-72' : 'md:ml-0'}`}>
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-2xl mx-auto py-6 px-4">
            {/* Bouton créer une publication */}
            <div className={`mb-6 p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  VO
                </div>
                <button
                  onClick={() => setShowCreatePost(!showCreatePost)}
                  className={`flex-1 p-3 rounded-lg text-left ${
                    theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  Quoi de neuf ?
                </button>
              </div>
              
              <AnimatePresence>
                {showCreatePost && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="Partagez vos pensées..."
                      className={`w-full p-3 rounded-lg resize-none h-24 ${
                        theme === 'dark' 
                          ? 'bg-gray-700 text-white placeholder-gray-400' 
                          : 'bg-gray-50 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                    <div className="flex justify-end gap-2 mt-3">
                      <button
                        onClick={() => setShowCreatePost(false)}
                        className={`px-4 py-2 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handleCreatePost}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Publier
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Fil d'actualité */}
            <div className="space-y-6">
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                >
                  {/* Header de la publication */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">
                        {post.avatar}
                      </div>
                      <div>
                        <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {post.author}
                        </h3>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          {post.time}
                        </p>
                      </div>
                    </div>
                    <button className={`p-2 rounded-lg transition-all ${
                      theme === 'dark' 
                        ? 'hover:bg-gray-700 text-gray-400' 
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>

                  {/* Contenu */}
                  <div className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {post.content}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 transition-all ${
                          post.liked 
                            ? 'text-red-500' 
                            : theme === 'dark' ? 'text-gray-400 hover:text-red-400' : 'text-gray-600 hover:text-red-500'
                        }`}
                      >
                        <svg className="w-5 h-5" fill={post.liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="text-sm">{post.likes}</span>
                      </button>

                      <button className={`flex items-center gap-2 transition-all ${
                        theme === 'dark' ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'
                      }`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="text-sm">{post.comments}</span>
                      </button>

                      <button className={`flex items-center gap-2 transition-all ${
                        theme === 'dark' ? 'text-gray-400 hover:text-green-400' : 'text-gray-600 hover:text-green-500'
                      }`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
                        </svg>
                        <span className="text-sm">Partager</span>
                      </button>
                    </div>

                    <button className={`transition-all ${
                      theme === 'dark' ? 'text-gray-400 hover:text-orange-400' : 'text-gray-600 hover:text-orange-500'
                    }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Actualite;