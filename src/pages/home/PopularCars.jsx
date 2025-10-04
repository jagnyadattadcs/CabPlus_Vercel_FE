import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function PopularCars() {
  const navigate = useNavigate();

  const cars = [
    {
      name: "Mini",
      image:
        "https://www.autovista.in/assets/img/new_cars_colour_variants/new-wagonR-colour-superior-white.jpg",
    },
    {
      name: "Sedan",
      image:
        "https://imgd.aeplcdn.com/642x336/n/cw/ec/139133/aura-exterior-right-front-three-quarter-8.jpeg?isig=0&q=80",
    },
    {
      name: "XL",
      image:
        "data:image/jpeg;base64,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i4VHvflbCDpE1BHj/jXux9poK6ZS9CVmZvPVVUh8CG/yW5peiXSsGC6hdKe+SQlByh3SZd5qaWnq/R5oJWFkjHs2c08woDJwxSl8LmmM8m55DuX1dS6G05S46mz0Yx29UCVso7Da2ABtvpsd3Ut/JB8z2vWdwo6UU8NU0AN4QXFhLR4E8l1DogqKWOOonbFUVNwqiHTT9WS0MHJrXcsb58SV0+K2UMTsx0VO0/diaMLJEbRsBgIPMby4DII81dVAMKqAiIgIiICIqIKqhaCCFVEGvuFopK+MsqIGPB7wonX9Gdmqw76kMJ5cKniphBySs6GqOQkwTuaezK1M3QvOD9XOxw8dl3JUQcGPQ1WA82keDl6Z0N1RO5A8yu74TCDiDeheY85WhX4+hQH26kDyXaVRByGPoTpP2lWfIK8zoStBPE+pqAf/ABvwusYVUHM6boY0/E4OfJUyEdjpSVvKHo407SYIo2uI+0pgiDV02n7XTD6mihb/AHAs5lLAz2YWD3K8iDwImDk0KvCOzHwXpEFMeCY8FVEBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQf//Z",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleNavigate = (carName) => {
    localStorage.setItem("selectedType", carName); // save type for Vehicles page
    navigate("/vehicles");
  };

  return (
    <section className="flex flex-col justify-center items-center my-10 px-4 md:px-8">
      {/* Header */}
      <div className="w-full max-w-6xl mx-auto text-center">
        <motion.h4
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-yellow-400 text-lg md:text-xl font-medium tracking-wide mb-2"
        >
          Car Types
        </motion.h4>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-extrabold text-white mb-12"
        >
          Explore Our Car Collection
        </motion.h2>

        {/* Car Cards */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 px-2 py-10">
          {cars.map((car, idx) => (
            <motion.div
              key={idx}
              className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl shadow-2xl flex flex-col items-center w-70 md:w-64 h-72 border border-yellow-500/40 hover:border-yellow-300/80 transition-colors duration-300 cursor-pointer"
              whileHover={{
                scale: 1.07,
                y: -10,
                boxShadow: "0px 20px 40px rgba(255, 215, 0, 0.3)",
              }}
              initial={{ scale: 1 }}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => handleNavigate(car.name)}
            >
              {/* Image */}
              <div className="w-full h-36 flex items-center justify-center overflow-hidden rounded-t-2xl bg-black">
                <img
                  src={car.image}
                  alt={car.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <p className="text-white font-bold text-lg mt-3">{car.name}</p>

              {/* See All Cars Button */}
              <motion.button
                transition={{ duration: 0.3 }}
                className="absolute bottom-6  flex items-center justify-center px-2 py-2 bg-yellow-500 text-gray-900 font-bold rounded-[0.5rem] shadow-lg hover:bg-yellow-400 transition-colors duration-300"
              >
                <span>See All Cars</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
