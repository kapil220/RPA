'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function ArchitecturalDesignPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [scrollLocked, setScrollLocked] = useState(false);
  const [sectionInView, setSectionInView] = useState(false);
  
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
  }, []);

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

  // Scroll tracking with improved performance
  const { scrollY } = useScroll({
    smooth: 16, // Smooth the scroll input for better performance
  });
  
  // Enhanced scroll handler with improved navigation and touch response
  const handleScroll = (e) => {
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
      // Adjust sensitivity based on device performance detection
      const isMobile = window.innerWidth <= 768;
      const sensitivity = isMobile ? 
        (delta < 0 ? 0.004 : 0.003) : // Higher sensitivity for mobile
        (delta < 0 ? 0.003 : 0.002);  // Standard sensitivity for desktop
        
      const newProgress = Math.min(Math.max(currentProgress + (delta * sensitivity), 0), 1);
      animationProgress.set(newProgress);
      
      // Mark animation as complete when we reach the end
      if (newProgress >= 0.98 && !animationComplete && scrollDirectionRef.current > 0) {
        setAnimationComplete(true);
        setScrollLocked(false);
      }
    });
  };
  
  // Track when animation completes or reverses
  useEffect(() => {
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
  }, [smoothProgress, animationComplete]);
  
  // Enhanced section detection and scroll position management
  useEffect(() => {
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
  }, [scrollLocked, animationComplete, sectionInView]);
  
  // Optimized wheel event listener with better performance
  useEffect(() => {
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
  }, [scrollLocked, animationComplete, sectionInView]);
  
  // Enhanced touch support with better performance and sensitivity for mobile
  useEffect(() => {
    const sectionElement = sectionRef.current;
    let touchStartY = 0;
    let lastTouchTime = 0;
    let lastTouchY = 0;
    let touchVelocity = 0;
    let lastTouchTimeStamp = 0;
    
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      lastTouchY = touchStartY;
      lastTouchTime = performance.now();
      lastTouchTimeStamp = e.timeStamp;
      touchVelocity = 0;
    };
    
    const handleTouchMove = (e) => {
      // Don't handle touch events if section isn't properly in view
      if (!sectionInView) return;
      
      const currentProgress = animationProgress.get();
      const touchY = e.touches[0].clientY;
      const deltaY = lastTouchY - touchY; // Positive when scrolling down, negative when scrolling up
      
      // Calculate velocity for more responsive touch handling
      const now = e.timeStamp;
      const timeDelta = now - lastTouchTimeStamp;
      if (timeDelta > 0) {
        // Smooth out velocity calculation
        const instantVelocity = deltaY / timeDelta;
        touchVelocity = touchVelocity * 0.7 + instantVelocity * 0.3; // Weighted average
      }
      lastTouchTimeStamp = now;
      
      // Critical fix: Allow normal scrolling up if at the beginning of animation
      if (currentProgress <= 0.01 && deltaY < 0) {
        // Let default browser behavior handle the scroll
        return;
      }
      
      // Allow normal scrolling down if animation is complete
      if (!scrollLocked && animationComplete && currentProgress >= 0.98 && deltaY > 0) {
        return;
      }
      
      // Always handle upward swipes for reverse animation when in the middle of animation
      if (currentProgress > 0.01 && currentProgress < 0.98) {
        // Allow re-entering animation when swiping up
        if (animationComplete && deltaY < 0) {
          setAnimationComplete(false);
          setScrollLocked(true);
        }
      }
      
      // Throttle touch events for better performance
      const now2 = performance.now();
      if (now2 - lastTouchTime < 16) return;
      lastTouchTime = now2;
      
      // Track direction
      scrollDirectionRef.current = deltaY > 0 ? 1 : -1;
      
      // Update animation progress with enhanced sensitivity for mobile
      requestAnimationFrame(() => {
        // Base sensitivity is higher on mobile for better responsiveness
        const baseSensitivity = deltaY < 0 ? 0.006 : 0.004;
        
        // Apply velocity factor for more responsive feel (but cap it to avoid jumps)
        const velocityFactor = Math.min(Math.abs(touchVelocity) * 10, 2);
        const sensitivity = baseSensitivity * (1 + velocityFactor);
        
        const newProgress = Math.min(Math.max(currentProgress + (deltaY * sensitivity), 0), 1);
        animationProgress.set(newProgress);
        
        // Mark animation as complete when we reach the end
        if (newProgress >= 0.98 && !animationComplete && scrollDirectionRef.current > 0) {
          setAnimationComplete(true);
          setScrollLocked(false);
        }
        
        // Handle reverse animation - more responsive to upward swipes
        if (deltaY < 0 && currentProgress < 1 && currentProgress > 0.01) {
          if (animationComplete && newProgress < 0.98) {
            setAnimationComplete(false);
            setScrollLocked(true);
          }
        }
      });
      
      lastTouchY = touchY;
      
      // Prevent default during animation, except at boundaries
      if ((currentProgress > 0.01 || deltaY > 0) && 
          (!animationComplete || currentProgress < 0.98 || deltaY < 0)) {
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
  }, [scrollLocked, animationComplete, sectionInView]);
  
// Replace the transform definitions with these:
const imageWidth = useTransform(smoothProgress, value => `${100 - (value * 40)}%`);
const imageLeft = useTransform(smoothProgress, value => `${value * 40}%`);
const imageHeight = useTransform(smoothProgress, value => `${100 - (value * 30)}%`);
const imageTop = useTransform(smoothProgress, value => `${value * 15}%`);
const textX = useTransform(smoothProgress, value => `${(value - 1) * 100}%`);
const textOpacity = useTransform(smoothProgress, [0, 0.3, 1], [0, 0.8, 1]);
const overlayOpacity = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.3, 0]);

  return (
    <section id="architectural-design" className="min-h-screen bg-stone-900" ref={sectionRef}>
      {/* Loading indicator */}
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
                  src="/images/services/1.jpg" 
                  alt="Architectural Design" 
                  className="w-full h-full object-cover"
                />
                
                {/* Image overlay */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center bg-opacity-30"
                  style={{ opacity: overlayOpacity }}
                >
                  <div className="text-stone-900 text-center">
                    <h1 className="text-6xl font-bold mb-4">
                      Architectural Design
                    </h1>
                    <motion.div
                      style={{ opacity: useTransform(smoothProgress, p => p < 0.1 ? 1 : 0) }}
                    >
                      <p className="text-lg mt-2">
                        Scroll to explore
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Navigation indicators with dynamic visibility */}
        <motion.div 
          className="absolute bottom-8 right-8 flex items-center z-20 text-white transition-opacity"
          style={{ opacity: useTransform(smoothProgress, [0, 0.1, 1], [0, 0.7, 0.7]) }}
        >
          <motion.button 
            onClick={() => {
              const currentProgress = animationProgress.get();
              const newProgress = Math.max(currentProgress - 0.25, 0);
              animationProgress.set(newProgress);
              
              // Always reset animation state when manually reversing
              if (animationComplete) {
                setAnimationComplete(false);
                setScrollLocked(true);
              }
              
              // Set scroll direction for consistent behavior
              scrollDirectionRef.current = -1;
            }}
            className="mr-4 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all"
            aria-label="Reverse animation"
            style={{ opacity: useTransform(smoothProgress, p => p > 0.1 ? 1 : 0) }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
            </svg>
          </motion.button>
          
          <motion.button 
            onClick={() => {
              const currentProgress = animationProgress.get();
              const newProgress = Math.min(currentProgress + 0.25, 1);
              animationProgress.set(newProgress);
              
              // Complete animation if reaching the end
              if (newProgress >= 0.98 && !animationComplete) {
                setAnimationComplete(true);
                setScrollLocked(false);
              }
              
              // Set scroll direction for consistent behavior
              scrollDirectionRef.current = 1;
            }}
            className="p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all"
            aria-label="Advance animation"
            style={{ opacity: useTransform(smoothProgress, p => p < 0.98 ? 1 : 0) }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </motion.button>
        </motion.div>
        
        {/* Visual indicator when section is in view */}
        {sectionInView && (
          <div className="fixed bottom-4 left-4 w-3 h-3 rounded-full bg-white opacity-50 z-30 animate-pulse" />
        )}
      </div>
    </section>
  );
}