import React from 'react';
import { motion } from 'framer-motion';
import { User, Dribbble, Music } from 'lucide-react';

const About = () => {
  const aboutItems = [
    {
      icon: User,
      title: 'Personal',
      description: 'My full name is Guilherme Lima de Sant\'ana. Although I\'m deeply involved with codes and algorithms, my passion goes beyond the digital world.'
    },
    {
      icon: Dribbble,
      title: 'Sports',
      description: 'In my spare time, I play basketball, facing challenges both on the court and in my academic life.'
    },
    {
      icon: Music,
      title: 'Music',
      description: 'Outside the classroom and the sports field, I connect with my musical soul, with a guitar or acoustic guitar in my hands, unraveling chords and rhythms, transforming my creative energy into captivating melodies.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="section-padding bg-dark-800/50">
      <div className="container-custom">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Image */}
          <motion.div
            className="flex justify-center lg:justify-start"
            variants={imageVariants}
          >
            <div className="relative">
              <motion.img
                src="assets/WEBP/Foto.webp"
                alt="Guilherme Sant'ana"
                className="w-80 h-96 object-cover rounded-2xl shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 0 48px rgba(58, 159, 58, 0.4))'
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary-500/20 to-transparent"></div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-gradient">ABOUT ME</span>
              </h2>
            </div>

            <div className="space-y-6">
              {aboutItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="flex items-start space-x-4 group"
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                      <item.icon className="w-6 h-6 text-primary-400" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional info */}
            <motion.div
              className="glass-effect p-6 rounded-xl"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-bold text-primary-400 mb-3">Current Focus</h3>
              <p className="text-gray-300 leading-relaxed">
                Currently pursuing my degree in Information Systems at UNIRIOS, while continuously 
                expanding my skills in modern web development technologies. I'm passionate about 
                creating user-centered digital experiences that make a difference.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;