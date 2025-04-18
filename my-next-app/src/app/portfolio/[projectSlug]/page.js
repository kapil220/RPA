"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProjectBySlug, getRelatedProjects } from '@/lib/data';

export default function ProjectDetail({ params }) {
  const { projectSlug } = params;
  const project = getProjectBySlug(projectSlug);
  
  const contentRef = useRef(null);
  const [activeSection, setActiveSection] = useState('about');
  
  useEffect(() => {
    if (typeof window !== 'undefined' && contentRef.current && project) {
      gsap.registerPlugin(ScrollTrigger);
  
      const contentSections = contentRef.current.querySelectorAll('section');
  
      // Animation for sections
      contentSections.forEach((section) => {
        gsap.fromTo(section, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: "top bottom-=100",
              end: "center center",
              toggleActions: "play none none none"
            }
          }
        );
      });
      
      // Scroll spy for updating active section
      contentSections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveSection(section.id),
          onEnterBack: () => setActiveSection(section.id)
        });
      });
  
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, [project]);
  
  
  if (!project) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Project not found</div>;
  }

  // Get related projects with full data
  const relatedProjects = getRelatedProjects(project.id);

  // Create an array of all section IDs
  const allSections = ['about', 'project-concept', ...project.features.map(feature => 
    feature.toLowerCase().replace(/\s+/g, '-')
  )];

  return (
    <div className="bg-black text-white min-h-screen py-32">
      <div className="flex flex-col md:flex-row">
        {/* Left sidebar with table of contents */}
        <aside className="w-full md:w-1/4 p-8 md:sticky md:top-0 md:h-screen overflow-y-auto py-32">
          <h2 className="text-2xl font-semibold mb-4">TABLE OF CONTENTS:</h2>
          <ul className="space-y-2">
            <li>
              <a 
                href="#about" 
                className={`${activeSection === 'about' ? 'text-amber-500 font-bold' : 'text-amber-500'} hover:underline`}
              >
                • About the project:
              </a>
              <ul className="ml-4 mt-2 space-y-2">
                <li>
                  <a 
                    href="#project-concept" 
                    className={`${activeSection === 'project-concept' ? 'text-amber-500 font-bold' : 'text-white'} hover:text-amber-500`}
                  >
                    • Project concept
                  </a>
                </li>
                {project.features.map((feature, index) => {
                  const featureId = feature.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <li key={index}>
                      <a 
                        href={`#${featureId}`} 
                        className={`${activeSection === featureId ? 'text-amber-500 font-bold' : 'text-white'} hover:text-amber-500`}
                      >
                        • {feature}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </aside>
        
        {/* Main content */}
        <main ref={contentRef} className="w-full md:w-1/2 p-8">
          <section id="about" className="mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-amber-500 mb-8">ABOUT THE PROJECT:</h1>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <p className="text-amber-500 text-xl">{project.location}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Area</h3>
                <p className="text-amber-500 text-xl">{project.area}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 mb-12">
              <div className="flex items-center">
                <span className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                </span>
                <span>~ {project.readingTime}</span>
              </div>
              
              <button className="flex items-center">
                <span className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935-2.186 2.25 2.25 0 0 0-3.935 2.186Z" />
                  </svg>
                </span>
                <span>Share</span>
              </button>
            </div>
            
            <p className="text-lg mb-8">{project.fullDescription}</p>
          </section>
          
          <section id="project-concept" className="mb-16">
            <h2 className="text-3xl font-bold text-amber-500 mb-8">PROJECT CONCEPT</h2>
            <p className="text-lg mb-8">{project.conceptDescription}</p>
            
            <div className="w-full h-96 relative mb-8">
              <Image
                src={project.mainImage}
                alt={project.title}
                fill
                className="object-cover rounded"
              />
            </div>
          </section>
          
          {/* Additional sections based on features */}
          {project.features.map((feature, index) => (
            <section 
              id={feature.toLowerCase().replace(/\s+/g, '-')} 
              key={index}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-amber-500 mb-8">{feature.toUpperCase()}</h2>
              <p className="text-lg mb-8">
                This section showcases the {feature.toLowerCase()} aspect of the project, 
                highlighting the unique design elements and functionality created for this space.
              </p>
              
              {index % 2 === 0 && project.galleryImages && project.galleryImages.length > 0 && (
                <div className="w-full h-96 relative mb-8">
                  <Image
                    src={project.galleryImages[index % project.galleryImages.length]}
                    alt={feature}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
            </section>
          ))}
        </main>
        
        {/* Right sidebar with related projects */}
        <aside className="w-full md:w-1/4 p-8 bg-zinc-900">
          <h2 className="text-2xl font-semibold mb-6">READ ALSO:</h2>
          
          <div className="space-y-6">
            {relatedProjects.map((relatedProject) => (
              <Link href={`/portfolio/${relatedProject.slug}`} key={relatedProject.id} className="block">
                <div className="relative h-48 mb-3">
                  <Image
                    src={relatedProject.image}
                    alt={relatedProject.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1">{relatedProject.title}</h3>
                <p className="text-gray-400 text-sm">{relatedProject.description}</p>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}