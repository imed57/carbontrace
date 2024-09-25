import React from 'react';
import Image from 'next/image';
import images from '../assets/index';

const Home = () => {
  return (
    <div className="min-h-screen bg-custom-dark-green text-white">
      {/* Main Content */}
      <main className="flex flex-col items-start justify-center h-screen px-8 py-8 space-y-6">
  <Image src={images.logo_carbon} alt="Carbon Trace" width={180} height={40} />
  <h1 className="text-5xl font-bold leading-tight">
    Bringing Blockchain to the World
  </h1>
  <p className="text-lg max-w-md">
    Solana Labs builds products, tools and reference implementations that can be used on the Solana blockchain.
  </p>
  <button className="bg-custom-light-green px-6 py-3 rounded-md text-white text-lg mt-4">
  Se connecter
</button>

</main>


      <div className="absolute bottom-20 right-20">
        <Image src={images.Carbon} alt="Decorative" width={400} height={400} />
      </div>
    </div>
  );
};

export default Home;
