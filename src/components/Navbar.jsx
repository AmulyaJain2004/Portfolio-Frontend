import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBlog, FaBookOpen, FaHome } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', to: '/', icon: <FaHome /> },
  { name: 'Blog', to: '/blog', icon: <FaBlog /> },
  { name: 'Daily Logs', to: '/daily-logs', icon: <FaBookOpen /> },
  { name: 'Projects', to: '/projects' },
  { name: 'Contact', to: '#contact' },
];

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleSectionNav = (section) => (e) => {
    e.preventDefault();
    if (isHome) {
      scrollToSection(section);
    } else {
      navigate('/', { replace: false });
      setTimeout(() => scrollToSection(section), 100); // Wait for navigation
    }
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="w-full flex justify-center py-4 px-2 bg-black border-b border-gray-700 fixed top-0 left-0 z-30 backdrop-blur"
      style={{backdropFilter: 'blur(8px)'}}
    >
      <ul className="flex gap-6 sm:gap-10 items-center text-lg font-medium">
        {navLinks.map(link => (
          <li key={link.name}>
            {link.name === 'Home' ? (
              <Link to="/" aria-label="Home" className="flex items-center gap-2 text-gray-100 hover:text-indigo-400 transition-colors">
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ) : link.name === 'Projects' ? (
              <Link to="/projects" aria-label="Projects" className="flex items-center gap-2 text-gray-100 hover:text-indigo-400 transition-colors">
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ) : link.name === 'Contact' ? (
              <a href="#contact" aria-label="Contact" onClick={handleSectionNav('contact')} className="flex items-center gap-2 text-gray-100 hover:text-indigo-400 transition-colors">
                {link.icon}
                <span>{link.name}</span>
              </a>
            ) : link.to.startsWith('/') ? (
              <Link to={link.to} aria-label={link.name} className="flex items-center gap-2 text-gray-100 hover:text-indigo-400 transition-colors">
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ) : isHome ? (
              <a href={link.to} aria-label={link.name} className="flex items-center gap-2 text-gray-100 hover:text-indigo-400 transition-colors">
                {link.icon}
                <span>{link.name}</span>
              </a>
            ) : (
              <Link to={`/${link.to.replace('#','')}`} aria-label={link.name} className="flex items-center gap-2 text-gray-100 hover:text-indigo-400 transition-colors">
                {link.icon}
                <span>{link.name}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default Navbar; 