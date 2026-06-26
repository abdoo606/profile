import { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Templates from './components/Templates';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { trackVisitor } from './data/store';

function AppContent() {
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    // Track visitor on page load
    trackVisitor(window.location.pathname);
  }, []);

  return (
    <div className="bg-slate-950 font-sans selection:bg-blue-500/30">
      <Navbar onAdminClick={() => setAdminOpen(true)} />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Templates />
        <Skills />
        <Contact />
      </main>
      <Footer />
      {adminOpen && (
        <AdminPanel
          onClose={() => setAdminOpen(false)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}