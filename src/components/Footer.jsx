import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Send, Compass } from 'lucide-react';

// USER: O'zingiz import qilgan rasm (icon)larni shu yerga qo'ying:
import fbIcon from '../assets/facebook.svg';
import xIcon from '../assets/x.svg';
import pinIcon from '../assets/ball.svg';
import igIcon from '../assets/insta.svg';
import logo from '../assets/logo.svg'

const Footer = () => {
  return (
    <footer className="bg-[#F8F9FA] pt-20 pb-10 font-heading border-t border-nest-border px-4 lg:px-0">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 mb-16">
          {/* Column 1: Brand & Contact */}
          <div className="space-y-6">
            <Link to="/" className="flex flex-col">
              <div className="flex items-center gap-2">
                 <img 
                    src={logo} 
                    alt="Foodzy Logo" 
                    className="h-20 w-auto object-contain"
                    onError={(e) => e.target.style.display = 'none'} 
                 />
              </div>
            </Link>
            <p className="text-nest-text text-[14px] leading-relaxed max-w-sm">
              FoodTrove is the biggest market of grocery products. Get your daily needs from our store.
            </p>
            <div className="space-y-4 pt-2">
               <FooterContact icon={<MapPin className="w-4 h-4 text-nest-red" />} text="51 Green St.Huntington ohaio beach ontario, NY 11746 KY 4783, USA." />
               <FooterContact icon={<Mail className="w-4 h-4 text-nest-red" />} text="example@email.com" />
               <FooterContact icon={<Phone className="w-4 h-4 text-nest-red" />} text="+91 123 4567890" />
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-6 lg:pl-10">
            <h4 className="text-lg font-black text-nest-dark">Company</h4>
            <ul className="space-y-3">
               <FooterLink text="About Us" />
               <FooterLink text="Delivery Information" />
               <FooterLink text="Privacy Policy" />
               <FooterLink text="Terms & Conditions" />
               <FooterLink text="contact Us" />
               <FooterLink text="Support Center" />
            </ul>
          </div>

          {/* Column 3: Category */}
          <div className="space-y-6 lg:pl-10">
            <h4 className="text-lg font-black text-nest-dark">Category</h4>
            <ul className="space-y-3">
               <FooterLink text="Dairy & Bakery" />
               <FooterLink text="Fruits & Vegetable" />
               <FooterLink text="Snack & Spice" />
               <FooterLink text="Juice & Drinks" />
               <FooterLink text="Chicken & Meat" />
               <FooterLink text="Fast Food" />
            </ul>
          </div>

          {/* Column 4: Newsletter & Gallery */}
          <div className="space-y-6">
             <h4 className="text-lg font-black text-nest-dark">Subscribe Our Newsletter</h4>
             <div className="relative flex items-center bg-white border border-nest-border rounded-[5px] p-1 shadow-sm focus-within:border-nest-red transition-all">
                <input 
                  type="text" 
                  placeholder="Search here.." 
                  className="w-full px-4 py-2.5 outline-none text-sm text-nest-dark placeholder:text-nest-text/40 font-medium"
                />
                <button className="p-2 text-nest-dark hover:text-nest-red transition-colors">
                  <Send className="w-5 h-5 rotate-12" />
                </button>
             </div>
             
             {/* Socials */}
             <div className="flex items-center gap-3 py-2">
                {/* USER: Ikonka rasmlarini (src orqali) o'zingiz bu yerga qo'yishingiz mumkin */}
                <SocialBtn href="https://facebook.com/foodzy" color="hover:border-[#3b5998]">
                   <img src={fbIcon} alt="fb" className="w-4 h-4 object-contain" onError={(e) => e.target.style.opacity = '0.3'} />
                </SocialBtn>
                <SocialBtn href={xIcon} color="hover:border-black">
                   <img src="/x-icon.png" alt="x" className="w-4 h-4 object-contain" onError={(e) => e.target.style.opacity = '0.3'} />
                </SocialBtn>
                <SocialBtn href={pinIcon} color="hover:border-[#bd081c]">
                   <img src="/pin-icon.png" alt="pin" className="w-4 h-4 object-contain" onError={(e) => e.target.style.opacity = '0.3'} />
                </SocialBtn>
                <SocialBtn href={igIcon} color="hover:border-[#e4405f]">
                   <img src="/ig-icon.png" alt="ig" className="w-4 h-4 object-contain" onError={(e) => e.target.style.opacity = '0.3'} />
                </SocialBtn>
             </div>

             {/* Image Gallery */}
             <div className="grid grid-cols-5 gap-2 pt-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="aspect-square rounded-[8px] overflow-hidden bg-white shadow-sm border border-nest-border group cursor-pointer">
                    <img 
                      src={`/footer-gallery-${i}.png`} 
                      alt="gallery" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = `https://picsum.photos/seed/${i+100}/100/100`;
                        e.target.style.opacity = '0.8';
                      }}
                    />
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-nest-border text-center">
           <p className="text-[14px] font-medium text-nest-text">
             © 2025 <Link to="/" className="text-nest-red font-bold hover:underline">foodzy</Link>, All rights reserved.
           </p>
        </div>
      </div>
    </footer>
  );
};

const FooterContact = ({ icon, text }) => (
  <div className="flex items-start gap-4">
    <div className="mt-1">{icon}</div>
    <span className="text-[14px] text-nest-text font-medium leading-relaxed">{text}</span>
  </div>
);

const FooterLink = ({ text }) => (
  <li>
    <Link to="#" className="text-[14px] text-nest-text font-medium hover:text-nest-red transition-colors inline-block hover:translate-x-1 transition-transform">
      {text}
    </Link>
  </li>
);

const SocialBtn = ({ children, color, href }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className={`w-8 h-8 rounded-full bg-white border border-nest-border flex items-center justify-center text-nest-text transition-all ${color} hover:border-nest-red shadow-sm overflow-hidden`}
  >
    {children}
  </a>
);

export default Footer;
