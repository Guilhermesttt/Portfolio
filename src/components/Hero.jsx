import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'GUILHERME SANT\'ANA';
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 150);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center section-padding">
      <div className="container-custom">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Image */}
          <motion.div
            className="order-2 lg:order-1 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative">
              <motion.img
                src="assets/WEBP/Foto_portifolio.webp"
                alt="Guilherme Sant'ana"
                className="w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-2xl shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 0 48px rgba(58, 159, 58, 0.4))'
                }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary-500/20 to-transparent"></div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="order-1 lg:order-2 text-center lg:text-left space-y-6"
            variants={itemVariants}
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold"
                variants={itemVariants}
              >
                <span className="block text-white font-mono">
                  {displayText}
                  <span className="animate-pulse">|</span>
                </span>
                <span className="block text-2xl md:text-3xl lg:text-4xl text-primary-400 mt-2">
                  FRONTEND DEVELOPER
                </span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                variants={itemVariants}
              >
                I'm an Information Systems student at the University of Rio São Francisco (UNIRIOS), 
                based in Paulo Afonso - Bahia. Passionate about creating amazing digital experiences.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <motion.a
                href="https://github.com/Guilhermesttt"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <Github size={20} />
                  <span>Visit My GitHub</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;