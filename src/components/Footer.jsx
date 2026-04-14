import React from 'react';
import { Leaf, Globe, Camera, Share2, Play, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 xl:gap-24 mb-20">
          {/* Brand Info */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-primary rounded-[14px] flex items-center justify-center shadow-xl shadow-primary/20 group-hover:rotate-6 transition-transform">
                <LeafIcon className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">FoodStore</span>
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Fresh Market</span>
              </div>
            </Link>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Бизнинг дўконимиз орқали сиз энг сара ва янги маҳсулотларни уйингиздан чиқмасдан харид қилишингиз мумкин. Сифат биз учун муҳим!
            </p>
            <div className="flex gap-4">
              {[Globe, Camera, Share2, Play].map((Icon, i) => (
                <button key={i} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary/10 hover:text-primary transition-all">
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-8 border-l-4 border-primary pl-4">Бўлимлар</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li className="hover:text-primary transition-colors cursor-pointer">Сиз учун махсус</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Янги маҳсулотлар</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Чегирмалар</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Бизнинг брендлар</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-8 border-l-4 border-primary pl-4">Маълумот</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li className="hover:text-primary transition-colors cursor-pointer">Биз ҳақимизда</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Етказиб бериш</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Хизмат кўрсатиш</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Қайтариш сиёсати</li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="space-y-8">
            <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-8 border-l-4 border-primary pl-4">Бизга қўшилинг</h4>
            <p className="text-slate-500 text-sm font-medium">Янгиликлардан хабардор бўлиш учун обуна бўлинг.</p>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Электрон пошта"
                className="w-full h-12 pl-4 pr-12 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-primary transition-all text-xs font-bold"
              />
              <button className="absolute right-1 top-1 bottom-1 w-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary-dark transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          <span>© 2026 FoodStore. Барча ҳуқуқлар ҳимояланган.</span>
          <div className="flex gap-8">
            <span className="hover:text-slate-600 cursor-pointer transition-colors">Maxfiylik siyosati</span>
            <span className="hover:text-slate-600 cursor-pointer transition-colors">Foydalanish shartlari</span>
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    </footer>
  );
};

const LeafIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a7 7 0 0 1-7 7c-1 0-2-.13-3-.4" />
    <path d="M7 2a4 4 0 0 0-4 4c0 3 2 4 4 6s4 3 4 6" />
    <path d="M2 \22 22-2" />
  </svg>
);

export default Footer;
