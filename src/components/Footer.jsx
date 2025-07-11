import React from 'react';
import { motion } from 'framer-motion';
import { Cactus, Mail, Phone, Github, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Guilhermesttt', label: 'GitHub' },
    { icon: Instagram, href: 'https://www.instagram.com/guilhermesttt.dev_/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/guilherme-lima-de-sant-ana-b243aa359/', label: 'LinkedIn' }
  ];

  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-dark-900 border-t border-white/10">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2">
              <Cactus className="w-8 h-8 text-primary-500" />
              <span className="text-2xl font-bold text-white">Guilherme Sant'ana</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Frontend Developer creating digital experiences that make a difference.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center text-primary-400 hover:bg-primary-500/30 hover:text-primary-300 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300 block py-1"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    whileHover={{ x: 5 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-white">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4 text-primary-400" />
                <span className="text-sm">dev.guilhermesantana@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-4 h-4 text-primary-400" />
                <span className="text-sm">+55 82 98115-9207</span>
              </div>
            </div>
          </motion.div>

          {/* Newsletter/CTA */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold text-white">Let's Work Together</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Have a project in mind? Let's discuss how we can bring your ideas to life.
            </p>
            <motion.a
              href="https://wa.me/5582981159207?text=Ol%C3%A1%2C+fui+direcionado+pelo+seu+portf%C3%B3lio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get in Touch</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/10 mt-12 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Guilherme Sant'ana. All Rights Reserved. Made with ❤️ and React.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;