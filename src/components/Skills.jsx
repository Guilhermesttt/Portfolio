import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skills = [
    {
      name: 'HTML',
      level: 'Advanced',
      image: 'assets/WEBP/HTML.webp',
      percentage: 95
    },
    {
      name: 'CSS',
      level: 'Advanced',
      image: 'assets/WEBP/CSS.webp',
      percentage: 90
    },
    {
      name: 'JavaScript',
      level: 'Intermediate',
      image: 'assets/WEBP/javascript.webp',
      percentage: 80
    },
    {
      name: 'Python',
      level: 'Intermediate',
      image: 'assets/WEBP/Python.webp',
      percentage: 75
    },
    {
      name: 'React',
      level: 'Intermediate',
      image: 'assets/WEBP/React.webp',
      percentage: 85
    },
    {
      name: 'TailwindCSS',
      level: 'Intermediate',
      image: 'assets/WEBP/Tailwind.png',
      percentage: 80
    },
    {
      name: 'TypeScript',
      level: 'Basic',
      image: 'assets/WEBP/TypeScript.png',
      percentage: 60
    },
    {
      name: 'Node.js',
      level: 'Intermediate',
      image: 'assets/WEBP/Node.webp',
      percentage: 70
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Advanced':
        return 'text-green-400';
      case 'Intermediate':
        return 'text-yellow-400';
      case 'Basic':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <section id="skills" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">SKILLS & EXPERIENCE</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Here are the technologies and tools I work with to bring ideas to life.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="group glass-effect p-6 text-center hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <motion.div
                  className="mb-4 flex justify-center"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="w-16 h-16 object-contain filter drop-shadow-lg"
                    loading="lazy"
                  />
                </motion.div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {skill.name}
                </h3>

                <p className={`text-sm font-medium mb-3 ${getLevelColor(skill.level)}`}>
                  {skill.level}
                </p>

                {/* Progress bar */}
                <div className="w-full bg-dark-700 rounded-full h-2 mb-2">
                  <motion.div
                    className="bg-gradient-to-r from-primary-500 to-primary-400 h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
                
                <span className="text-xs text-gray-400">{skill.percentage}%</span>
              </div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary-500/20 via-transparent to-primary-500/20 blur-xl"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;