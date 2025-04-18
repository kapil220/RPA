"use client"

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Services() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const cardElements = useRef([]);
  
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
      image:  "/images/portfolio/5.jpg",// Add your image path
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "User-centered design solutions that enhance usability and create visually appealing interfaces that engage your audience.",
      icon: "🎨",
      image:  "/images/portfolio/5.jpg", // Add your image path
    },
    {
      id: 4,
      title: "Digital Marketing",
      description: "Strategic marketing campaigns to increase your online presence and reach your target audience effectively.",
      icon: "📈",
      image:  "/images/portfolio/5.jpg", // Add your image path
    }
  ];

  useEffect(() => {
    // Initialize refs array
    cardElements.current = cardElements.current.slice(0, services.length);
    
    // Register GSAP plugins
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Make sure all elements are rendered
      setTimeout(() => {
        const cards = cardElements.current;
        if (!cards || !cards.length || !sectionRef.current) return;
        
        // Set initial styles for cards
        gsap.set(cards.slice(1), { y: "100%", opacity: 0 });
        
        // Create ScrollTrigger for each card (except first)
        cards.forEach((card, index) => {
          if (index === 0) return; // Skip first card
          
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: `top+=${index * 200} center`, // Adjust trigger points for each card
            end: `top+=${(index + 1) * 200} center`,
            onEnter: () => {
              // Set z-index higher than previous cards before animating
              gsap.set(card, { zIndex: index + 10 });
              gsap.to(card, { 
                y: `${index * 30}px`, 
                opacity: 1, 
                duration: 0.5,
                ease: "power2.out"
              });
            },
            onLeaveBack: () => {
              gsap.to(card, { 
                y: "100%", 
                opacity: 0, 
                duration: 0.5,
                ease: "power2.in"
              });
            }
          });
        });
      }, 100);
      
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, [services.length]);

  return (
    <div className="overflow-x-hidden">
      {/* Heading Section First */}
      <section className="py-32 text-center bg-zinc-900 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">Our Services</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover how we can transform your business with our premium services
          </p>
        </div>
      </section>

      {/* Full Screen Image Section */}
      <section className="h-screen w-full relative">
        <div className="relative w-full h-full">
          <Image
            src="/images/Hero.jpg" // Replace with your actual image path
            alt="Services Hero Image"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* Services Section with Stacking Cards */}
      <section ref={sectionRef} className="pt-20 pb-0 bg-zinc-900 h-auto">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">What We Offer</h2>
            <div ref={cardsRef} className="relative h-[800px] mb-0">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  ref={el => cardElements.current[index] = el}
                  className="absolute top-0 left-0 w-full bg-black text-zinc-100
border border-zinc-700
 shadow-black/20
 shadow-xl overflow-hidden flex flex-col md:flex-row"
                  style={{ 
                    zIndex: index === 0 ? 10 : 1, // Initial z-index (will be updated by GSAP)
                    transform: index === 0 ? 'translateY(0)' : 'translateY(100%)',
                    opacity: index === 0 ? 1 : 0,
                    height: "400px" // Set explicit height for cards
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
      <section className="py-16 text-white bg-zinc-900">
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