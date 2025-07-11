import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Contact = () => {
  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: 'https://wa.me/5582981159207?text=Ol%C3%A1%2C+fui+direcionado+pelo+seu+portf%C3%B3lio',
      color: 'hover:text-green-400',
      bgColor: 'hover:bg-green-400/20'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://www.instagram.com/guilhermesttt.dev_/',
      color: 'hover:text-pink-400',
      bgColor: 'hover:bg-pink-400/20'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/guilherme-lima-de-sant-ana-b243aa359/',
      color: 'hover:text-blue-400',
      bgColor: 'hover:bg-blue-400/20'
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
    <section id="contact" className="section-padding">
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
            className="flex justify-center lg:justify-start order-2 lg:order-1"
            variants={imageVariants}
          >
            <div className="relative">
              <motion.img
                src="assets/WEBP/foto contato.webp"
                alt="Contact Image"
                className="w-80 h-96 object-cover rounded-2xl shadow-2xl"
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
            className="text-center lg:text-left space-y-8 order-1 lg:order-2"
            variants={itemVariants}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-gradient">LET'S CONNECT</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                I'm always open to discussing new projects, creative ideas or opportunities 
                to be part of your vision.
              </p>
            </div>

            {/* Contact Info */}
            <motion.div
              className="glass-effect p-6 rounded-xl space-y-4"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-primary-400 mb-4">Contact Information</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-center lg:justify-start space-x-3 text-gray-300">
                  <Mail className="w-5 h-5 text-primary-400" />
                  <span>dev.guilhermesantana@gmail.com</span>
                </div>
                
                <div className="flex items-center justify-center lg:justify-start space-x-3 text-gray-300">
                  <Phone className="w-5 h-5 text-primary-400" />
                  <span>+55 82 98115-9207</span>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <h3 className="text-xl font-bold text-white">Get in Touch</h3>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center space-x-3 glass-effect px-6 py-4 rounded-xl transition-all duration-300 ${social.color} ${social.bgColor}`}
                    whileHover={{ 
                      scale: 1.05,
                      y: -5
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <social.icon className="w-6 h-6" />
                    <span className="font-medium">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              className="glass-effect p-6 rounded-xl text-center lg:text-left"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-bold text-primary-400 mb-2">Ready to work together?</h3>
              <p className="text-gray-300 mb-4">
                Let's create something amazing together. I'm just one message away!
              </p>
              <motion.a
                href="https://wa.me/5582981159207?text=Ol%C3%A1%2C+fui+direcionado+pelo+seu+portf%C3%B3lio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle size={20} />
                <span>Start a Conversation</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;