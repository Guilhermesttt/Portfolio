import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SoundManager from './components/SoundManager';

function App() {
  return (
    <div className="min-h-screen bg-dark-900 text-white overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <SoundManager />
    </div>
  );
}

export default App;