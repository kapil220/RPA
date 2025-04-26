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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform py-2 duration-500 
          ${isScrolled ? '-translate-y-full' : 'translate-y-0'}  
          bg-opacity-80 backdrop-filter backdrop-blur-lg`}
      >
        <div className="container ">
          <div className="flex items-center justify-between">
            {/* Logo - Hidden when mobile menu is open */}
            {!isMenuOpen && (
              <Link href="/" className="flex items-center md:block">
                <div className="flex items-center justify-start mx-4">
                  <Image
                    src="/images/logo2.png"
                    alt="Logo"
                    height={50}
                    width={50}
                    className="w-24 h-12"
                  />
                  <div className="md:flex hidden flex-col ml-2">
                    <span className="font-playfair text-xl font-bold text-stone-300">
                      RPA international
                    </span>
                    <span className="text-sm text-stone-300">
                      RAVI PRAKASH ARCHITECTS
                    </span>
                  </div>
                </div>
              </Link>
            )}
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-end flex-1 mx-8">
              <div className="flex space-x-8 text-stone-300">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/portfolio">Portfolio</NavLink>
                <NavLink href="/services">Services</NavLink>
                <NavLink href="/contact">Contact</NavLink>
              </div>
            </nav>
            
            {/* Mobile Menu Button - Push to left when logo is hidden */}
            <button 
              onClick={toggleMenu} 
              className={`md:hidden text-stone-300  focus:outline-none ${isMenuOpen ? 'mx-4' : 'mr-4'}`}
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
      </header>
      
      {/* Mobile Menu - Right Side below header */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              className="fixed inset-0 bg-opacity-50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />
            
            {/* Menu panel - Full height with glass effect, starting below header */}
            <motion.div 
              className="md:hidden fixed top-16 right-0 bottom-0 w-full z-40 bg-opacity-80 backdrop-blur-lg"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="h-full flex flex-col relative">
                {/* Company Logo in Menu */}
                <div className="flex items-center justify-center p-6 border-b border-white/20">
                  <Image
                    src="/images/logo2.png"
                    alt="Logo"
                    height={70}
                    width={70}
                    className="w-24 h-16"
                  />
                  <div className="flex flex-col ml-2 ">
                    <span className="font-playfair text-xl font-bold text-white">
                      RPA international
                    </span>
                    <span className="text-sm text-white">
                      RAVI PRAKASH ARCHITECTS
                    </span>
                  </div>
                </div>
                
                {/* Menu items */}
                <div className="flex-1 flex flex-col justify-center px-8">
                  <nav className="flex flex-col space-y-8">
                    <MobileNavLink href="/" onClick={toggleMenu}>Home</MobileNavLink>
                    <MobileNavLink href="/about" onClick={toggleMenu}>About</MobileNavLink>
                    <MobileNavLink href="/portfolio" onClick={toggleMenu}>Portfolio</MobileNavLink>
                    <MobileNavLink href="/services" onClick={toggleMenu}>Services</MobileNavLink>
                    <MobileNavLink href="/contact" onClick={toggleMenu}>Contact</MobileNavLink>
                    <button className="bg-white/20 text-white px-5 py-3 text-lg font-medium w-full mt-8 border border-white/20 hover:bg-white/30 transition-all">
                      Get a Quote
                    </button>
                  </nav>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, children }) {
  return (
    <Link 
      href={href} 
      className="text-stone-300 text-sm font-medium hover:text-white transition-colors relative group"
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
      className="text-white text-lg font-medium w-full block hover:text-stone-300 transition-colors"
    >
      {children}
    </Link>
  );
}