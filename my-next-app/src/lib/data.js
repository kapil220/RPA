// Mock data for projects - in a real app this would be fetched from an API or database
export const projects = [
    {
      id: 1,
      title: "Luxury Residence Interior Winter Garden",
      description: "A fully custom interior design for a prestigious Moscow suburban community spanning 1500m².",
      fullDescription: "We have collaborated with the clients of this project before, having previously developed the architectural concept for their residence in this prestigious Moscow suburban community. This interior is a prime example of comprehensive design in Studio 54's distinctive style. The owners envisioned a warm, inviting home where their family and friends could gather. The result is a 16,146 sq ft residence with seven terraces, brought to life by a team of 54 specialists. Every detail follows a singular vision: the home should not just be comfortable but inspiring, perfectly attuned to the lifestyle of its residents.",
      conceptDescription: "Our goal was to create a cozy, sophisticated interior with the ambiance of a five-star hotel. Nearly every room opens onto a private terrace, and the western wing features a wellness zone, complete with a beauty salon and fitness area.",
      category: "interior",
      slug: "luxury-residence-interior-winter-garden-agalarov-estate",
      image: "/images/portfolio/1.jpg",
      mainImage: "/images/projects/luxury-residence-main.jpg",
      galleryImages: [
        "/images/portfolio/5.jpg",
        "/images/portfolio/5.jpg",
        "/images/portfolio/5.jpg",
      ],
      technologies: ["Interior Design", "Custom Furniture", "Lighting Design"],
      location: "Russia (Moscow)",
      area: "1500m²",
      readingTime: "10 min",
      features: [
        "Project concept",
        "Family living and dining area",
        "Winter garden",
        "Home cinema",
        "Owner's home office with private terrace",
        "Eastern wing",
        "Dressing room in dark tones",
        "Entrance hall",
        "Women's home office",
        "Western wing"
      ],
      relatedProjects: [2, 3, 4] // References to other project IDs
    },
    {
      id: 2,
      title: "Luxury Interior Design in Repino",
      description: "Sophisticated interior with the ambiance of a five-star hotel featuring custom design elements.",
      fullDescription: "This luxury interior design project in Repino showcases our commitment to creating sophisticated living spaces that combine comfort with elegance. Working closely with the client, we developed a design that reflects their personal taste while incorporating our signature attention to detail and craftsmanship.",
      conceptDescription: "For this project, we focused on creating spaces that flow seamlessly together while each maintaining their own unique character. The use of premium materials and custom furniture pieces elevates the design to create a truly one-of-a-kind living experience.",
      category: "interior",
      slug: "luxury-interior-design-project-residence-repino",
      image: "/images/portfolio/2.jpg",
      mainImage: "/images/projects/repino-residence.jpg",
      galleryImages: [
       "/images/portfolio/5.jpg",
        "/images/portfolio/5.jpg",
        "/images/portfolio/5.jpg",
      ],
      technologies: ["Luxury Design", "Bespoke Elements", "Custom Lighting"],
      location: "Russia (Repino)",
      area: "850m²",
      readingTime: "8 min",
      features: [
        "Project concept",
        "Luxury living spaces",
        "Custom kitchen design",
        "Master suite",
        "Guest accommodations",
        "Entertainment areas",
        "Outdoor living spaces"
      ],
      relatedProjects: [1, 3, 5]
    },
    {
      id: 3,
      title: "Agalarov Estate Residence",
      description: "A symbiosis of nature and modern architecture with an emphasis on organic materials and sustainable design.",
      fullDescription: "The Agalarov Estate Residence represents the perfect harmony between cutting-edge architectural design and the natural environment. By incorporating sustainable materials and energy-efficient systems, we've created a home that is both luxurious and environmentally conscious.",
      conceptDescription: "Our vision for this project was to blur the boundaries between indoor and outdoor living, creating a seamless transition between the home and its surrounding landscape. Floor-to-ceiling windows, natural stone, and timber elements help to establish this connection.",
      category: "architecture",
      slug: "residence-agalarov-estate-symbiosis-nature-modern-architecture",
      image: "/images/ortfolio/3.jpg",
      mainImage: "/images/projects/agalarov-estate.jpg",
      galleryImages: [
       "/images/portfolio/5.jpg",
        "/images/portfolio/5.jpg",
        "/images/portfolio/5.jpg",
      ],
      technologies: ["Sustainable Architecture", "Biophilic Design", "Smart Home"],
      location: "Russia (Moscow)",
      area: "1200m²",
      readingTime: "12 min",
      features: [
        "Project concept",
        "Sustainable materials",
        "Energy efficiency",
        "Landscape integration",
        "Outdoor living spaces",
        "Natural lighting",
        "Smart home technology"
      ],
      relatedProjects: [1, 5, 6]
    },
    {
      id: 4,
      title: "Apartment Project in OKO Tower",
      description: "Completed luxury apartment featuring minimalist design principles in the prestigious OKO Tower.",
      fullDescription: "Located in the iconic OKO Tower, this apartment project showcases our expertise in urban luxury living. The design maximizes the limited space while creating an atmosphere of openness and light, enhanced by the spectacular views of the Moscow skyline.",
      conceptDescription: "For this city apartment, we embraced minimalist design principles that emphasize clean lines, thoughtful space planning, and a carefully curated selection of materials and furnishings. The result is a sophisticated urban retreat that feels both spacious and intimate.",
      category: "interior",
      slug: "completed-apartment-project-oko-tower-moscow",
      image: "/images/portfolio/4.jpg",
      mainImage: "/images/projects/oko-tower.jpg",
      galleryImages: [
        "/images/portfolio/5.jpg",
        "/images/portfolio/5.jpg",
        "/images/portfolio/5.jpg",
      ],
      technologies: ["Modern Design", "Space Optimization", "Luxury Finishes"],
      location: "Moscow City",
      area: "210m²",
      readingTime: "7 min",
      features: [
        "Project concept",
        "Space-efficient design",
        "Urban views",
        "Luxury finishes",
        "Smart home integration",
        "Custom furnishings"
      ],
      relatedProjects: [2, 6, 1]
    },
    {
      id: 5,
      title: "Contemporary Villa Design",
      description: "Modern villa featuring open spaces, natural materials and seamless indoor-outdoor transitions.",
      fullDescription: "This contemporary villa design is a testament to our commitment to creating spaces that are both aesthetically striking and functionally superior. Situated in the beautiful coastal region of Sochi, the villa takes full advantage of its natural surroundings through thoughtful orientation and strategic openings.",
      conceptDescription: "Our design approach focused on creating a structure that appears to emerge organically from its environment while incorporating bold geometric forms. The extensive use of glass, concrete, and natural stone creates a dialogue between the built environment and the landscape.",
      category: "architecture",
      slug: "contemporary-villa-design-natural-materials",
      image: "/images/portfolio/5.jpg",
      mainImage: "/images/projects/contemporary-villa.jpg",
      galleryImages: [
       "/images/portfolio/5.jpg",
        "/images/portfolio/5.jpg",
        "/images/portfolio/5.jpg",
      ],
      technologies: ["Modern Architecture", "Landscape Integration", "Sustainable Design"],
      location: "Russia (Sochi)",
      area: "780m²",
      readingTime: "9 min",
      features: [
        "Project concept",
        "Geometric architecture",
        "Indoor-outdoor living",
        "Infinity pool",
        "Outdoor entertainment areas",
        "Guest pavilion",
        "Landscaped gardens"
      ],
      relatedProjects: [3, 1, 6]
    },
    {
      id: 6,
      title: "Minimalist Urban Apartment",
      description: "Clean lines and thoughtful space planning define this urban apartment with panoramic city views.",
      fullDescription: "This minimalist urban apartment exemplifies how thoughtful design can transform a compact space into a luxurious and functional home. Located in the heart of Moscow, the apartment offers breathtaking views of the city skyline, which we incorporated as a central element of the design.",
      conceptDescription: "Our concept was to create a serene urban retreat characterized by clean lines, a neutral color palette, and carefully selected furnishings. Every element serves both an aesthetic and functional purpose, resulting in a space that feels uncluttered yet warm and inviting.",
      category: "interior",
      slug: "minimalist-urban-apartment-panoramic-views",
      image: "/images/portfolio/6.jpg",
      mainImage: "/images/projects/urban-apartment.jpg",
      galleryImages: [
       "/images/portfolio/5.jpg",
        "/images/portfolio/5.jpg",
        "/images/portfolio/5.jpg",
      ],
      technologies: ["Minimalist Design", "Smart Home", "Custom Furniture"],
      location: "Moscow",
      area: "180m²",
      readingTime: "6 min",
      features: [
        "Project concept",
        "Panoramic views",
        "Minimalist interior",
        "Multi-functional spaces",
        "Custom storage solutions",
        "Smart lighting system",
        "Entertainment area"
      ],
      relatedProjects: [4, 2, 3]
    }
  ];
  
  // Helper function to get a project by its slug
  export const getProjectBySlug = (slug) => {
    return projects.find(project => project.slug === slug) || null;
  };
  
  // Helper function to get related projects full data
  export const getRelatedProjects = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (!project || !project.relatedProjects) return [];
    
    return project.relatedProjects.map(relatedId => {
      const relatedProject = projects.find(p => p.id === relatedId);
      if (relatedProject) {
        return {
          id: relatedProject.id,
          title: relatedProject.title,
          description: relatedProject.description,
          image: relatedProject.image,
          slug: relatedProject.slug
        };
      }
      return null;
    }).filter(Boolean);
  };