'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function ArchitecturalDesignPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [scrollLocked, setScrollLocked] = useState(false);
  const [sectionInView, setSectionInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // New state for tracking which card is active
  const [activeCard, setActiveCard] = useState(0); // Default first card is open
  
  const contentRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollStartPositionRef = useRef(0);
  const previousScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const scrollDirectionRef = useRef(0); // Track scroll direction: 1 for down, -1 for up
  
  // Use motion value for smoother animations
  const animationProgress = useMotionValue(0);
  
  // Apply spring physics with optimized values for smoother animation
  const smoothProgress = useSpring(animationProgress, {
    stiffness: 60,  // Reduced from 100 for smoother animation
    damping: 20,    // Reduced from 30 for smoother animation
    restDelta: 0.0005  // More precise stop point
  });
  
  // Scroll tracking with improved performance
  const { scrollY } = useScroll({
    smooth: 16, // Smooth the scroll input for better performance
  });
  
  // Transform definitions for desktop animation - ALWAYS create these hooks regardless of isMobile
  const imageWidth = useTransform(smoothProgress, value => `${100 - (value * 40)}%`);
  const imageLeft = useTransform(smoothProgress, value => `${value * 40}%`);
  const imageHeight = useTransform(smoothProgress, value => `${100 - (value * 30)}%`);
  const imageTop = useTransform(smoothProgress, value => `${value * 15}%`);
  const textX = useTransform(smoothProgress, value => `${(value - 1) * 100}%`);
  const textOpacity = useTransform(smoothProgress, [0, 0.3, 1], [0, 0.8, 1]);
  const overlayOpacity = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.3, 0]);
  
  // Need to move these hooks outside of JSX as well
  const scrollPromptOpacity = useTransform(smoothProgress, p => p < 0.1 ? 1 : 0);
  const navControlsOpacity = useTransform(smoothProgress, [0, 0.1, 1], [0, 0.7, 0.7]);
  const backButtonOpacity = useTransform(smoothProgress, p => p > 0.1 ? 1 : 0);
  const forwardButtonOpacity = useTransform(smoothProgress, p => p < 0.98 ? 1 : 0);
  
  // Page load animation
  useEffect(() => {
    // Preload the main image
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
    
    // Check if mobile on initial load
    checkIfMobile();
    
    // Set up resize listener to detect mobile/desktop
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Function to check if current viewport is mobile
  const checkIfMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  // Enhanced Intersection Observer to properly detect when section is fully in view
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        // Only set section in view when it's fully visible or nearly fully visible (80%+)
        if (entry.isIntersecting && entry.intersectionRatio > 0.8) {
          setSectionInView(true);
        } else {
          setSectionInView(false);
          
          // Reset animation when scrolling away from the section
          if (!entry.isIntersecting && animationProgress.get() > 0 && animationProgress.get() < 0.1) {
            animationProgress.set(0);
          }
        }
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: [0, 0.1, 0.5, 0.8, 1.0] // Multiple thresholds for more precise tracking
      }
    );
    
    observer.observe(sectionRef.current);
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Enhanced scroll handler with improved navigation and touch response - Only for desktop
  const handleScroll = (e) => {
    // Skip animation handling entirely if on mobile
    if (isMobile) return;
    
    // Don't handle scroll if section isn't properly in view
    if (!sectionInView) return;
    
    // Get current progress value
    const currentProgress = animationProgress.get();
    
    // Critical fix: Allow normal scrolling when at beginning of animation and scrolling up
    if (currentProgress <= 0.01 && e.deltaY < 0) {
      // Allow normal scroll behavior to navigate up the page
      return;
    }
    
    // Allow normal scrolling when animation is complete and scrolling down
    if (!scrollLocked && animationComplete && currentProgress >= 0.99 && e.deltaY > 0) {
      return;
    }
    
    e.preventDefault();
    e.stopPropagation();
    
    // Get current time to throttle
    const now = performance.now();
    if (now - lastScrollTimeRef.current < 16) { // ~60fps
      return;
    }
    lastScrollTimeRef.current = now;
    
    // Calculate delta from wheel event
    const delta = e.deltaY;
    
    // Track scroll direction explicitly
    scrollDirectionRef.current = delta > 0 ? 1 : -1;
    
    // Special case for reverse animation - respond to upward scrolls when not at the top
    if (delta < 0 && currentProgress > 0) {
      // If animation was complete but user is scrolling back up
      if (currentProgress >= 0.98 && animationComplete) {
        setAnimationComplete(false);
        setScrollLocked(true);
      }
    }
    
    // Use requestAnimationFrame for smoother visual updates
    requestAnimationFrame(() => {
      // Update animation progress based on wheel delta with improved sensitivity
      const sensitivity = delta < 0 ? 0.003 : 0.002;  // Standard sensitivity for desktop
        
      const newProgress = Math.min(Math.max(currentProgress + (delta * sensitivity), 0), 1);
      animationProgress.set(newProgress);
      
      // Mark animation as complete when we reach the end
      if (newProgress >= 0.98 && !animationComplete && scrollDirectionRef.current > 0) {
        setAnimationComplete(true);
        setScrollLocked(false);
      }
    });
  };
  
  // Track when animation completes or reverses - Only for desktop
  useEffect(() => {
    // Skip for mobile
    if (isMobile) return;
    
    const unsubscribe = smoothProgress.onChange(value => {
      if (value >= 0.98 && !animationComplete && scrollDirectionRef.current > 0) {
        setAnimationComplete(true);
        setScrollLocked(false);
      }
      
      // Handle animation reversal
      if (value < 0.98 && animationComplete) {
        setAnimationComplete(false);
        setScrollLocked(true);
      }
    });
    
    return () => unsubscribe();
  }, [smoothProgress, animationComplete, isMobile]);
  
  // Enhanced section detection and scroll position management - Only for desktop
  useEffect(() => {
    // Skip for mobile
    if (isMobile) return;
    
    const handleScrollY = () => {
      if (!sectionRef.current || !sectionInView) return;
      
      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const sectionBottom = sectionTop + sectionRef.current.offsetHeight;
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Check if section is fully in viewport
      const isFullyInView = 
        sectionTop <= currentScrollY + viewportHeight * 0.1 && // Section top is above 10% of viewport
        sectionBottom >= currentScrollY + viewportHeight * 0.9; // Section bottom is below 90% of viewport
        
      // Start tracking scroll when user enters section
      if (isFullyInView && !scrollLocked && animationProgress.get() < 1) {
        scrollStartPositionRef.current = currentScrollY;
        previousScrollYRef.current = currentScrollY;
        setScrollLocked(true);
      }
      
      // When animation is complete, allow normal scrolling
      if (animationComplete && scrollDirectionRef.current > 0) return;
      
      // IMPORTANT: Don't lock scrolling if we're at the beginning and trying to scroll up
      if (animationProgress.get() <= 0.01 && 
          previousScrollYRef.current > currentScrollY &&
          currentScrollY < sectionTop) {
        setScrollLocked(false);
        return;
      }
      
      // If we're locked and user is scrolling within the section, update animation progress
      if ((scrollLocked || animationProgress.get() > 0) && isFullyInView) {
        const scrollDelta = currentScrollY - previousScrollYRef.current;
        
        // Use a more adaptive scroll range based on viewport size
        const maxScrollForAnimation = Math.min(viewportHeight * 0.5, 300); // Either 50% of viewport or 300px, whichever is smaller
        
        // Track scroll direction
        scrollDirectionRef.current = scrollDelta > 0 ? 1 : -1;
        
        // Calculate new progress with bidirectional support and adaptive sensitivity
        const progress = animationProgress.get() + (scrollDelta / maxScrollForAnimation);
        const clampedProgress = Math.min(Math.max(progress, 0), 1);
        
        requestAnimationFrame(() => {
          animationProgress.set(clampedProgress);
        });
        
        previousScrollYRef.current = currentScrollY;
        
        // Keep the user at the section during animation, unless we're at the very start
        if ((clampedProgress < 0.98 || scrollDirectionRef.current < 0) && clampedProgress > 0.01) {
          window.scrollTo({ top: sectionTop, behavior: 'auto' });
        }
        
        // Crucial for reverse animation: if we were complete but now we're scrolling back
        if (scrollDelta < 0 && animationComplete && clampedProgress < 0.98) {
          setAnimationComplete(false);
          setScrollLocked(true);
        }
      }
    };
    
    // Optimized scroll handler with RAF for smoother performance
    const optimizedScrollHandler = () => {
      requestAnimationFrame(handleScrollY);
    };
    
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', optimizedScrollHandler);
    };
  }, [scrollLocked, animationComplete, sectionInView, isMobile]);
  
  // Optimized wheel event listener with better performance - Only for desktop
  useEffect(() => {
    // Skip for mobile
    if (isMobile) return;
    
    const sectionElement = sectionRef.current;
    
    if (sectionElement) {
      const wheelHandler = (e) => {
        // Only handle wheel events when section is fully in view
        if (!sectionInView) return;
        
        // Get current progress value
        const currentProgress = animationProgress.get();
        
        // If at the very beginning and scrolling up, let normal scrolling take over
        if (currentProgress <= 0.01 && e.deltaY < 0) {
          return;
        }
        
        // Handle animation-related scrolling
        if (currentProgress > 0 || e.deltaY > 0 || (!animationComplete && scrollLocked)) {
          handleScroll(e);
        }
      };
      
      // Use passive: false to enable preventDefault in the handler
      sectionElement.addEventListener('wheel', wheelHandler, { passive: false });
      
      return () => {
        sectionElement.removeEventListener('wheel', wheelHandler);
      };
    }
  }, [scrollLocked, animationComplete, sectionInView, isMobile]);

  // Card data for our new expandable card system
  const cardData = [
    {
      id: 0,
      title: "Our Approach",
      content: "We believe in collaborative design processes that integrate client vision, site context, and sustainable practices. Our architecture responds to the environment while creating memorable spaces."
    },
    {
      id: 1,
      title: "Services Include",
      content: [
        "Conceptual Design & Feasibility Studies",
        "Schematic Design & Development",
        "Construction Documentation",
        "Construction Administration"
      ]
    },
    {
      id: 2,
      title: "Project Specialties",
      content: "We specialize in residential, commercial, and institutional architecture with a focus on sustainable design principles and innovative use of materials."
    }
  ];

  return (
    <section id="architectural-design" className="min-h-screen " ref={sectionRef}>
      {/* Loading indicator */}
      {!isLoaded && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 "></div>
            <p className=" mt-4 font-medium">Loading...</p>
          </div>
        </div>
      )}
      
      {/* Mobile Layout - Static image above, text below */}
      {isMobile && (
        <div className="flex flex-col w-full">
          <div className='px-8 pt-8'>
          <h2>
            Urban Planning
          </h2>
          </div>
          
          {/* Image section at top */}
          <div className="w-full h-128 md:h-72 overflow-hidden relative px-4 -bottom-10">
            <img 
              src="/images/services/3.jpg" 
              alt="Architectural Design" 
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 px-2 bg-opacity-30 flex items-center justify-center">
              
            </div>
          </div>
          
          {/* Text content below - MODIFIED FOR CARDS */}
          <div className="p-6 bg-zinc-900/40 mx-4
                  border border-white/10 rounded-xl shadow-xl overflow-hidden backdrop-blur-lg">
            <p className="text-lg  mb-2">
              From concept to completion, we create innovative architectural designs that balance form, function, and context.
            </p>
            
            {/* Expandable Cards Section */}
            <div className="space-y-3 mb-4 
                   rounded-xl shadow-xl overflow-hidden backdrop-blur-lg"
                   style={{ backgroundColor: 'rgba(31, 26, 23, 0.8)' }}>
              {cardData.map((card, index) => (
                <div 
                  key={card.id}
                  className={` rounded-md overflow-hidden transition-all duration-300 ${activeCard === index ? 'bg-zinc-800' : 'bg-zinc-800'}`}
                >
                  <div 
                    className={`px-4 py-3 flex justify-between items-center cursor-pointer ${activeCard === index ? 'bg-zinc-800' : 'hover:bg-zinc-800'}`}
                    onClick={() => setActiveCard(index)}
                  >
                    <h4 className="text-xl font-semibold  text-zinc-200">{card.title}</h4>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                      className={`w-5 h-5 transition-transform ${activeCard === index ? 'rotate-180' : ''}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                  
                  {/* Card Content - Expanded when active */}
                  <div 
                    className={`px-4 overflow-hidden transition-all duration-300 ${
                      activeCard === index ? 'max-h-96 py-4' : 'max-h-0 py-0'
                    }`}
                  >
                    {Array.isArray(card.content) ? (
                      <ul className="space-y-2 text-zinc-300">
                        {card.content.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-white mt-1">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="">{card.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            
          </div>
        </div>
      )}
      
      {/* Desktop Layout - Animated with scroll effect */}
      {!isMobile && (
        <div className="h-screen w-full sticky top-0" ref={contentRef}>
          <div className="absolute inset-0">
            <div className="flex h-full">
              {/* Text panel */}
              <motion.div 
                className="absolute left-0 top-0 w-full md:w-2/5 h-full  z-10"
                style={{ 
                  x: textX,
                  opacity: textOpacity
                }}
              >
                <div className="h-full p-8 md:p-12 flex flex-col justify-center">
                  <h1 className="text-4xl font-bold mb-4 text-zinc-100">Urban planning </h1>
                  <p className="text-lg text-zinc-300 mb-8">
                    From concept to completion, we create innovative architectural designs that balance form, function, and context.
                  </p>
                  
                  {/* MODIFIED: Expandable Cards for Desktop */}
                  <div className="space-y-3 mb-8  
                   rounded-xl shadow-xl overflow-hidden backdrop-blur-lg">
              {cardData.map((card, index) => (
                <div 
                  key={card.id}
                  className={` rounded-md overflow-hidden transition-all duration-300 ${activeCard === index ? 'bg-zinc-800' : 'bg-zinc-800'}`}
                >
                  <div 
                    className={`px-4 py-3 flex justify-between items-center cursor-pointer ${activeCard === index ? 'bg-zinc-800' : 'hover:bg-zinc-800'}`}
                    
                    onClick={() => setActiveCard(index)}
                  >
                    <h4 className="text-xl font-semibold text-zinc-200">{card.title}</h4>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                      className={`w-5 h-5 transition-transform ${activeCard === index ? 'rotate-180' : ''}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                  
                  {/* Card Content - Expanded when active */}
                  <div 
                    className={`px-4 overflow-hidden transition-all duration-300 ${
                      activeCard === index ? 'max-h-96 py-4' : 'max-h-0 py-0'
                    }`}
                  >
                    {Array.isArray(card.content) ? (
                      <ul className="space-y-2 text-zinc-300">
                        {card.content.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-white mt-1">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-zinc-300">{card.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
                  
                  
                </div>
              </motion.div>
              
              {/* Image - Full screen initially, then shifts right */}
              <div className="absolute inset-0 h-full overflow-hidden will-change-transform">
                <motion.div 
                  className="absolute inset-0 h-full will-change-transform"
                  style={{ 
                    width: imageWidth,
                    left: imageLeft,
                    height: imageHeight,
                    top: imageTop
                  }}
                >
                  {/* Show image immediately regardless of loading state */}
                  <img 
                    src="/images/services/3.jpg" 
                    alt="Architectural Design" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Image overlay */}
                  {/* <motion.div 
                    className="absolute inset-0 flex items-center justify-center bg-opacity-30"
                    style={{ opacity: overlayOpacity }}
                  >
                     <div className="text-stone-900 text-center">
                      <h1 className="text-6xl font-bold mb-4">
                        Architectural Design
                      </h1>
                      <motion.div
                        style={{ opacity: scrollPromptOpacity }}
                      >
                        <p className="text-lg mt-2">
                          Scroll to explore
                        </p>
                      </motion.div>
                    </div> 
                  </motion.div> */}
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Navigation indicators with dynamic visibility */}
        
          
          {/* Visual indicator when section is in view */}
          {sectionInView && (
            <div className="fixed bottom-4 left-4 w-3 h-3 rounded-full bg-white opacity-50 z-30 animate-pulse" />
          )}
        </div>
      )}
    </section>
  );
}