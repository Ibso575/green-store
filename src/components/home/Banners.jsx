import React from 'react';
import { ArrowRight } from 'lucide-react';
import banner1 from '../../assets/banner-1.png';
import banner2 from '../../assets/banner-2.png';
import banner3 from '../../assets/banner-3.png';

const bannerData = [
  {
    id: 1,
    title: "Everyday Fresh & Clean with Our Products",
    image: banner1,
    bgColor: "#F0E8D5"
  },
  {
    id: 2,
    title: "Make your Breakfast Healthy and Easy",
    image: banner2,
    bgColor: "#F3E8E8"
  },
  {
    id: 3,
    title: "The best Organic Products Online",
    image: banner3,
    bgColor: "#E7EAF3"
  }
];

const Banners = () => {
  return (
    <section className="container-custom py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {bannerData.map((banner) => (
          <div
            key={banner.id}
            className="relative h-[260px] rounded-[20px] overflow-hidden group cursor-pointer flex items-center"
            style={{ backgroundColor: banner.bgColor }}
          >
            {/* TEXT */}
            <div className="relative z-10 px-10 max-w-[220px] space-y-5">
              <h3 className="text-[22px] font-extrabold text-gray-800 leading-snug">
                {banner.title}
              </h3>

              <button className="flex items-center gap-2 bg-[#F53E32] hover:bg-[#D73228] text-white px-4 py-2 rounded-[4px] font-bold text-xs w-fit transition-colors">
                Shop Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* IMAGE — bottom right */}
            <img
              src={banner.image}
              alt={banner.title}
              className="absolute bottom-[20px] right-0 w-[90%] h-auto object-contain group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        ))}

      </div>
    </section>
  );
};

export default Banners;
