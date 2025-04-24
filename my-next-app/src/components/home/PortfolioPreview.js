'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const projects = [
  {
    title: 'Urban Harmony',
    category: 'Residential',
    location: 'Barcelona, Spain',
    year: '2023',
    image: '/images/portfolio/1.jpg',
  },
  {
    title: 'Glass Pavilion',
    category: 'Commercial',
    location: 'Tokyo, Japan',
    year: '2022',
    image: '/images/portfolio/2.jpg',
  },
  {
    title: 'Vertical Gardens',
    category: 'Mixed Use',
    location: 'Singapore',
    year: '2023',
    image: '/images/portfolio/3.jpg',
  },
];

export default function PortfolioPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 0 = initial, 1 = down, -1 = up
  const sectionRef = useRef(null);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [hasCompletedViewing, setHasCompletedViewing] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);
  const wasInView = useRef(false);
  const previousIndex = useRef(activeIndex);
  
  // Update previousIndex whenever activeIndex changes
  useEffect(() => {
    previousIndex.current = activeIndex;
  }, [activeIndex]);
  
  // Track when portfolio section enters and exits view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (entry.isIntersecting && entry.intersectionRatio > 0.95) {
          setScrollEnabled(true);
          
          // If section was previously not in view and is now in view,
          // we're reentering the section
          if (!wasInView.current) {
            // Only reset transitioning state and direction when reentering
            setIsTransitioning(false);
            setDirection(0); // Reset direction to initial state
            setHasCompletedViewing(false);
          }
          
          wasInView.current = true;
        } else {
          setScrollEnabled(false);
          
          if (wasInView.current && !entry.isIntersecting) {
            wasInView.current = false;
          }
        }
      },
      { threshold: [0.1, 0.95] }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Handle wheel events when scrolling is enabled
  useEffect(() => {
    if (!scrollEnabled) return;
    
    if (hasCompletedViewing) return;
    
    const handleWheel = (e) => {
      e.preventDefault();
      
      const now = Date.now();
      
      if (isTransitioning || now - lastScrollTime.current < 900) return;
      
      if (e.deltaY > 25) { // Scrolling down
        if (activeIndex < projects.length - 1) {
          setDirection(1); // Scrolling down
          setIsTransitioning(true);
          lastScrollTime.current = now;
          
          setTimeout(() => {
            setActiveIndex(prevIndex => prevIndex + 1);
            setTimeout(() => {
              setIsTransitioning(false);
            }, 1200);
          }, 150);
        } else if (activeIndex === projects.length - 1) {
          setHasCompletedViewing(true);
        }
      } else if (e.deltaY < -25) { // Scrolling up
        if (activeIndex > 0) {
          setDirection(-1); // Scrolling up
          setIsTransitioning(true);
          lastScrollTime.current = now;
          
          setTimeout(() => {
            setActiveIndex(prevIndex => prevIndex - 1);
            setTimeout(() => {
              setIsTransitioning(false);
            }, 1200);
          }, 150);
        } else if (activeIndex === 0) {
          setHasCompletedViewing(true);
        }
      }
    };
    
    // Add touch event handlers for mobile
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };
    
    const touchThreshold = 50;
    
    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      
      if (Math.abs(deltaY) < touchThreshold) return;
      
      const now = Date.now();
      
      if (isTransitioning || now - lastScrollTime.current < 900) return;
      
      if (deltaY > 0) { // Swiping up (next project)
        if (activeIndex < projects.length - 1) {
          setDirection(1);
          setIsTransitioning(true);
          lastScrollTime.current = now;
          
          setTimeout(() => {
            setActiveIndex(prevIndex => prevIndex + 1);
            setTimeout(() => {
              setIsTransitioning(false);
            }, 1200);
          }, 150);
        } else if (activeIndex === projects.length - 1) {
          setHasCompletedViewing(true);
        }
      } else if (deltaY < 0) { // Swiping down (previous project)
        if (activeIndex > 0) {
          setDirection(-1);
          setIsTransitioning(true);
          lastScrollTime.current = now;
          
          setTimeout(() => {
            setActiveIndex(prevIndex => prevIndex - 1);
            setTimeout(() => {
              setIsTransitioning(false);
            }, 1200);
          }, 150);
        } else if (activeIndex === 0) {
          setHasCompletedViewing(true);
        }
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollEnabled, activeIndex, hasCompletedViewing, isTransitioning]);

  // Determine actual direction for animations based on index change when direction is 0
  const getAnimationDirection = () => {
    // If we have an explicit direction from user scrolling, use it
    if (direction !== 0) return direction;
    
    // If we're returning to the page and need to calculate direction based on indices
    // This ensures correct animation direction when component is re-mounted
    if (activeIndex > previousIndex.current) return 1;  // "Scrolling down"
    if (activeIndex < previousIndex.current) return -1; // "Scrolling up"
    
    // Default case
    return 1;
  };

  const animDirection = getAnimationDirection();

  return (
    <section 
      ref={sectionRef}
      id="portfolio"
      className="min-h-screen flex flex-col md:flex-row relative overflow-hidden"
    >
      {/* Text Section - First on mobile, Second on desktop */}
      <div className="w-full md:w-2/5 px-8 py-12 flex flex-col justify-between order-first md:order-last">
        <div>
          <motion.h2 
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Our Portfolio
          </motion.h2>
          <motion.p 
            className="text-lg  max-w-md mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            We create architectural masterpieces that blend form and function
            with sustainable design principles.
          </motion.p>
        </div>
    
        {/* Project Details */}
        <div className="relative h-32 overflow-hidden mb-8">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={activeIndex}
              className="absolute w-full"
              initial={{ 
                y: animDirection > 0 ? 60 : -60,
                opacity: 0 
              }}
              animate={{ 
                y: 0,
                opacity: 1 
              }}
              exit={{ 
                y: animDirection > 0 ? -60 : 60,
                opacity: 0 
              }}
              transition={{ 
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <h3 className="text-3xl font-bold mb-2">
                {projects[activeIndex].title}
              </h3>
              <p className=" text-lg mb-1">
                {projects[activeIndex].category}
              </p>
              <p className="">
                {projects[activeIndex].location} • {projects[activeIndex].year}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
    
        {/* Progress Dots */}
        <motion.div 
          className="flex space-x-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {projects.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full transition-all ${
                activeIndex === index ? "bg-white" : "bg-zinc-600"
              }`}
              animate={{ 
                width: activeIndex === index ? "24px" : "8px",
              }}
              transition={{ 
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
              aria-label={`Project ${index + 1} of ${projects.length}`}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Image Section - Second on mobile, First on desktop */}
      <div className="w-full md:w-3/5 flex justify-center items-center order-last md:order-first">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div 
            key={activeIndex}
            className="relative h-96 w-96 md:h-128 md:w-[800px]"
            initial={{ 
              y: animDirection > 0 ? '100%' : '-100%',
              opacity: 0 
            }}
            animate={{ 
              y: 0,
              opacity: 1 
            }}
            exit={{ 
              y: animDirection > 0 ? '-100%' : '100%',
              opacity: 0 
            }}
            transition={{ 
              duration: 1.5,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <Image
              src={projects[activeIndex].image}
              alt={projects[activeIndex].title}
              fill
              className="object-cover p-4"
              priority={true}
              quality={90}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    
      {/* Scroll Indicator - Only shown when scrolling is enabled */}
      <motion.div 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: scrollEnabled && !hasCompletedViewing ? 1 : 0,
        }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center">
          <p className=" text-sm mb-2 text-center px-4">
            {activeIndex === 0 && projects.length > 1
              ? "Scroll down to explore projects"
              : activeIndex === projects.length - 1
                ? "Scroll down to continue" 
                : "Scroll to navigate projects"}
          </p>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              duration: 2, 
              ease: "easeInOut", 
              repeat: Infinity, 
              repeatDelay: 0.5
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                 viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}