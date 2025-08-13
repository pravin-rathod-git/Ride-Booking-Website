import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f7f7f7] to-white flex flex-col overflow-hidden">
      
      {/* App Name and Banner Section */}
      <div className="p-6 flex flex-col items-center justify-center flex-1">
        <h1 className="text-4xl font-extrabold text-[#d84e55] tracking-tight mb-4 text-center">
          PPGo
        </h1>

        {/* Banner Image */}
        <div className=' object-cover  content-center'>
        <img
          src="https://i.postimg.cc/5NNkncWz/20250715-1840-Rabbit-Logo-Design-remix-01k0737xvbfp6v3n98xt4sjn2y.png"
          alt="Rabbit Logo"
          className="w-full max-w-xs rounded-2xl shadow-md object-contain"
        />
        </div>
      </div>

      {/* CTA Card Section */}
      <div className="bg-white w-full rounded-t-3xl shadow-lg px-6 py-6">
        <h2 className="text-2xl font-bold text-[#333] mb-4 text-center">
          Get Started with PPGo 
        </h2>


        <Link
          to="/login"
          className="block w-full text-center bg-[#d84e55] hover:bg-red-600 transition-colors text-white py-3 rounded-xl font-semibold text-lg shadow"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Start;
