import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogIn, ChevronRight } from 'lucide-react';

const BiddingLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/bidding' },
    { name: 'Membership', path: '/bidding/membership' },
    { name: 'About Us', path: '/bidding/about' },
    { name: 'Contact Us', path: '/bidding/contact' },
    { name: 'Blogs', path: '/bidding/blogs' },
    { name: 'Careers', path: '/bidding/careers' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FE]">
      {/* Premium Navbar */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/bidding')}>
              <img
                src="/images/carifypdi_logo1.jpeg.png"
                alt="Carify Logo"
                className="h-12 w-auto object-contain"
              />
              <span className="text-2xl font-black tracking-tighter text-[#5D3FD3] hidden sm:block">
                Carify<span className="text-[#F15A24]">Bids</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-[15px] font-semibold text-slate-600 hover:text-[#5D3FD3] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <button 
                onClick={() => navigate('/bidding/login')}
                className="px-6 py-2 text-[15px] font-bold text-[#5D3FD3] hover:bg-slate-50 rounded-lg transition-all"
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate('/bidding/register')}
                className="px-6 py-2.5 bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] text-white text-[15px] font-bold rounded-xl shadow-lg shadow-purple-200 hover:scale-105 transition-all flex items-center gap-2"
              >
                Become a Dealer
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 p-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block text-lg font-semibold text-slate-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <button className="w-full py-3 font-bold text-[#5D3FD3] bg-slate-50 rounded-xl">Sign In</button>
              <button className="w-full py-3 font-bold text-white bg-[#5D3FD3] rounded-xl">Register</button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <img
                src="/images/carifypdi_logo1.jpeg.png"
                alt="Carify Logo"
                className="h-16 w-auto object-contain mx-auto mb-4"
              />
          <span className="text-xl font-black tracking-tighter text-[#5D3FD3]">
            Carify<span className="text-[#F15A24]">Bids</span>
          </span>
          <p className="text-slate-500 mt-4 max-w-md mx-auto leading-relaxed">
            India's most trusted digital auction platform for premium vehicles. Part of the Carify Ecosystem.
          </p>
          <div className="flex justify-center gap-8 mt-8 text-slate-400">
            <Link to="#" className="hover:text-[#5D3FD3]">Terms</Link>
            <Link to="#" className="hover:text-[#5D3FD3]">Privacy</Link>
            <Link to="#" className="hover:text-[#5D3FD3]">Guidelines</Link>
          </div>
          <p className="text-slate-400 text-sm mt-8">© 2026 AutoBSE. Part of Carify ERP.</p>
        </div>
      </footer>
    </div>
  );
};

export default BiddingLayout;
