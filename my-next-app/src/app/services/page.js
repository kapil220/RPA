"use client"

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Services() {
  const sectionRef = useRef(null);
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

  // Set up refs array
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, services.length);
  }, [services.length]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Make sure DOM is fully loaded
    const initAnimations = () => {
      // Position all cards initially
      gsap.set(cardRefs.current[0], { y: 0, opacity: 1 }); // First card visible
      
      // Hide other cards above (negative y value)
      cardRefs.current.slice(1).forEach((card) => {
        gsap.set(card, { y: "-100%", opacity: 0 });
      });
      
      // Create a single scroll-driven animation sequence
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
          end: "+=1200", // Adjust this value for scroll distance
          scrub: 1.2, // Smooth scrubbing with slight delay
          markers: false, // Set to true for debugging
          pin: true,
          anticipatePin: 1,
        }
      });
      
      // Add each card to the timeline sequentially (from top to bottom)
      // We reverse the order to have newer cards show above older ones
      for (let i = services.length - 1; i >= 1; i--) {
        const card = cardRefs.current[i];
        const offset = (services.length - i) * 30; // Stack offset
        
        timeline.to(card, {
          y: offset + "px", // Position each new card slightly below the previous one
          opacity: 1,
          ease: "power2.out",
          duration: 1.5, // Timeline duration
        });
      }
    };
    
    // Wait a bit to ensure all DOM elements are ready
    const timer = setTimeout(initAnimations, 200);
    
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
          <div className="absolute bottom-20 left-20 z-10 text-left text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Crafting Digital Experiences</h2>
            <p className="text-xl max-w-xl">
              From concept to completion, we build solutions that inspire and perform
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={sectionRef} className="bg-stone-900 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">What We Offer</h2>
          
          <div className="relative h-[500px]">
            {services.map((service, index) => (
              <div
                key={service.id}
                ref={el => (cardRefs.current[index] = el)}
                className="absolute top-0 left-0 right-0 w-full bg-black text-zinc-100 
                  border border-zinc-700 shadow-xl overflow-hidden flex flex-col md:flex-row"
                style={{
                  height: "400px",
                  // Critical: Higher index cards need higher z-index to appear on top
                  zIndex: index, // This makes later cards appear above earlier ones
                  visibility: "visible",
                  backfaceVisibility: "hidden",
                  transform: index === 0 ? "translateY(0)" : "translateY(-100%)", // Start above
                  opacity: index === 0 ? 1 : 0
                }}
              >
                {/* Content Side */}
                <div className="w-full md:w-1/2 p-8 flex items-start gap-4">
                  <div className="text-5xl">{service.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-gray-200 text-lg">{service.description}</p>
                  </div>
                </div>
                
                {/* Image Side */}
                <div className="w-full md:w-1/2 relative h-72 md:h-auto">
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
      <section className="py-16 text-white bg-stone-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Contact us today to discuss how our services can help you achieve your business goals.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition duration-300">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}