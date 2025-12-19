import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/theme-context';
import DashboardNavbar from '../user/dashboard-navbar';
import Sidebar from '../user/sidebar';
import Footer from '../footer';
import SnowLayer from '../snow-layer';
import adminAPI from '../../services/adminAPI';

const AdminDashboard = () => {
  const { isDarkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [analysisStats, setAnalysisStats] = useState(null);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        setLoading(true);

        const statsResponse = await adminAPI.getAnalysisStats();
        setAnalysisStats(statsResponse.data);

        const reportsResponse = await adminAPI.getReports();
        setReports(reportsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error loading admin data:', error);
        setLoading(false);
      }
    };

    loadAdminData();

    const interval = setInterval(loadAdminData, 30000);
    return () => clearInterval(interval);
  }, []);

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <>
      <DashboardNavbar />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className={`p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <SnowLayer />

        {/* Notifications */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Notifications</h2>
          {notifications.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              Aucune notification
            </div>
          ) : (
            notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg border mb-2 ${
                  notification.read
                    ? isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
                    : isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <p>{notification.message}</p>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="px-2 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Marquer comme lu
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearAllNotifications}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Tout effacer
            </button>
          )}
        </div>

        {/* Dashboard content */}
        {loading ? (
          <p>Chargement des données...</p>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4">Statistiques</h2>
            <pre>{JSON.stringify(analysisStats, null, 2)}</pre>

            <h2 className="text-xl font-bold mt-6 mb-4">Rapports</h2>
            <pre>{JSON.stringify(reports, null, 2)}</pre>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default AdminDashboard;