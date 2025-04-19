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
  const [direction, setDirection] = useState(1); // 1 for down, -1 for up
  const sectionRef = useRef(null);
  const [sectionActive, setSectionActive] = useState(false);
  const [hasCompletedViewing, setHasCompletedViewing] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFullyVisible, setIsFullyVisible] = useState(false);
  
  // Track when portfolio section is fully in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Only activate when section is 95% visible (nearly full view)
        if (entry.isIntersecting && entry.intersectionRatio > 0.95) {
          setSectionActive(true);
          setIsFullyVisible(true);
          // Only reset to first project when entering for the first time
          if (!sectionActive) {
            setActiveIndex(0);
          }
        } else if (entry.intersectionRatio < 0.5) {
          // When less than half visible, deactivate
          setSectionActive(false);
          setIsFullyVisible(false);
        }
      },
      { threshold: [0.5, 0.95] } // Check at 50% and 95% visibility
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [sectionActive]);
  
  // Handle wheel events when section is active and fully visible
  useEffect(() => {
    if (!sectionActive || !isFullyVisible || hasCompletedViewing) return;
    
    let isProcessingScroll = false;
    let wheelTimeout;
    
    const handleWheel = (e) => {
      // Prevent rapid scrolling by using a cooldown
      if (isProcessingScroll || isTransitioning) return;
      isProcessingScroll = true;
      
      // Process scroll direction
      if (e.deltaY > 0) { // Scrolling down
        if (activeIndex < projects.length - 1) {
          e.preventDefault(); // Only prevent default if we're handling it
          setDirection(1); // Scrolling down
          setIsTransitioning(true);
          setTimeout(() => {
            setActiveIndex(prevIndex => prevIndex + 1);
            setTimeout(() => {
              setIsTransitioning(false);
            }, 600); // Allow time for animation to complete
          }, 50);
        } else if (activeIndex === projects.length - 1) {
          // Allow scrolling to next section after viewing all projects
          setHasCompletedViewing(true);
          // Don't prevent default - let the page scroll naturally
        }
      } else if (e.deltaY < 0) { // Scrolling up
        if (activeIndex > 0) {
          e.preventDefault(); 
          setDirection(-1); // Scrolling up
          setIsTransitioning(true);
          setTimeout(() => {
            setActiveIndex(prevIndex => prevIndex - 1);
            setTimeout(() => {
              setIsTransitioning(false);
            }, 600); // Allow time for animation to complete
          }, 50);
        } else if (activeIndex === 0) {
          // At first project, allow normal scrolling up
          // Don't prevent default - let the page scroll naturally to previous section
        }
      }
      
      // Set a timeout to avoid rapid scrolling
      wheelTimeout = setTimeout(() => {
        isProcessingScroll = false;
      }, 800);
    };
    
    // Add wheel listener to window
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(wheelTimeout);
    };
  }, [sectionActive, isFullyVisible, activeIndex, hasCompletedViewing, isTransitioning]);
  
  // Reset completion status when section is no longer active
  useEffect(() => {
    if (!sectionActive) {
      setHasCompletedViewing(false);
    }
  }, [sectionActive]);

  return (
    <section 
    ref={sectionRef}
    id="portfolio"
    className="min-h-screen flex flex-col md:flex-row bg-stone-900 text-white relative overflow-hidden"
  >
    {/* LEFT: Image (60%) */}
    <div className="w-full md:w-3/5 relative  overflow-hidden ">
  <AnimatePresence mode="popLayout">
    <motion.div 
      key={activeIndex}
      className="w-full h-full"
      initial={{ 
        y: direction > 0 ? '100%' : '-100%',
        opacity: 0 
      }}
      animate={{ 
        y: 0,
        opacity: 1 
      }}
      exit={{ 
        y: direction > 0 ? '-100%' : '100%',
        opacity: 0 
      }}
      transition={{ 
        duration: 0.8,
        ease: [0.165, 0.84, 0.44, 1]
      }}
    >
      <Image
        src={projects[activeIndex].image}
        alt={projects[activeIndex].title}
        fill
        className="object-cover py-64 px-16"
        priority={activeIndex === 0}
        quality={90}
      />
    </motion.div>
  </AnimatePresence>
</div>

  
    {/* RIGHT: Text (40%) */}
    <div className="w-full md:w-2/5 px-8 py-16 flex flex-col justify-between order-2 md:order-2">
      <div>
        <motion.h2 
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: sectionActive ? 1 : 0, y: sectionActive ? 0 : 20 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Our Portfolio
        </motion.h2>
        <motion.p 
          className="text-lg text-zinc-400 max-w-md mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: sectionActive ? 1 : 0, y: sectionActive ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          We create architectural masterpieces that blend form and function
          with sustainable design principles.
        </motion.p>
      </div>
  
      {/* Project Details */}
      <div className="relative h-32 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeIndex}
            className="absolute w-full"
            initial={{ 
              y: direction > 0 ? 60 : -60,
              opacity: 0 
            }}
            animate={{ 
              y: 0,
              opacity: 1 
            }}
            exit={{ 
              y: direction > 0 ? -60 : 60,
              opacity: 0 
            }}
            transition={{ 
              duration: 0.6,
              ease: [0.165, 0.84, 0.44, 1] 
            }}
          >
            <h3 className="text-3xl font-bold mb-2">
              {projects[activeIndex].title}
            </h3>
            <p className="text-zinc-400 text-lg mb-1">
              {projects[activeIndex].category}
            </p>
            <p className="text-zinc-500">
              {projects[activeIndex].location} • {projects[activeIndex].year}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
  
      {/* Progress Dots */}
      <div className="flex space-x-2 mt-12">
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
      </div>
    </div>
  
    {/* Scroll Indicator */}
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
      {isFullyVisible && !hasCompletedViewing && (
        <div className="flex flex-col items-center">
          <p className="text-zinc-400 text-sm mb-2">
            {activeIndex === 0 && projects.length > 1
              ? "Scroll down to explore projects"
              : activeIndex === projects.length - 1
                ? "Scroll down to continue to next section" 
                : "Scroll to navigate projects"}
          </p>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                 viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </div>
      )}
    </div>
  </section>
  
  );
}