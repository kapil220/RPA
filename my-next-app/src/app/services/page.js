"use client"

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Services() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const cardRefs = useRef([]);
  
  const services = [
    {
      id: 1,
      title: "Web Development",
      description: "Custom websites built with cutting-edge technologies that deliver exceptional user experiences tailored to your business needs.",
      icon: "💻",
      image: "/images/portfolio/5.jpg",
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications that bring your ideas to life on iOS and Android platforms.",
      icon: "📱",
      image: "/images/portfolio/5.jpg",
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "User-centered design solutions that enhance usability and create visually appealing interfaces that engage your audience.",
      icon: "🎨",
      image: "/images/portfolio/5.jpg",
    },
    {
      id: 4,
      title: "Digital Marketing",
      description: "Strategic marketing campaigns to increase your online presence and reach your target audience effectively.",
      icon: "📈",
      image: "/images/portfolio/5.jpg",
    }
  ];

  // Initialize refs array
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, services.length);
  }, [services.length]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    const initAnimations = () => {
      // Set initial states - important for proper stacking
      cardRefs.current.forEach((card, i) => {
        // Key change: Higher index cards get HIGHER z-index so they stack on top
        const zIndex = i + 1; // First card has z-index 1, second has 2, etc.
        gsap.set(card, { 
          zIndex,
          y: i === 0 ? 0 : "120%", // Start from above
          opacity: i === 0 ? 1 : 0,
          scale: 1
        });
      });
      
      // Create the timeline
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 20%", 
          end: `+=${services.length * 300}`, // Adjust for scroll distance
          scrub: 0.8, // Smooth scrubbing effect
          pin: sectionRef.current,
          pinSpacing: true,
          markers: false // Set to true for debugging
        }
      });
      
      // Add animations for each card except the first one
      for (let i = 1; i < services.length; i++) {
        // Each card moves down to position when revealed
        timeline.to(cardRefs.current[i], {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 1
        });
      }
    };
    
    // Wait a bit to ensure all DOM elements are ready
    const timer = setTimeout(initAnimations, 300);
    
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="h-screen w-full relative">
        <div className="relative w-full h-full">
          <Image
            src="/images/Hero.jpg"
            alt="Portfolio Hero Image"
            fill
            priority
            className="object-cover z-0"
          />
          <div className="absolute inset-0 z-5 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
          <div className="absolute bottom-20 left-20 z-10 text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Crafting Digital Experiences</h2>
            <p className="text-xl max-w-xl">
              From concept to completion, we build solutions that inspire and perform
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={sectionRef} className="py-20 ">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">What We Offer</h2>
          
          {/* Trigger element - helps with scroll positioning */}
          <div ref={triggerRef} className="h-4"></div>
          
          <div className="relative h-[500px]">
            {/* Important: Reverse the rendering order so first card is at the bottom visually */}
            {[...services].map((service, index) => (
              <div
                key={service.id}
                ref={el => (cardRefs.current[index] = el)}
                className="absolute top-0 left-0 right-0 w-full bg-zinc-900/70
                  border border-white/10 rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row backdrop-blur-sm"
                style={{
                  height: "400px",
                  visibility: "visible",
                  backfaceVisibility: "hidden",
                  transformOrigin: "center center",
                  // Starting position handled by GSAP
                }}
              >
                {/* Content Side */}
                <div className="w-full md:w-1/2 p-8 flex items-start gap-4">
                  <div className="text-5xl text-indigo-300">{service.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                    <p className="text-lg text-gray-200">{service.description}</p>
                  </div>
                </div>
                {/* Image Side */}
                <div className="w-full md:w-1/2 relative h-72 md:h-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/40 to-transparent z-10"></div>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Get Started?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-gray-300">
            Contact us today to discuss how our services can help you achieve your business goals.
          </p>
          <button className="px-8 py-3 font-bold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}