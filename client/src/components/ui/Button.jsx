import React from 'react';

export const Button = ({ title }) => {
  return (
    /* From Uiverse.io by zymantas-katinas */
    <button className="relative group border-none bg-transparent p-0 outline-none cursor-pointer font-pingu  uppercase text-base">
      <span className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 rounded-lg transform translate-y-0.5 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-[250ms] group-active:translate-y-px"></span>

      <span className="absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-l from-[hsl(217,33%,16%)] via-[hsl(217,33%,32%)] to-[hsl(217,33%,16%)]"></span>

      <div className="relative flex items-center justify-between py-3 px-6 text-l sm:text-3xl text-black rounded-lg transform -translate-y-1 bg-gradient-to-r from-yellow-400 to-yellow-300 gap-3 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110">
        <span className="select-none">{title}</span>
      </div>
    </button>
  );
};
