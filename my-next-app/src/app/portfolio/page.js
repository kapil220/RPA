"use client"

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/lib/data'; 

export default function Portfolio() {
  const sectionRef = useRef(null);
  const projectsRef = useRef(null);
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'interior', label: 'Interior Design' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'commercial', label: 'Commercial' }
  ];
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  useEffect(() => {
    // Register GSAP plugins
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Animate projects on page load
      const projectElements = document.querySelectorAll('.project-card');
      
      gsap.set(projectElements, { 
        y: 50,
        opacity: 0
      });
      
      gsap.to(projectElements, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top bottom-=100",
          end: "bottom center",
          toggleActions: "play none none none"
        }
      });
      
      // Clean up
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, [selectedCategory]); // Re-run when category changes

  return (
    <div className="overflow-x-hidden">
      {/* Heading Section */}
      <section className="py-32 text-center bg-zinc-900 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">Our Portfolio</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Explore our recent projects and discover how we bring ideas to life
          </p>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="h-screen w-full relative">
        <div className="relative w-full h-full">
          <Image
            src="/images/Hero.jpg" // Replace with your actual image path
            alt="Portfolio Hero Image"
            fill
            priority
            className="object-cover z-0"
          />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center text-white text-shadow-lg">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Crafting Digital Experiences</h2>
              <p className="text-xl max-w-2xl mx-auto">
                From concept to completion, we build solutions that inspire and perform
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Filter and Projects */}
      <section ref={sectionRef} className="py-20 bg-zinc-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-white text-blue-600'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          <div 
            ref={projectsRef} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map(project => (
                
              <Link 
                href={`/portfolio/${project.slug}`} 
                key={project.id}
                className="project-card bg-black border border-amber-50 rounded-xl overflow-hidden shadow-xl transition duration-300 hover:transform hover:scale-105"
              >
                <div className="relative h-64">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 2).map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>{project.location}</span>
                    <span>{project.area}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 border border-zinc-800 rounded-xl">
              <span className="block text-4xl font-bold mb-2">120+</span>
              <span className="text-gray-400">Projects Completed</span>
            </div>
            <div className="p-6 border border-zinc-800 rounded-xl">
              <span className="block text-4xl font-bold mb-2">95%</span>
              <span className="text-gray-400">Client Satisfaction</span>
            </div>
            <div className="p-6 border border-zinc-800 rounded-xl">
              <span className="block text-4xl font-bold mb-2">15+</span>
              <span className="text-gray-400">Industry Awards</span>
            </div>
            <div className="p-6 border border-zinc-800 rounded-xl">
              <span className="block text-4xl font-bold mb-2">8</span>
              <span className="text-gray-400">Years of Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-white bg-zinc-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Lets Work Together</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Have a project in mind? Wed love to bring your vision to life.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition duration-300">
            Start a Project
          </button>
        </div>
      </section>
    </div>
  );
}