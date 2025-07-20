import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBlog, FaBookOpen, FaHome, FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { name: "Home", to: "/", icon: <FaHome /> },
  { name: "Blog", to: "/blog", icon: <FaBlog /> },
  { name: "Daily Logs", to: "/daily-logs", icon: <FaBookOpen /> },
  { name: "Projects", to: "/projects" },
  { name: "Contact", to: "#contact" },
];

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSectionNav = (section) => (e) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close mobile menu
    if (isHome) {
      scrollToSection(section);
    } else {
      navigate("/", { replace: false });
      setTimeout(() => scrollToSection(section), 100); // Wait for navigation
    }
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close mobile menu on any link click
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full flex justify-between items-center py-3 px-4 bg-black border-b border-gray-700 fixed top-0 left-0 z-30 backdrop-blur"
      style={{ backdropFilter: "blur(8px)" }}
    >
      {/* Logo/Brand */}
      <div className="flex items-center">
        <Link
          to="/"
          className="text-xl font-bold text-yellow-200 hover:text-indigo-400 transition-colors"
        >
          Portfolio
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 lg:gap-8 items-center text-base lg:text-lg font-medium">
        {navLinks.map((link) => (
          <li key={link.name}>
            {link.name === "Home" ? (
              <Link
                to="/"
                aria-label="Home"
                className="flex items-center gap-2 text-gray-100 hover:text-indigo-400 transition-colors"
                onClick={handleLinkClick}
              >
                <span className="hidden lg:inline">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            ) : link.name === "Projects" ? (
              <Link
                to="/projects"
                aria-label="Projects"
                className="flex items-center gap-2 text-gray-100 hover:text-indigo-400 transition-colors"
                onClick={handleLinkClick}
              >
                <span className="hidden lg:inline">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            ) : link.name === "Contact" ? (
              <a
                href="#contact"
                aria-label="Contact"
                onClick={handleSectionNav("contact")}
                className="flex items-center gap-2 text-gray-100 hover:text-indigo-400 transition-colors"
              >
                <span className="hidden lg:inline">{link.icon}</span>
                <span>{link.name}</span>
              </a>
            ) : link.to.startsWith("/") ? (
              <Link
                to={link.to}
                aria-label={link.name}
                className="flex items-center gap-2 text-gray-100 hover:text-indigo-400 transition-colors"
                onClick={handleLinkClick}
              >
                <span className="hidden lg:inline">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            ) : isHome ? (
              <a
                href={link.to}
                aria-label={link.name}
                className="flex items-center gap-2 text-gray-100 hover:text-indigo-400 transition-colors"
                onClick={handleLinkClick}
              >
                <span className="hidden lg:inline">{link.icon}</span>
                <span>{link.name}</span>
              </a>
            ) : (
              <Link
                to={`/${link.to.replace("#", "")}`}
                aria-label={link.name}
                className="flex items-center gap-2 text-gray-100 hover:text-indigo-400 transition-colors"
                onClick={handleLinkClick}
              >
                <span className="hidden lg:inline">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-100 hover:text-indigo-400 transition-colors p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 w-full bg-black border-b border-gray-700 md:hidden"
        >
          <ul className="flex flex-col py-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.name === "Home" ? (
                  <Link
                    to="/"
                    aria-label="Home"
                    className="flex items-center gap-3 px-6 py-3 text-gray-100 hover:text-indigo-400 hover:bg-gray-900 transition-colors"
                    onClick={handleLinkClick}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                ) : link.name === "Projects" ? (
                  <Link
                    to="/projects"
                    aria-label="Projects"
                    className="flex items-center gap-3 px-6 py-3 text-gray-100 hover:text-indigo-400 hover:bg-gray-900 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <span>{link.name}</span>
                  </Link>
                ) : link.name === "Contact" ? (
                  <a
                    href="#contact"
                    aria-label="Contact"
                    onClick={handleSectionNav("contact")}
                    className="flex items-center gap-3 px-6 py-3 text-gray-100 hover:text-indigo-400 hover:bg-gray-900 transition-colors"
                  >
                    <span>{link.name}</span>
                  </a>
                ) : link.to.startsWith("/") ? (
                  <Link
                    to={link.to}
                    aria-label={link.name}
                    className="flex items-center gap-3 px-6 py-3 text-gray-100 hover:text-indigo-400 hover:bg-gray-900 transition-colors"
                    onClick={handleLinkClick}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                ) : isHome ? (
                  <a
                    href={link.to}
                    aria-label={link.name}
                    className="flex items-center gap-3 px-6 py-3 text-gray-100 hover:text-indigo-400 hover:bg-gray-900 transition-colors"
                    onClick={handleLinkClick}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </a>
                ) : (
                  <Link
                    to={`/${link.to.replace("#", "")}`}
                    aria-label={link.name}
                    className="flex items-center gap-3 px-6 py-3 text-gray-100 hover:text-indigo-400 hover:bg-gray-900 transition-colors"
                    onClick={handleLinkClick}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
