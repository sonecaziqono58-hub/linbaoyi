
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="min-height-[70vh] flex flex-col items-center justify-center text-center px-6 py-20 animate-fade-in">
      <h1 className="font-title text-6xl md:text-8xl mb-8 tracking-widest text-slate-800 opacity-90">
        墨染流年
      </h1>
      <p className="max-w-xl text-lg md:text-xl text-slate-500 leading-loose tracking-wide font-light italic">
        “于笔墨之间，寻觅灵魂的归处；<br/>
        在留白之处，倾听时光的回响。”
      </p>
      <div className="mt-12 w-1 h-24 bg-gradient-to-b from-slate-300 to-transparent"></div>
    </section>
  );
};

export default Hero;
