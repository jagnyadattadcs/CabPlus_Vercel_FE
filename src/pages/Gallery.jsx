import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  // Fetch images from backend
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/gallery`)
      .then((res) => setImages(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-black  flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-100">
        Gallery Of Cab
      </h1>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-6xl">
        {images.map((img) => (
          <motion.div
            key={img._id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer overflow-hidden rounded-lg shadow-md"
            onClick={() => setSelectedImage(img.imageUrl)}
          >
            <img
              src={img.imageUrl}
              alt={img.title}
              className="w-full h-40 sm:h-48 md:h-56 object-cover transition-transform duration-300 hover:scale-110"
            />
          </motion.div>
        ))}
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt="zoomed"
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl border-4 border-white"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



