'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

export default function ArchitecturalDesignPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollLocked, setScrollLocked] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  const contentRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollStartPositionRef = useRef(0);
  const previousScrollYRef = useRef(0);
  
  // Page load animation - pre-set isLoaded to true to show image immediately
  useEffect(() => {
    setIsLoaded(true); // Start with showing the image
    
    const preloadImage = async () => {
      try {
        const img = new Image();
        img.src = '/images/services/1.jpg';
        img.onload = () => setIsLoaded(true);
        img.onerror = () => setIsLoaded(true);
      } catch (error) {
        console.error('Failed to preload image:', error);
        setIsLoaded(true);
      }
    };
    
    preloadImage();
  }, []);

  // Scroll tracking
  const { scrollY } = useScroll();
  
  // Custom scroll handler with bidirectional support
  const handleScroll = (e) => {
    if (!scrollLocked && animationComplete && animationProgress >= 1) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    // Calculate delta from wheel event (negative for up, positive for down)
    const delta = e.deltaY;
    
    // Update animation progress based on wheel delta
    const newProgress = Math.min(Math.max(animationProgress + (delta * 0.003), 0), 1);
    setAnimationProgress(newProgress);
    
    // Mark animation as complete when we reach 1
    if (newProgress >= 1 && !animationComplete) {
      setAnimationComplete(true);
      setScrollLocked(false);
    }
    
    // Handle reverse scrolling - allow animation to go back when scrolling up
    if (delta < 0 && animationProgress < 1) {
      // Keep scroll locked during reverse animation
      if (animationComplete) {
        setAnimationComplete(false);
        setScrollLocked(true);
      }
    }
  };
  
  // Detect when user enters this section
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Get section position
    const sectionTop = sectionRef.current?.getBoundingClientRect().top + window.scrollY || 0;
    const sectionBottom = sectionTop + (sectionRef.current?.offsetHeight || 0);
    
    const isInSection = latest >= sectionTop && latest < sectionBottom;
    
    // Start tracking scroll when user enters section
    if (isInSection && !scrollLocked && animationProgress < 1) {
      scrollStartPositionRef.current = latest;
      previousScrollYRef.current = latest;
      setScrollLocked(true);
    }
    
    // When animation is complete, allow normal scrolling
    if (animationComplete) return;
    
    // If we're locked and user is scrolling, update animation progress
    if (scrollLocked) {
      const scrollDelta = latest - previousScrollYRef.current;
      const maxScrollForAnimation = 150; // Amount of scroll needed to complete animation
      
      // Calculate new progress - allows for bidirectional movement
      const progress = animationProgress + (scrollDelta / maxScrollForAnimation);
      const clampedProgress = Math.min(Math.max(progress, 0), 1);
      
      setAnimationProgress(clampedProgress);
      previousScrollYRef.current = latest;
      
      // Keep the user at the section while animating
      if (clampedProgress < 1) {
        window.scrollTo(0, sectionTop);
      }
      
      // Mark animation as complete when we reach 1
      if (clampedProgress >= 1 && !animationComplete) {
        setAnimationComplete(true);
        setScrollLocked(false);
      }
      
      // For reverse scrolling - if we were complete but now we're scrolling back
      if (scrollDelta < 0 && animationComplete && clampedProgress < 1) {
        setAnimationComplete(false);
        setScrollLocked(true);
      }
    }
  });
  
  // Add wheel event listener to capture scroll events
  useEffect(() => {
    const sectionElement = sectionRef.current;
    
    if (sectionElement) {
      const scrollHandler = (e) => {
        // Only handle scroll if we're in the section or animation is partially complete
        if (animationProgress > 0 || (!animationComplete && scrollLocked)) {
          handleScroll(e);
        }
      };
      
      sectionElement.addEventListener('wheel', scrollHandler, { passive: false });
      
      return () => {
        sectionElement.removeEventListener('wheel', scrollHandler);
      };
    }
  }, [scrollLocked, animationComplete, animationProgress]);
  
  // Touch support for mobile
  useEffect(() => {
    const sectionElement = sectionRef.current;
    let touchStartY = 0;
    
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e) => {
      if (!scrollLocked && animationComplete && animationProgress >= 1) return;
      
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY; // Positive when scrolling down, negative when scrolling up
      
      // Update animation progress based on touch movement
      const newProgress = Math.min(Math.max(animationProgress + (deltaY * 0.003), 0), 1);
      setAnimationProgress(newProgress);
      
      // Mark animation as complete when we reach 1
      if (newProgress >= 1 && !animationComplete) {
        setAnimationComplete(true);
        setScrollLocked(false);
      }
      
      // Handle reverse scrolling - allow animation to go back when scrolling up
      if (deltaY < 0 && animationProgress < 1) {
        // Keep scroll locked during reverse animation
        if (animationComplete) {
          setAnimationComplete(false);
          setScrollLocked(true);
        }
      }
      
      touchStartY = touchY;
      
      // Prevent default only while animation is in progress
      if (!animationComplete || animationProgress < 1) {
        e.preventDefault();
      }
    };
    
    if (sectionElement) {
      sectionElement.addEventListener('touchstart', handleTouchStart, { passive: true });
      sectionElement.addEventListener('touchmove', handleTouchMove, { passive: false });
      
      return () => {
        sectionElement.removeEventListener('touchstart', handleTouchStart);
        sectionElement.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, [scrollLocked, animationComplete, animationProgress]);
  
  // Calculate transforms based on animation progress
  const imageWidth = useTransform(() => `${100 - (animationProgress * 40)}%`);
  const imageLeft = useTransform(() => `${animationProgress * 40}%`);
  const textX = useTransform(() => `${(animationProgress - 1) * 100}%`);
  const textOpacity = useTransform(() => animationProgress);
  const overlayOpacity = useTransform(() => 1 - animationProgress);

  return (
    <section id="architectural-design" className="min-h-screen bg-stone-900" ref={sectionRef}>
      {/* Loading indicator - only shows while image is loading and we're already trying to show it */}
      {!isLoaded && (
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-zinc-900">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            <p className="text-white mt-4 font-medium">Loading...</p>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="h-screen w-full sticky top-0" ref={contentRef}>
        <div className="absolute inset-0">
          <div className="flex h-full">
            {/* Text panel */}
            <motion.div 
              className="absolute left-0 top-0 w-full md:w-2/5 h-full bg-stone-900 z-10"
              style={{ 
                x: textX,
                opacity: textOpacity
              }}
            >
              <div className="h-full p-8 md:p-12 flex flex-col justify-center">
                <h1 className="text-4xl font-bold mb-4 text-zinc-100">Architectural Design</h1>
                <p className="text-lg text-zinc-300 mb-8">
                  From concept to completion, we create innovative architectural designs that balance form, function, and context.
                </p>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-zinc-200">Our Approach</h3>
                    <p className="text-zinc-300">
                      We believe in collaborative design processes that integrate client vision, site context, and sustainable practices. Our architecture responds to the environment while creating memorable spaces.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-zinc-200">Services Include</h3>
                    <ul className="space-y-2 text-zinc-300">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-white mt-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Conceptual Design & Feasibility Studies
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-white mt-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Schematic Design & Development
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-white mt-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Construction Documentation
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-white mt-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Construction Administration
                      </li>
                    </ul>
                  </div>
                </div>
                
                <button className="flex items-center text-zinc-900 bg-white hover:bg-zinc-100 px-6 py-3 rounded-md font-medium group transition-colors">
                  Contact Us
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </button>
              </div>
            </motion.div>
            
            {/* Image - Full screen initially, then shifts right */}
            <div className="absolute inset-0 h-full overflow-hidden">
              <motion.div 
                className="absolute inset-0 h-full"
                style={{ 
                  width: imageWidth,
                  left: imageLeft
                }}
              >
                {/* Show image immediately regardless of loading state */}
                <img 
                  src="/images/services/1.jpg" 
                  alt="Architectural Design" 
                  className="w-full h-full object-cover"
                />
                
                {/* Image overlay */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center  bg-opacity-30"
                  style={{ opacity: overlayOpacity }}
                >
                  <div className="text-stone-900 text-center">
                    <h1 className="text-6xl font-bold mb-4">
                      Architectural Design
                    </h1>
                    {!animationComplete && (
                      <div>
                        
                        <p className="text-sm mt-2">
                          {animationProgress > 0 ? "Scroll up to reverse" : ""}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Optional navigation indicators */}
        <div className="absolute bottom-8 right-8 flex items-center z-20 text-white opacity-30 hover:opacity-100 transition-opacity">
          {animationProgress > 0 && (
            <button 
              onClick={() => {
                const newProgress = Math.max(animationProgress - 0.25, 0);
                setAnimationProgress(newProgress);
                if (newProgress < 1 && animationComplete) {
                  setAnimationComplete(false);
                  setScrollLocked(true);
                }
              }}
              className="mr-4 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all"
              aria-label="Reverse animation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
              </svg>
            </button>
          )}
          
          {animationProgress < 1 && (
            <button 
              onClick={() => {
                const newProgress = Math.min(animationProgress + 0.25, 1);
                setAnimationProgress(newProgress);
                if (newProgress >= 1 && !animationComplete) {
                  setAnimationComplete(true);
                  setScrollLocked(false);
                }
              }}
              className="p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all"
              aria-label="Advance animation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}