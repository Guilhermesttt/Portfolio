import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Apple Clone Website',
      image: 'assets/WEBP/Foto Portfolio 5.webp',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      link: 'https://guilhermesttt.github.io/Site-iPhone/',
      description: 'A pixel-perfect clone of Apple\'s website with smooth animations and responsive design.'
    },
    {
      id: 2,
      title: 'The Last of Us Fan Website',
      image: 'assets/WEBP/Foto Portfolio 4.webp',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      link: 'https://guilhermesttt.github.io/The-Last-of-Us/',
      description: 'An immersive fan website dedicated to The Last of Us with interactive elements.'
    },
    {
      id: 3,
      title: 'Deftones Clone Website',
      image: 'assets/WEBP/Foto Portfolio.webp',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      link: 'https://guilhermesttt.github.io/Deftones-Website/',
      description: 'A music band website clone featuring modern design and audio integration.'
    },
    {
      id: 4,
      title: 'Raissa Sant\'Ana Advogacia',
      image: 'assets/WEBP/Foto Portfolio 2.webp',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      link: 'https://raissasantanadv.netlify.app/',
      description: 'Professional law firm website with elegant design and contact forms.'
    },
    {
      id: 5,
      title: 'CalculeMed Enfermagem',
      image: 'assets/WEBP/Foto Portfolio 3.webp',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      link: 'https://guilhermesttt.github.io/CalculeMed-Enfermagem/',
      description: 'Medical calculation tool for nursing professionals with intuitive interface.'
    },
    {
      id: 6,
      title: 'Spotify Replica Funcional',
      image: 'assets/WEBP/Foto Portfolio 6.webp',
      technologies: ['React', 'Node.js', 'CSS3'],
      link: 'https://spotify-jornada-fullstack.onrender.com/',
      description: 'Full-stack Spotify clone with music streaming capabilities.'
    },
    {
      id: 7,
      title: 'Gastro Pass - Clube de Benefícios',
      image: 'assets/WEBP/Foto Portfolio 7.webp',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      link: 'https://gastropass-gourmetclub.netlify.app',
      description: 'Benefits club platform for restaurants with modern UI/UX design.'
    },
    {
      id: 8,
      title: 'Sistema de Agendamentos',
      image: 'assets/WEBP/Foto Portfolio 8.webp',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      link: 'https://barbearia-premium.netlify.app/',
      description: 'Barbershop appointment booking system with calendar integration.'
    }
  ];

  const getTechIcon = (tech) => {
    const icons = {
      'HTML5': '🌐',
      'CSS3': '🎨',
      'JavaScript': '⚡',
      'React': '⚛️',
      'Node.js': '🟢',
      'TypeScript': '📘',
      'Tailwind CSS': '💨'
    };
    return icons[tech] || '🔧';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="projects" className="section-padding bg-dark-800/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">SOME OF MY PROJECTS</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate front-end developer with solid experience in creating dynamic and 
            responsive user interfaces. I constantly strive to find innovative solutions to design 
            and development challenges.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.article
              key={project.id}
              className="group glass-effect overflow-hidden hover:shadow-2xl transition-all duration-500"
              variants={cardVariants}
              whileHover={{ y: -10 }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink size={16} />
                  </motion.a>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-500/20 text-primary-300 text-xs font-medium rounded-full"
                    >
                      <span>{getTechIcon(tech)}</span>
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>

                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 font-medium transition-colors group/link"
                  whileHover={{ x: 5 }}
                >
                  <span>View Project</span>
                  <ExternalLink size={16} className="group-hover/link:translate-x-1 transition-transform" />
                </motion.a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;