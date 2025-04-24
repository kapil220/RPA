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
  const [direction, setDirection] = useState(0); // 0 = initial, 1 = right, -1 = left
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [hasCompletedViewing, setHasCompletedViewing] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lastScrollTime = useRef(0);
  const touchStartX = useRef(0);
  const wasInView = useRef(false);
  const previousIndex = useRef(activeIndex);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if the screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
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
          
          if (!wasInView.current) {
            setIsTransitioning(false);
            setDirection(0);
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

  // Mobile horizontal scroll effect
  useEffect(() => {
    if (!isMobile || !scrollContainerRef.current) return;
    
    const scrollContainer = scrollContainerRef.current;
    
    const handleScroll = () => {
      if (isTransitioning) return;
      
      const containerWidth = scrollContainer.clientWidth;
      const scrollPosition = scrollContainer.scrollLeft;
      const maxScroll = scrollContainer.scrollWidth - containerWidth;
      
      // Calculate which image is most visible
      const imageWidth = containerWidth * 0.9; // Each image takes 90% of container width
      const currentIndex = Math.round(scrollPosition / imageWidth);
      
      if (currentIndex !== activeIndex && currentIndex >= 0 && currentIndex < projects.length) {
        setDirection(currentIndex > activeIndex ? 1 : -1);
        setActiveIndex(currentIndex);
      }
    };
    
    scrollContainer.addEventListener('scroll', handleScroll);
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, activeIndex, isTransitioning]);
  
  // Handle desktop wheel events when scrolling is enabled
  useEffect(() => {
    if (isMobile || !scrollEnabled || hasCompletedViewing) return;
    
    const handleWheel = (e) => {
      e.preventDefault();
      
      const now = Date.now();
      
      if (isTransitioning || now - lastScrollTime.current < 900) return;
      
      if (e.deltaY > 25) { // Scrolling down
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
      } else if (e.deltaY < -25) { // Scrolling up
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
    
    // Desktop touch events
    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientY; // Using Y for vertical scroll on desktop
    };
    
    const touchThreshold = 50;
    
    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartX.current - touchEndY;
      
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
    
    // Only add these event listeners for desktop
    if (!isMobile) {
      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchend', handleTouchEnd, { passive: false });
    }
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollEnabled, activeIndex, hasCompletedViewing, isTransitioning, isMobile]);

  // Determine actual direction for animations
  const getAnimationDirection = () => {
    if (direction !== 0) return direction;
    if (activeIndex > previousIndex.current) return 1;
    if (activeIndex < previousIndex.current) return -1;
    return 1;
  };

  const animDirection = getAnimationDirection();

  // Scroll to active project when index changes in mobile view
  useEffect(() => {
    if (!isMobile || !scrollContainerRef.current) return;
    
    const scrollContainer = scrollContainerRef.current;
    const containerWidth = scrollContainer.clientWidth;
    const imageWidth = containerWidth * 0.9; // Each image takes 90% of the width
    
    scrollContainer.scrollTo({
      left: activeIndex * imageWidth,
      behavior: 'smooth'
    });
  }, [activeIndex, isMobile]);

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
            className="text-lg max-w-md mb-12"
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
                y: isMobile ? 0 : (animDirection > 0 ? 60 : -60),
                x: isMobile ? (animDirection > 0 ? 60 : -60) : 0,
                opacity: 0 
              }}
              animate={{ 
                y: 0,
                x: 0,
                opacity: 1 
              }}
              exit={{ 
                y: isMobile ? 0 : (animDirection > 0 ? -60 : 60),
                x: isMobile ? (animDirection > 0 ? -60 : 60) : 0,
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
              <p className="text-lg mb-1">
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
      
      {/* Image Section - Mobile: Horizontally Scrollable, Desktop: Animated */}
      <div className="w-full md:w-3/5 flex justify-center items-center order-last md:order-first">
        {isMobile ? (
          // Mobile: Horizontal Scrolling Gallery
          <div 
            ref={scrollContainerRef}
            className="w-full overflow-x-scroll snap-x snap-mandatory flex flex-no-wrap hide-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {projects.map((project, index) => (
              <div 
                key={index}
                className="snap-center flex-shrink-0 h-96 w-[90%] relative mx-1"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover p-4"
                  priority={index === 0}
                  quality={90}
                />
                {/* Add visual indicator that there are more images */}
                {index < projects.length - 1 && (
                  <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-r from-transparent to-black/20" />
                )}
              </div>
            ))}
          </div>
        ) : (
          // Desktop: Animated Image Stack
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
        )}
      </div>
    
      {/* Scroll Indicator - Only shown when scrolling is enabled and not on mobile */}
      {!isMobile && (
        <motion.div 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: scrollEnabled && !hasCompletedViewing ? 1 : 0,
          }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center">
            <p className="text-sm mb-2 text-center px-4">
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
      )}
      
      {/* Mobile Swipe Indicator - Only shown on mobile */}
      {isMobile && (
        <motion.div 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center">
            <p className="text-sm mb-2 text-center px-4">
              Swipe to explore projects
            </p>
            <motion.div 
              animate={{ x: [-10, 10, -10] }}
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
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      )}
      
      {/* Custom CSS for hiding scrollbar */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}