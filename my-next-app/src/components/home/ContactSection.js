'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      }, 3000);
    }, 1500);
  };
  
  const inputClasses = "w-full bg-zinc-800 border border-zinc-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300";

  return (
    <section className="py-20 md:py-32  relative">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 z-0 opacity-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/videos/contact-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 "></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left column - Contact info */}
            <motion.div 
              className="text-white"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Lets Discuss Your Project</h2>
              <p className="text-zinc-300 text-lg mb-10">
                Wed love to hear about your architectural vision. Reach out to start a conversation about your next project.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start">
                  <div className="bg-zinc-800 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Our Studio</h3>
                    <p className="text-zinc-400">123 Design Avenue, Creativity District</p>
                    <p className="text-zinc-400">New York, NY 10001</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-zinc-800 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Email Us</h3>
                    <p className="text-zinc-400">info@architecturefirm.com</p>
                    <p className="text-zinc-400">projects@architecturefirm.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-zinc-800 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Call Us</h3>
                    <p className="text-zinc-400">+1 (212) 555-7890</p>
                    <p className="text-zinc-400">Monday-Friday: 9am-6pm</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <motion.a 
                  href="#" 
                  className="bg-zinc-800 p-3 rounded-full text-white hover:bg-white hover:text-black transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="bg-zinc-800 p-3 rounded-full text-white hover:bg-white hover:text-black transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="bg-zinc-800 p-3 rounded-full text-white hover:bg-white hover:text-black transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="bg-zinc-800 p-3 rounded-full text-white hover:bg-white hover:text-black transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
            
            {/* Right column - Contact form */}
            <motion.div 
              className="bg-zinc-800/80 backdrop-blur-sm p-8 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>
              
              {isSubmitted ? (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                  <p className="text-zinc-300">Thank you for reaching out. Well get back to you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-zinc-300 mb-2">Your Name</label>
                      <motion.input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        value={formState.name} 
                        onChange={handleChange} 
                        className={inputClasses}
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-zinc-300 mb-2">Email Address</label>
                      <motion.input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formState.email} 
                        onChange={handleChange} 
                        className={inputClasses}
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-zinc-300 mb-2">Phone Number</label>
                    <motion.input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formState.phone} 
                      onChange={handleChange} 
                      className={inputClasses}
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-zinc-300 mb-2">Your Message</label>
                    <motion.textarea 
                      id="message" 
                      name="message" 
                      rows="5" 
                      required 
                      value={formState.message} 
                      onChange={handleChange} 
                      className={inputClasses}
                      whileFocus={{ scale: 1.01 }}
                    ></motion.textarea>
                  </div>
                  
                  <motion.button 
                    type="submit" 
                    className="w-full bg-white text-black font-medium py-3 rounded-sm hover:bg-opacity-90 transition-all duration-300 relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}