import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useNavigate } from 'react-router';

const Footer = () => {
  const navigate = useNavigate();

  const handlesocial = (e) => {
    e.preventDefault()
  }

  return (
    <footer className="bg-black/90 text-gray-300 relative z-10 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/browse')}>
            <span className="text-red-500 font-black text-2xl sm:text-3xl">MOVI</span>
            <span className="text-white font-black text-2xl sm:text-3xl">AI</span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-4 md:gap-6" onClick={handlesocial}>
            <button onClick={() => navigate('/browse')} className="hover:text-white transition-colors">Browse</button>
            <button onClick={() => navigate('/wishlist')} className="hover:text-white transition-colors">Wishlist</button>
            <button className="hover:text-white transition-colors">Profile</button>
            <button className="hover:text-white transition-colors">Contact</button>
          </div>

        </div>

        {/* Social Media */}
        <div className="flex gap-4 mt-6 md:mt-8" onClick={handlesocial}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Facebook className="h-5 w-5" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Youtube className="h-5 w-5" />
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 text-gray-500 text-xs md:text-sm flex flex-col md:flex-row justify-between items-center gap-2">
          <span>© {new Date().getFullYear()} NetflixGPT. All rights reserved.</span>
          <div className="flex gap-4">
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-white transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
