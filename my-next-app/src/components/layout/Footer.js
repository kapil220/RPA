import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 text-stone-300 py-16  ">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center justify-start mb-6">
              <Image
                src="/images/logo2.png"
                alt="Logo"
                height={50}
                width={50}
                className="w-24 h-12"
              />
              <div className="flex flex-col ml-2">
                <span className="text-sm text-stone-300 font-serif">
                  RAVI PRAKASH ARCHITECTS
                </span>
              </div>
            </div>
            <p className="text-stone-600 mb-6 font-serif">
              Creating timeless architectural spaces that honor tradition while embracing innovation.
            </p>
            <div className="flex space-x-4">
              {['instagram', 'twitter', 'linkedin', 'pinterest'].map((social) => (
                <a 
                  key={social}
                  href={`https://${social}.com`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-stone-600 hover:text-stone-900 transition-colors"
                  aria-label={`Visit our ${social} page`}
                >
                  <div className="w-6 h-6 relative">
                    <Image 
                      src={`/images/icons/${social}.svg`} 
                      alt={social} 
                      layout="fill" 
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-medium mb-6 border-b border-stone-300 pb-2">Navigation</h3>
            <ul className="space-y-4">
              {[
                { label: 'Home', path: '/' },
                { label: 'About', path: '/about' },
                { label: 'Projects', path: '/projects' },
                { label: 'Services', path: '/services' },
                { label: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <span className="text-stone-300 hover:text-stone-500 transition-colors cursor-pointer font-serif">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-medium mb-6 border-b border-stone-300 pb-2">Contact</h3>
            <address className="not-italic text-stone-600 space-y-4 font-serif">
              <p>123 Heritage Avenue</p>
              <p>New York, NY 10001</p>
              <p>
                <a href="mailto:contact@raviprakasharchitects.com" className="hover:text-stone-900 transition-colors">
                  contact@raviprakasharchitects.com
                </a>
              </p>
              <p>
                <a href="tel:+12125550123" className="hover:text-stone-900 transition-colors">
                  +1 (212) 555-0123
                </a>
              </p>
            </address>
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-medium mb-6 border-b border-stone-300 pb-2">Newsletter</h3>
            <p className="text-stone-600 mb-4 font-serif">
              Subscribe to receive updates on our latest projects and insights.
            </p>
            <form className="space-y-4">
              <div>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-white border border-stone-300 py-3 px-4 text-stone-800 placeholder-stone-500 focus:ring-1 focus:ring-stone-800 focus:border-stone-800"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="bg-stone-800 text-white py-2 px-6 font-serif hover:bg-stone-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-stone-300 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-stone-500 text-sm font-serif">
            &copy; {currentYear} Ravi Prakash Architects. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy">
              <span className="text-stone-500 hover:text-stone-800 text-sm transition-colors cursor-pointer font-serif">
                Privacy Policy
              </span>
            </Link>
            <span className="text-stone-500">|</span>
            <Link href="/terms-of-service">
              <span className="text-stone-500 hover:text-stone-800 text-sm transition-colors cursor-pointer font-serif">
                Terms of Service
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}