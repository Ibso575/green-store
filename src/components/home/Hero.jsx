import React from "react";
import heroImg from "../../assets/hero-1.png";
import { Send } from "lucide-react";

const Hero = () => {
  return (
    <section className="container-custom py-10">
      <div className="relative bg-[#F2F3F5] rounded-[30px] overflow-hidden min-h-[520px] flex items-center">

        {/* TOP TAGS */}
        <div className="absolute top-10 right-10 hidden lg:flex items-center gap-3 z-20">
          {["Shopping", "Recipes", "Kitchen", "News", "Food"].map((tag, idx) => (
            <div
              key={idx}
              className="bg-white px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <span className="text-[14px] font-bold text-[#3BB77E]">{tag}</span>
            </div>
          ))}
        </div>

        {/* LEFT CONTENT */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between px-10 lg:px-20 gap-10 relative z-10">

          <div className="max-w-2xl space-y-6">
            {/* Small Title */}
            <p className="text-[15px] font-bold">
              <span className="text-[#F53E32] border-b-2 border-[#F53E32]/30">100%</span>{" "}
              <span className="text-gray-800">Organic Vegetables</span>
            </p>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-[70px] font-black text-gray-900 leading-[1.05] tracking-tight">
              The best way to <br /> stuff your wallet.
            </h1>

            {/* Description */}
            <p className="text-[15px] text-gray-600 font-medium leading-relaxed max-w-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
              reiciendis beatae consequuntur.
            </p>

            {/* EMAIL INPUT */}
            <div className="flex max-w-lg bg-white rounded-full p-1 shadow-lg overflow-hidden border border-gray-200">
              <div className="flex items-center px-4">
                <Send className="w-5 h-5 text-gray-400" />
              </div>

              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-2 py-4 outline-none text-[16px] text-gray-800 font-medium"
              />

              <button className="bg-[#3BB77E] hover:bg-[#29A56C] text-white px-10 py-4 rounded-full font-bold text-[16px] transition-all active:scale-95">
                Subscribe
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE — FIXED TO BOTTOM RIGHT */}
          <div className="absolute bottom-[-100px] right-[-50px] w-[55%] lg:w-[45%] pointer-events-none select-none hidden lg:block">
            <img
              src={heroImg}
              alt="Organic Vegetables"
              className="w-full object-contain drop-shadow-xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
