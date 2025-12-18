import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/theme-context';

const Sidebar = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('overview');

  const menuItems = [
    {
      id: 'overview',
      name: 'Aperçu',
      icon: '📊',
      description: 'Vue d\'ensemble'
    },
    {
      id: 'courses',
      name: 'Cours',
      icon: '📚',
      description: 'Mes cours en cours'
    },
    {
      id: 'sprints',
      name: 'Sprints',
      icon: '⚡',
      description: 'Sprints d\'apprentissage'
    },
    {
      id: 'calendar',
      name: 'Calendrier',
      icon: '📅',
      description: 'Planning et rappels'
    },
    {
      id: 'progress',
      name: 'Progression',
      icon: '📈',
      description: 'Statistiques détaillées'
    },
    {
      id: 'achievements',
      name: 'Succès',
      icon: '🏆',
      description: 'Badges et récompenses'
    },
    {
      id: 'resources',
      name: 'Ressources',
      icon: '💎',
      description: 'Documents et outils'
    },
    {
      id: 'settings',
      name: 'Paramètres',
      icon: '⚙️',
      description: 'Configuration du compte'
    }
  ];

  const quickStats = [
    { label: 'Cours actifs', value: '3', color: 'text-blue-500' },
    { label: 'Sprints cette semaine', value: '2', color: 'text-green-500' },
    { label: 'Rappels aujourd\'hui', value: '5', color: 'text-orange-500' },
    { label: 'Objectifs atteints', value: '8', color: 'text-purple-500' }
  ];

  return (
    <>
      {/* Overlay pour mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <motion.div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 z-30 transform transition-all duration-300 shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Fond du sidebar avec délimitation renforcée */}
        <div className={`h-full glass border-r-4 ${
          theme === 'dark' 
            ? 'border-blue-500/30 bg-gray-900/95' 
            : 'border-blue-500/20 bg-white/95'
        }`}>
        <div className="flex flex-col h-full">
          {/* Header du Sidebar */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Menu
              </h2>
            </div>
            
            {/* Statistiques rapides */}
            <div className="grid grid-cols-2 gap-3">
              {quickStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation principale */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : `${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`
                  }`}
                >
                  <div className="text-2xl">{item.icon}</div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{item.name}</div>
                    <div className={`text-xs ${activeSection === item.id ? 'text-white/80' : theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                      {item.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </nav>

          {/* Footer du Sidebar */}
          <div className="p-4 border-t border-white/10">
            <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              <div className="mb-2">Espace d'apprentissage</div>
              <div>Version 2.0</div>
            </div>
          </div>
        </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
