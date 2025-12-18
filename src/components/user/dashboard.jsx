import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/theme-context';
import SnowLayer from '../snow-layer';
import DashboardNavbar from './dashboard-navbar';
import Sidebar from './sidebar';
import { ProgressCard, SprintProgress } from './progress-cards';
import { QuickStats, RecentActivity, UpcomingDeadlines, LearningResources, StudyTimer } from './useful-widgets';
import Calendar from './calendar';
import Footer from '../footer';

const Dashboard = () => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const courses = [
    { id: 1, title: 'React Hooks Avancés', progress: 75, total: 20, color: 'bg-blue-500', icon: '⚛️', trend: 12 },
    { id: 2, title: 'Node.js Backend', progress: 60, total: 25, color: 'bg-green-500', icon: '🟢', trend: -5 },
    { id: 3, title: 'TypeScript Expert', progress: 45, total: 30, color: 'bg-purple-500', icon: '📘', trend: 8 }
  ];

  const sprints = [
    {
      id: 1,
      number: 3,
      title: 'Sprint React Hooks',
      completed: 8,
      total: 12,
      duration: 7,
      points: 100,
      isActive: true,
      tasks: [
        { name: 'Compléter le cours sur useEffect', completed: true },
        { name: 'Pratiquer avec 5 exercices', completed: true },
        { name: 'Créer un projet personnalisé', completed: false },
        { name: 'Revoir les concepts avancés', completed: false },
        { name: 'Préparer la présentation', completed: false }
      ]
    },
    {
      id: 2,
      number: 2,
      title: 'Sprint Node.js',
      completed: 10,
      total: 10,
      duration: 5,
      points: 80,
      isActive: false,
      tasks: [
        { name: 'Installer Node.js', completed: true },
        { name: 'Créer un serveur simple', completed: true },
        { name: 'Apprendre Express.js', completed: true }
      ]
    }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <QuickStats />
            <RecentActivity />
            <StudyTimer />
          </div>
        );
      case 'courses':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <ProgressCard
                key={course.id}
                title={course.title}
                progress={course.progress}
                total={course.total}
                unit="leçons"
                color={course.color}
                icon={course.icon}
                trend={course.trend}
              />
            ))}
          </div>
        );
      case 'sprints':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sprints.map((sprint) => (
              <SprintProgress
                key={sprint.id}
                sprint={sprint}
                isActive={sprint.isActive}
              />
            ))}
          </div>
        );
      case 'calendar':
        return <Calendar />;
      case 'progress':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UpcomingDeadlines />
            <LearningResources />
          </div>
        );
      case 'achievements':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Placeholder pour les succès */}
            <div className="glass p-6 rounded-2xl text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Succès à Venir
              </h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Continuez votre apprentissage pour débloquer de nouveaux succès!
              </p>
            </div>
          </div>
        );
      case 'resources':
        return <LearningResources />;
      case 'settings':
        return (
          <div className="glass p-8 rounded-2xl">
            <h3 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Paramètres du Dashboard
            </h3>
            <div className="space-y-4">
              <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Préférences d'affichage
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Afficher les animations
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Activer les notifications
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <QuickStats />;
    }
  };

  return (
    <div className="min-h-screen glass">
      <DashboardNavbar onSidebarToggle={toggleSidebar} sidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Background avec dégradé et Blobs améliorés */}
      <div className="fixed inset-0 overflow-hidden -z-20 pointer-events-none">
        {/* Fond dégradé selon le thème */}
        <div className={`absolute inset-0 ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900' 
            : 'bg-gradient-to-br from-blue-50 via-purple-50/30 to-pink-50'
        }`} />
        
        {/* Les cercles de couleurs (Blobs) améliorés */}
        <div className={`absolute rounded-full top-60 left-1/4 -translate-x-1/2 size-150 blur-[120px] ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-purple-600/30 to-blue-600/30' 
            : 'bg-gradient-to-r from-blue-400/40 to-purple-400/40'
        }`} />
        
        <div className={`absolute rounded-full top-40 right-1/4 translate-x-1/2 size-180 blur-[140px] ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-pink-600/25 to-orange-600/25' 
            : 'bg-gradient-to-r from-pink-400/35 to-orange-400/35'
        }`} />
        
        <div className={`absolute rounded-full bottom-20 left-1/2 -translate-x-1/2 size-200 blur-[160px] ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-cyan-600/20 to-teal-600/20' 
            : 'bg-gradient-to-r from-cyan-400/30 to-teal-400/30'
        }`} />
        
        {/* Particules flottantes additionnelles */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-[80px] animate-pulse" />
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-[90px] animate-pulse" />
        
        {/* La couche de neige par-dessus tout */}
        <SnowLayer />
      </div>
      
      <main className={`pt-24 pb-32 px-6 transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-72' : 'lg:ml-0'
      }`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
