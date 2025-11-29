import React, { useState, useEffect } from 'react';

const slogans = [
  "A little effort can keep our campus clean.",
  "Don't litter, make it glitter.",
  "Cleanliness is next to godliness.",
  "Be part of the solution, not the pollution.",
  "Reduce, Reuse, Recycle, and Report.",
  "Keep our campus green and clean."
];

const SloganDisplay = () => {
  const [currentSlogan, setCurrentSlogan] = useState("");

  useEffect(() => {
    const today = new Date();
    const day = Math.floor(today.getTime() / (1000 * 60 * 60 * 24)); // Days since epoch
    const index = day % slogans.length;
    setCurrentSlogan(slogans[index]);
  }, []);

  return (
    <div className="text-white text-lg sm:text-xl italic font-light mb-6">
      <p>"{currentSlogan}"</p>
    </div>
  );
};

export default SloganDisplay;