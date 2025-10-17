// import React, { useState, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// // API Base URL for your backend
// const API_BASE_URL = import.meta.env.VITE_API_URL;

// const Modal = ({ car, onClose }) => {
//   if (!car) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 backdrop-blur-sm overflow-auto"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.9, y: 50 }}
//         animate={{ scale: 1, y: 0 }}
//         exit={{ scale: 0.9, y: 50 }}
//         transition={{ duration: 0.2 }}
//         className="bg-gray-800 text-white rounded-xl shadow-2xl w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="p-4 sm:p-6 md:p-8 relative">
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-50"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>

//           <h2 className="text-2xl sm:text-3xl font-bold mb-4">{car.name}</h2>

//           {/* Image Gallery Section */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
//             {car.images.map((image, index) => (
//               <img
//                 key={index}
//                 src={`${API_BASE_URL}/uploads/cars/${image}`}
//                 alt={`${car.name} - ${index + 1}`}
//                 className="rounded-lg w-full h-24 sm:h-36 md:h-40 object-cover transition-transform transform hover:scale-105"
//               />
//             ))}
//           </div>

//           {/* Details Section */}
//           <div className="space-y-3">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
//                 <p className="text-sm text-gray-400">Body Type</p>
//                 <p className="text-lg font-medium">{car.bodyType}</p>
//               </div>
//               <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
//                 <p className="text-sm text-gray-400">Fuel</p>
//                 <p className="text-lg font-medium">{car.fuel}</p>
//               </div>
//               <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
//                 <p className="text-sm text-gray-400">Seats</p>
//                 <p className="text-lg font-medium">{car.seats}</p>
//               </div>
//               <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
//                 <p className="text-sm text-gray-400">Transmission</p>
//                 <p className="text-lg font-medium">{car.transmission}</p>
//               </div>
//               <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
//                 <p className="text-sm text-gray-400">Engine</p>
//                 <p className="text-lg font-medium">{car.engine}</p>
//               </div>
//               <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
//                 <p className="text-sm text-gray-400">Mileage</p>
//                 <p className="text-lg font-medium">{car.mileage}</p>
//               </div>
//               <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
//                 <p className="text-sm text-gray-400">Price per Km (for cab)</p>
//                 <p className="text-lg font-medium">₹{car.pricePerKm}</p>
//               </div>
//               <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
//                 <p className="text-sm text-gray-400">Price per Hour (for self drive)</p>
//                 <p className="text-lg font-medium">₹{car.pricePerHour}</p>
//               </div>
              
//             </div>

//             <div className="mt-4">
//               <h3 className="text-xl font-bold mb-2">About this vehicle</h3>
//               <p className="text-gray-400 leading-relaxed">{car.fullDetails}</p>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default function App() {
//   const navigate = useNavigate();
//   const [cars, setCars] = useState([]);
//   const [filteredCars, setFilteredCars] = useState([]);
//   const [carTypes, setCarTypes] = useState([]);
//   const [carModels, setCarModels] = useState([]);
//   const [selectedType, setSelectedType] = useState("");
//   const [selectedModel, setSelectedModel] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedCar, setSelectedCar] = useState(null);

//   useEffect(() => {
//     const fetchCarData = async () => {
//       try {
//         const carsResponse = await axios.get(`${API_BASE_URL}/admin/cars`);
//         setCars(carsResponse.data);
//         setFilteredCars(carsResponse.data);

//         const typesResponse = await axios.get(
//           `${API_BASE_URL}/bookings/cars/types`
//         );
//         setCarTypes(typesResponse.data);
//       } catch (error) {
//         console.error("Failed to fetch car data:", error);
//       }
//     };
//     fetchCarData();
//   }, []);

//   // inside your Vehicles component
//   useEffect(() => {
//     const savedType = localStorage.getItem("selectedType");
//     if (savedType) {
//       setSelectedType(savedType);
//       localStorage.removeItem("selectedType"); // clear after use
//     }
//   }, []);

//   useEffect(() => {
//     const fetchCarModels = async () => {
//       if (selectedType) {
//         try {
//           const modelsResponse = await axios.get(
//             `${API_BASE_URL}/bookings/cars/models?type=${selectedType}`
//           );
//           setCarModels(modelsResponse.data);
//         } catch (error) {
//           console.error("Failed to fetch car models:", error);
//         }
//       } else {
//         setCarModels([]);
//       }
//     };
//     fetchCarModels();
//   }, [selectedType]);

//   useEffect(() => {
//     let newFilteredCars = cars;
//     if (selectedType) {
//       newFilteredCars = newFilteredCars.filter(
//         (car) => car.type === selectedType
//       );
//     }
//     if (selectedModel) {
//       newFilteredCars = newFilteredCars.filter(
//         (car) => car.model === selectedModel
//       );
//     }
//     setFilteredCars(newFilteredCars);
//   }, [selectedType, selectedModel, cars]);

//   const handleClearFilters = () => {
//     setSelectedType("");
//     setSelectedModel("");
//   };

//   const handleViewDetails = (car) => {
//     setSelectedCar(car);
//     setShowModal(true);
//   };

//   const handleBookNow = (car) => {
//     // Save car data to localStorage for auto-fill in booking form
//     localStorage.setItem("selectedCar", JSON.stringify({
//       carType: car.type,
//       carModel: car.model
//     }));
    
//     // Navigate to the booking form
//     navigate(`/bookingForm`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 md:p-12 antialiased">
//       <div className="max-w-7xl mx-auto">
//         <header className="text-center mb-10">
//           <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">
//             Our Vehicle
//           </h1>
//           <p className="text-sm sm:text-lg text-gray-400">
//             Choose from our extensive collection of well-maintained vehicles.
//             From compact cars to luxury SUVs, we have the perfect vehicle for
//             every journey.
//           </p>
//         </header>

//         {/* Filter Section */}
//         <div className="bg-gray-800 rounded-l p-2 sm:p-6 mb-10 shadow-lg">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-end">
//             <div>
//               <label
//                 htmlFor="carType"
//                 className="block text-sm sm:text-base font-medium text-gray-400 mb-2"
//               >
//                 Car Type
//               </label>
//               <select
//                 id="carType"
//                 value={selectedType}
//                 onChange={(e) => {
//                   setSelectedType(e.target.value);
//                   setSelectedModel("");
//                 }}
//                 className="w-full bg-gray-900 text-gray-200 border border-gray-700 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
//               >
//                 <option value="">All</option>
//                 {carTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div
//               className={`${
//                 selectedType ? "block" : "opacity-50 pointer-events-none"
//               }`}
//             >
//               <label
//                 htmlFor="carModel"
//                 className="block text-sm sm:text-base font-medium text-gray-400 mb-2"
//               >
//                 Car Model
//               </label>
//               <select
//                 id="carModel"
//                 value={selectedModel}
//                 onChange={(e) => setSelectedModel(e.target.value)}
//                 className="w-full bg-gray-900 text-gray-200 border border-gray-700 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
//                 disabled={!selectedType}
//               >
//                 <option value="">All</option>
//                 {carModels.map((model) => (
//                   <option key={model} value={model}>
//                     {model}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="col-span-1 lg:col-span-2 flex items-center justify-end">
//               <button
//                 onClick={handleClearFilters}
//                 className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
//               >
//                 Clear Filters
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Car Grid Section */}
//         <h2 className="text-2xl sm:text-3xl font-bold text-center text-yellow-400 mb-8">
//           Showing Our Vehicle
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//           {filteredCars.map((car) => (
//             <motion.div
//               key={car._id}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.1 }}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-gray-800 rounded-l overflow-hidden shadow-lg transition-all duration-300"
//             >
//               <div className="relative">
//                 {car.images && car.images.length > 0 ? (
//                   <img
//                     src={`${API_BASE_URL}/uploads/cars/${car.images[0]}`}
//                     alt={car.name}
//                     className="w-full h-48 sm:h-56 object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-48 sm:h-56 bg-gray-700 flex items-center justify-center text-gray-400">
//                     No Image Available
//                   </div>
//                 )}
//                 <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-yellow-400 text-gray-900 font-bold text-xs sm:text-sm px-2 py-1 rounded-full">
//                   Available
//                 </div>
//               </div>
//               <div className="p-4 sm:p-6">
//                 <h3 className="text-lg flex justify-between items-center sm:text-xl font-bold mb-2">
//                   {car.name}
//                   <p className="text-sm sm:text-base text-gray-400 mb-2">
//                     {car.bodyType}
//                   </p>
//                 </h3>
//                 <div className="grid grid-cols-2 gap-2 sm:gap-3 text-sm sm:text-base text-gray-400 mb-4">
//                   <div>
//                     <span className="font-bold text-gray-300">Fuel:</span>{" "}
//                     {car.fuel}
//                   </div>
//                   <div>
//                     <span className="font-bold text-gray-300">Seats:</span>{" "}
//                     {car.seats}
//                   </div>
//                   <div>
//                     <span className="font-bold text-gray-300">
//                       Transmission:
//                     </span>{" "}
//                     {car.transmission}
//                   </div>
//                   <div>
//                     <span className="font-bold text-gray-300">Engine:</span>{" "}
//                     {car.engine}
//                   </div>
//                   <div className="col-span-2">
//                     <span className="font-bold text-gray-300">Mileage:</span>{" "}
//                     {car.mileage}
//                   </div>
//                 </div>
//                 {/* Display new price fields */}
//                 <div className="flex flex-col items-start gap-1 text-sm text-gray-400 mb-4">
//                   <span className="font-bold text-gray-300">
//                     Price per Km:{" "}
//                     <span className="text-yellow-400">₹{car.pricePerKm}</span>
//                   </span>
//                   <span className="font-bold text-gray-300 ">
//                     Price per Hour:
//                     <span className="text-yellow-400">
//                       {"  "}₹{car.pricePerHour}
//                     </span>
//                   </span>{" "}
//                 </div>
//                 <div className="flex flex-col sm:flex-row justify-center gap-3">
//                   <button
//                     onClick={() => handleBookNow(car)}
//                     className="flex-1 px-4 py-2 sm:py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
//                   >
//                     BOOK NOW
//                   </button>
//                   <button
//                     onClick={() => handleViewDetails(car)}
//                     className="flex-1 px-4 py-2 sm:py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
//                   >
//                     VIEW DETAILS
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {filteredCars.length === 0 && (
//           <div className="text-center text-lg text-gray-500 mt-6">
//             No cars found for the selected filters.
//           </div>
//         )}
//       </div>

//       <AnimatePresence>
//         {showModal && (
//           <Modal car={selectedCar} onClose={() => setShowModal(false)} />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Modal = ({ car, onClose }) => {
  if (!car) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 backdrop-blur-sm overflow-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        transition={{ duration: 0.2 }}
        className="bg-gray-800 text-white rounded-xl shadow-2xl w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6 md:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{car.name}</h2>

          {/* Image Gallery Section */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {car.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${car.name} - ${index + 1}`}
                className="rounded-lg w-full h-24 sm:h-36 md:h-40 object-cover transition-transform transform hover:scale-105"
              />
            ))}
          </div>

          {/* Details Section */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
                <p className="text-sm text-gray-400">Body Type</p>
                <p className="text-lg font-medium">{car.bodyType}</p>
              </div>
              <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
                <p className="text-sm text-gray-400">Fuel</p>
                <p className="text-lg font-medium">{car.fuel}</p>
              </div>
              <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
                <p className="text-sm text-gray-400">Seats</p>
                <p className="text-lg font-medium">{car.seats}</p>
              </div>
              <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
                <p className="text-sm text-gray-400">Transmission</p>
                <p className="text-lg font-medium">{car.transmission}</p>
              </div>
              <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
                <p className="text-sm text-gray-400">Engine</p>
                <p className="text-lg font-medium">{car.engine}</p>
              </div>
              <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
                <p className="text-sm text-gray-400">Mileage</p>
                <p className="text-lg font-medium">{car.mileage}</p>
              </div>
              <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
                <p className="text-sm text-gray-400">Price per Km (for cab)</p>
                <p className="text-lg font-medium">₹{car.pricePerKm}</p>
              </div>
              <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
                <p className="text-sm text-gray-400">
                  Price per Hour (for self drive)
                </p>
                <p className="text-lg font-medium">₹{car.pricePerHour}</p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">About this vehicle</h3>
              <p className="text-gray-400 leading-relaxed">{car.fullDetails}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [carTypes, setCarTypes] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  // Dummy car data
  const dummyCars = [
    {
      _id: "1",
      name: "Maruti Suzuki Swift",
      type: "Mini",
      model: "Swift",
      bodyType: "Hatchback",
      fuel: "Petrol",
      seats: "5",
      transmission: "Manual",
      engine: "1.2L K-Series",
      mileage: "23.2 km/l",
      price: "1200/day",
      pricePerKm: 9,
      pricePerHour: 80,
      fullDetails:
        "The Maruti Suzuki Swift is a popular hatchback known for its sporty design, excellent fuel efficiency, and reliable performance. Perfect for city driving and long trips alike.",
      images: [
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
      ],
    },
    {
      _id: "2",
      name: "Hyundai Creta",
      type: "XL",
      model: "Creta",
      bodyType: "SUV",
      fuel: "Diesel",
      seats: "5",
      transmission: "Automatic",
      engine: "1.5L CRDi",
      mileage: "17.4 km/l",
      price: "2200/day",
      pricePerKm: 15,
      pricePerHour: 120,
      fullDetails:
        "The Hyundai Creta is a premium SUV offering stylish looks, comfortable interiors, and powerful performance. Ideal for family trips and adventurous journeys.",
      images: [
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=300&fit=crop",
      ],
    },
    {
      _id: "3",
      name: "Honda City",
      type: "Sedan",
      model: "City",
      bodyType: "Sedan",
      fuel: "Petrol",
      seats: "5",
      transmission: "CVT",
      engine: "1.5L i-VTEC",
      mileage: "18.0 km/l",
      price: "1800/day",
      pricePerKm: 12,
      pricePerHour: 100,
      fullDetails:
        "The Honda City is a premium sedan known for its refined engine, comfortable ride quality, and luxurious features. Perfect for business trips and family outings.",
      images: [
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=300&fit=crop",
      ],
    },
    {
      _id: "4",
      name: "Toyota Innova Crysta",
      type: "XL",
      model: "Innova",
      bodyType: "MPV",
      fuel: "Diesel",
      seats: "7",
      transmission: "Manual",
      engine: "2.4L GD",
      mileage: "14.5 km/l",
      price: "2600/day",
      pricePerKm: 18,
      pricePerHour: 140,
      fullDetails:
        "The Toyota Innova Crysta is a spacious and reliable MPV perfect for large families and group travel. Known for its comfort and durability.",
      images: [
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=300&fit=crop",
      ],
    },
    {
      _id: "5",
      name: "Maruti Suzuki Baleno",
      type: "Mini",
      model: "Baleno",
      bodyType: "Hatchback",
      fuel: "Petrol",
      seats: "5",
      transmission: "AMT",
      engine: "1.2L Dualjet",
      mileage: "22.35 km/l",
      price: "1400/day",
      pricePerKm: 10,
      pricePerHour: 85,
      fullDetails:
        "The Maruti Suzuki Baleno is a premium hatchback with a spacious interior, modern features, and excellent fuel efficiency. Great for urban commuting.",
      images: [
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
      ],
    },
  ];

  useEffect(() => {
    // Set dummy data
    setCars(dummyCars);
    setFilteredCars(dummyCars);

    // Extract car types from dummy data
    const types = [...new Set(dummyCars.map((car) => car.type))];
    setCarTypes(types);
  }, []);

  // inside your Vehicles component
  useEffect(() => {
    const savedType = localStorage.getItem("selectedType");
    if (savedType) {
      setSelectedType(savedType);
      localStorage.removeItem("selectedType"); // clear after use
    }
  }, []);

  useEffect(() => {
    // Extract models based on selected type from dummy data
    if (selectedType) {
      const models = [
        ...new Set(
          dummyCars
            .filter((car) => car.type === selectedType)
            .map((car) => car.model)
        ),
      ];
      setCarModels(models);
    } else {
      setCarModels([]);
    }
  }, [selectedType]);

  useEffect(() => {
    let newFilteredCars = cars;
    if (selectedType) {
      newFilteredCars = newFilteredCars.filter(
        (car) => car.type === selectedType
      );
    }
    if (selectedModel) {
      newFilteredCars = newFilteredCars.filter(
        (car) => car.model === selectedModel
      );
    }
    setFilteredCars(newFilteredCars);
  }, [selectedType, selectedModel, cars]);

  const handleClearFilters = () => {
    setSelectedType("");
    setSelectedModel("");
  };

  const handleViewDetails = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const handleBookNow = (car) => {
    // Save car data to localStorage for auto-fill in booking form
    localStorage.setItem(
      "selectedCar",
      JSON.stringify({
        carType: car.type,
        carModel: car.model,
      })
    );

    // Navigate to the booking form
    navigate(`/bookingForm`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 md:p-12 antialiased">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">
            Our Vehicle
          </h1>
          <p className="text-sm sm:text-lg text-gray-400">
            Choose from our extensive collection of well-maintained vehicles.
            From compact cars to luxury SUVs, we have the perfect vehicle for
            every journey.
          </p>
        </header>

        {/* Filter Section */}
        <div className="bg-gray-800 rounded-l p-2 sm:p-6 mb-10 shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-end">
            <div>
              <label
                htmlFor="carType"
                className="block text-sm sm:text-base font-medium text-gray-400 mb-2"
              >
                Car Type
              </label>
              <select
                id="carType"
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setSelectedModel("");
                }}
                className="w-full bg-gray-900 text-gray-200 border border-gray-700 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
              >
                <option value="">All</option>
                {carTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div
              className={`${
                selectedType ? "block" : "opacity-50 pointer-events-none"
              }`}
            >
              <label
                htmlFor="carModel"
                className="block text-sm sm:text-base font-medium text-gray-400 mb-2"
              >
                Car Model
              </label>
              <select
                id="carModel"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-gray-900 text-gray-200 border border-gray-700 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                disabled={!selectedType}
              >
                <option value="">All</option>
                {carModels.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-1 lg:col-span-2 flex items-center justify-end">
              <button
                onClick={handleClearFilters}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Car Grid Section */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-yellow-400 mb-8">
          Showing Our Vehicle
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCars.map((car) => (
            <motion.div
              key={car._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 rounded-l overflow-hidden shadow-lg transition-all duration-300"
            >
              <div className="relative">
                {car.images && car.images.length > 0 ? (
                  <img
                    src={car.images[0]}
                    alt={car.name}
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 sm:h-56 bg-gray-700 flex items-center justify-center text-gray-400">
                    No Image Available
                  </div>
                )}
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-yellow-400 text-gray-900 font-bold text-xs sm:text-sm px-2 py-1 rounded-full">
                  Available
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg flex justify-between items-center sm:text-xl font-bold mb-2">
                  {car.name}
                  <p className="text-sm sm:text-base text-gray-400 mb-2">
                    {car.bodyType}
                  </p>
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 text-sm sm:text-base text-gray-400 mb-4">
                  <div>
                    <span className="font-bold text-gray-300">Fuel:</span>{" "}
                    {car.fuel}
                  </div>
                  <div>
                    <span className="font-bold text-gray-300">Seats:</span>{" "}
                    {car.seats}
                  </div>
                  <div>
                    <span className="font-bold text-gray-300">
                      Transmission:
                    </span>{" "}
                    {car.transmission}
                  </div>
                  <div>
                    <span className="font-bold text-gray-300">Engine:</span>{" "}
                    {car.engine}
                  </div>
                  <div className="col-span-2">
                    <span className="font-bold text-gray-300">Mileage:</span>{" "}
                    {car.mileage}
                  </div>
                </div>
                {/* Display new price fields */}
                <div className="flex flex-col items-start gap-1 text-sm text-gray-400 mb-4">
                  <span className="font-bold text-gray-300">
                    Price per Km:{" "}
                    <span className="text-yellow-400">₹{car.pricePerKm}</span>
                  </span>
                  <span className="font-bold text-gray-300 ">
                    Price per Hour:
                    <span className="text-yellow-400">
                      {"  "}₹{car.pricePerHour}
                    </span>
                  </span>{" "}
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={() => handleBookNow(car)}
                    className="flex-1 px-4 py-2 sm:py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
                  >
                    BOOK NOW
                  </button>
                  <button
                    onClick={() => handleViewDetails(car)}
                    className="flex-1 px-4 py-2 sm:py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
                  >
                    VIEW DETAILS
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center text-lg text-gray-500 mt-6">
            No cars found for the selected filters.
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <Modal car={selectedCar} onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}