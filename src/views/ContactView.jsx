import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import SnowLayer from '../components/snow-layer';
import { useTheme } from '../context/theme-context';

const ContactView = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('Message envoyé avec succès!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen glass">
      <Navbar />
      
      {/* Background avec Blobs et Neige intégrée */}
      <div className="fixed inset-0 overflow-hidden -z-20 pointer-events-none">
        {/* Les cercles de couleurs (Blobs) */}
        <div className="absolute rounded-full top-80 left-2/5 -translate-x-1/2 size-130 bg-[#D10A8A] blur-[100px]" />
        <div className="absolute rounded-full top-80 right-0 -translate-x-1/2 size-130 bg-[#2E08CF] blur-[100px]" />
        <div className="absolute rounded-full top-0 left-1/2 -translate-x-1/2 size-130 bg-[#F26A06] blur-[100px]" />
        
        {/* La couche de neige par-dessus les blobs mais sous le texte */}
        <SnowLayer />
      </div>
      
      <main className="pt-24 pb-32 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Contactez-nous
            </h1>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Nous sommes là pour répondre à toutes vos questions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass p-8">
              <h2 className={`text-2xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Envoyez-nous un message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2">
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Envoyer le message
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="glass p-8">
                <h3 className="text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4">
                  Informations de contact
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}">Email</h4>
                    <p className="text-gray-600 dark:text-gray-300">contact@entreprise.com</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}">Téléphone</h4>
                    <p className="text-gray-600 dark:text-gray-300">+33 1 23 45 67 89</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}">Adresse</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      123 Rue de l'Innovation<br />
                      75001 Paris, France
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass p-8">
                <h3 className="text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4">
                  Heures d'ouverture
                </h3>
                
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <p>Lundi - Vendredi: 9h00 - 18h00</p>
                  <p>Samedi: 10h00 - 16h00</p>
                  <p>Dimanche: Fermé</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactView;
