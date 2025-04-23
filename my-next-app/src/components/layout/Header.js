'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    let lastScrollY = window.scrollY;
  
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
  
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsScrolled(true);
      } else {
        // Scrolling up
        setIsScrolled(false);
      }
  
      lastScrollY = currentScrollY;
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header
    className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500
      ${isScrolled ? '-translate-y-full' : 'translate-y-0'}
      bg-black bg-opacity-80 py-2`}
    
>

  
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-center">
  <div className="flex items-center">
    <Image
      src="/images/logo2.png"  // Toggle logo
      alt="Logo"
      height={50}
      width={50}
    />
    <span className="font-playfair text-2xl font-bold transition-colors duration-300  text-white ">
      International
    </span>
  </div>
  <span className="text-lg transition-colors duration-300 text-white">
    Ravi Prakash Architech
  </span>
</Link>

          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/portfolio">Portfolio</NavLink>
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <motion.button 
              className="bg-white backdrop-blur text-black px-5 py-2  text-sm font-medium hover:bg-opacity-90 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get a Quote
            </motion.button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-white focus:outline-none"
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-full left-0 right-0 bg-black"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col space-y-4">
                <MobileNavLink href="/" onClick={toggleMenu}>Home</MobileNavLink>
                <MobileNavLink href="/about" onClick={toggleMenu}>About</MobileNavLink>
                <MobileNavLink href="/portfolio" onClick={toggleMenu}>Portfolio</MobileNavLink>
                <MobileNavLink href="/services" onClick={toggleMenu}>Services</MobileNavLink>
                <MobileNavLink href="/contact" onClick={toggleMenu}>Contact</MobileNavLink>
                <button className="bg-white text-black px-5 py-3 rounded-sm text-sm font-medium w-full mt-4">
                  Get a Quote
                </button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ href, children }) {
  return (
    <Link 
      href={href} 
      className="text-white text-sm font-medium hover:text-white/80 transition-colors relative group"
    >
      {children}
      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="text-white text-lg font-medium py-2 border-b border-white/10 w-full block"
    >
      {children}
    </Link>
  );
}