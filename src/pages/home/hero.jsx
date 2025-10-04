// import { useNavigate } from "react-router-dom";
// import bgImage from "../../assets/603bf261-5d35-45ad-910b-0f2aa855bd2f.png";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const API_BASE_URL = import.meta.env.VITE_API_URL;

// export default function Hero() {
//   const navigate = useNavigate();
//   const [showSelfDriveForm, setShowSelfDriveForm] = useState(false);
//   const [cars, setCars] = useState([]);
//   const [carTypes, setCarTypes] = useState([]);
//   const [carModels, setCarModels] = useState([]);
//   const [selectedCarData, setSelectedCarData] = useState(null);
//   const [showTermsModal, setShowTermsModal] = useState(false);
//   const [formData, setFormData] = useState({
//     carType: "",
//     carModel: "",
//     pickup: "",
//     drop: "",
//     km: "",
//     name: "",
//     email: "",
//     phone: "",
//     startDate: "",
//     endDate: "",
//     duration: "",
//     license: "",
//     dob: "",
//     adhar: "",
//     location: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);

//   // Prefill values from localStorage
//   useEffect(() => {
//     const mode = localStorage.getItem("bookingMode");
//     setShowSelfDriveForm(mode === "selfdrive");

//     const pickup = localStorage.getItem("pickup");
//     const drop = localStorage.getItem("drop");
//     if (pickup || drop) {
//       setFormData((prev) => ({
//         ...prev,
//         pickup: pickup || "",
//         drop: drop || "",
//       }));
//       localStorage.removeItem("pickup");
//       localStorage.removeItem("drop");
//     }

//     const savedCar = localStorage.getItem("selectedCar");
//     if (savedCar) {
//       const carData = JSON.parse(savedCar);
//       setFormData((prev) => ({
//         ...prev,
//         carType: carData.carType || "",
//         carModel: carData.carModel || "",
//       }));
//       localStorage.removeItem("selectedCar");
//     }
//   }, []);

//   // Fetch cars
//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/cars`);
//         const data = await response.json();
//         setCars(data);
//         const types = [...new Set(data.map((car) => car.type))];
//         setCarTypes(types);
//       } catch (error) {
//         console.error("Error fetching cars:", error);
//       }
//     };
//     fetchCars();
//   }, []);

//   // Load saved booking data
//   useEffect(() => {
//     const mode = localStorage.getItem("bookingMode");
//     if (mode === "selfdrive") {
//       setShowSelfDriveForm(true);
//       const savedSelfDrive = localStorage.getItem("selfDriveBooking");
//       if (savedSelfDrive) setFormData(JSON.parse(savedSelfDrive));
//     } else {
//       setShowSelfDriveForm(false);
//       const savedBooking = localStorage.getItem("bookingData");
//       if (savedBooking) setFormData(JSON.parse(savedBooking));
//     }
//     localStorage.removeItem("bookingData");
//     localStorage.removeItem("selfDriveBooking");
//   }, []);

//   // Car Models update
//   useEffect(() => {
//     if (formData.carType) {
//       const models = cars
//         .filter((car) => car.type === formData.carType)
//         .map((car) => car.model);
//       setCarModels(models);
//     } else {
//       setCarModels([]);
//     }
//   }, [formData.carType, cars]);

//   // Selected Car Data update
//   useEffect(() => {
//     if (formData.carModel) {
//       const car = cars.find(
//         (c) => c.type === formData.carType && c.model === formData.carModel
//       );
//       setSelectedCarData(car || null);
//     } else {
//       setSelectedCarData(null);
//     }
//   }, [formData.carModel, formData.carType, cars]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const endpoint = showSelfDriveForm
//         ? `${API_BASE_URL}/bookings/self-drive`
//         : `${API_BASE_URL}/bookings/cab`;

//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         await fetch(`${API_BASE_URL}/email/send`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             name: formData.name,
//             email: formData.email,
//             message: `New booking for ${JSON.stringify(formData)} `,
//           }),
//         });

//         setShowSuccessPopup(true);
//         setTimeout(() => setShowSuccessPopup(false), 5000); // hide after 5 sec
//         localStorage.removeItem("selectedCar");

//         // reset form
//         setFormData({
//           carType: "",
//           carModel: "",
//           pickup: "",
//           drop: "",
//           km: "",
//           name: "",
//           email: "",
//           phone: "",
//           startDate: "",
//           endDate: "",
//           duration: "",
//           license: "",
//           dob: "",
//           adhar: "",
//           location: "",
//         });
//       } else {
//         alert("Booking failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error submitting booking:", error);
//       alert("An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Motion variants
//   const fadeInLeft = {
//     hidden: { x: -100, opacity: 0 },
//     visible: { x: 0, opacity: 1, transition: { duration: 1 } },
//   };
//   const fadeInRight = {
//     hidden: { x: 100, opacity: 0 },
//     visible: { x: 0, opacity: 1, transition: { duration: 1 } },
//   };

//   return (
//     <section
//       className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-between 
//                  px-6 md:px-20 bg-black bg-cover bg-center"
//       style={{ backgroundImage: `url(${bgImage})` }}
//     >
//       {/* Left text */}
//       <motion.div
//         variants={fadeInLeft}
//         initial="hidden"
//         animate="visible"
//         className="w-full md:w-[45%] text-center md:text-left"
//       >
//         <h2 className="text-4xl md:text-5xl mt-20 md:mt-0 font-bold leading-tight text-yellow-400">
//           Experience the road <br /> like never before.
//         </h2>
//         <p className="mt-6 md:mt-10 text-gray-300 text-base md:text-[1.3rem]">
//           Discover freedom with our premium car rental service. From luxury
//           sedans to rugged SUVs, find your perfect driving companion.
//         </p>
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => navigate("/vehicles")}
//           className="mt-8 md:mt-14 px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg"
//         >
//           View All Cars
//         </motion.button>
//       </motion.div>

//       {/* Right booking form */}
//       <motion.div
//         variants={fadeInRight}
//         initial="hidden"
//         animate="visible"
//         className="w-full md:w-1/2 flex justify-center relative mt-10 md:mt-0"
//       >
//         <motion.div
//           whileHover={{ scale: 1.02 }}
//           className="w-full max-w-[450px] p-4 md:p-4 rounded-xl shadow-lg border border-yellow-400 bg-black/30 backdrop-blur-lg"
//         >
//           <>
//             <>
//               <h1 className="text-white text-center text-[1.5rem] mb-4">
//                 Book Now
//               </h1>
//               <motion.div
//                 initial={{ x: 100, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 1 }}
//                 className="w-full flex justify-center items-center py-2"
//               >
//                 <div className="w-full px-2">
//                   {/* Tabs */}
//                   <div className="flex justify-between mb-6 text-white font-bold text-lg">
//                     <h3
//                       className={`cursor-pointer ${
//                         !showSelfDriveForm ? "text-yellow-400 underline" : ""
//                       }`}
//                       onClick={() => setShowSelfDriveForm(false)}
//                     >
//                       Book Your Cab
//                     </h3>
//                     <h3
//                       className={`cursor-pointer ${
//                         showSelfDriveForm ? "text-yellow-400 underline" : ""
//                       }`}
//                       onClick={() => setShowSelfDriveForm(true)}
//                     >
//                       Self Drive Car
//                     </h3>
//                   </div>

//                   {/* Conditional Forms */}
//                   {!showSelfDriveForm ? (
//                     <form
//                       className="md:grid grid-cols-2 gap-4 text-white"
//                       onSubmit={handleSubmit}
//                     >
//                       {/* Column 1 */}
//                       <div className="flex flex-col gap-3">
//                         <label className="text-sm">Car Type</label>
//                         <select
//                           name="carType"
//                           onChange={handleChange}
//                           value={formData.carType}
//                           className="p-2 rounded border border-gray-400 bg-black"
//                           required
//                         >
//                           <option value="">Select Car Type</option>
//                           {carTypes.map((type) => (
//                             <option key={type} value={type}>
//                               {type}
//                             </option>
//                           ))}
//                         </select>

//                         <label className="text-sm">Pickup Location</label>
//                         <input
//                           type="text"
//                           name="pickup"
//                           onChange={handleChange}
//                           value={formData.pickup}
//                           placeholder="Enter Pickup Location"
//                           className="p-2 rounded bg-transparent border border-gray-400"
//                         />
//                         <label className="text-sm">Drop Location</label>
//                         <input
//                           type="text"
//                           name="drop"
//                           onChange={handleChange}
//                           value={formData.drop}
//                           placeholder="Enter Drop Location"
//                           className="p-2 rounded bg-transparent border border-gray-400"
//                         />
//                       </div>

//                       {/* Column 2 */}
//                       <div className="flex flex-col gap-3 mt-4 md:mt-0">
//                         <label className="text-sm">Your Name</label>
//                         <input
//                           type="text"
//                           name="name"
//                           onChange={handleChange}
//                           value={formData.name}
//                           placeholder="Your Name"
//                           className="p-2 rounded bg-transparent border border-gray-400"
//                         />

//                         <label className="text-sm">Email</label>
//                         <input
//                           type="email"
//                           name="email"
//                           onChange={handleChange}
//                           value={formData.email}
//                           placeholder="Your Email"
//                           className="p-2 rounded bg-transparent border border-gray-400"
//                         />

//                         <label className="text-sm">Phone Number</label>
//                         <input
//                           type="tel"
//                           name="phone"
//                           onChange={handleChange}
//                           value={formData.phone}
//                           placeholder="Phone Number"
//                           className="p-2 rounded bg-transparent border border-gray-400"
//                           required
//                         />
//                       </div>

//                       <button
//                         type="submit"
//                         disabled={isLoading}
//                         className="col-span-2 w-full  bg-yellow-400 text-black font-bold p-2 rounded-lg mt-4 disabled:opacity-50"
//                       >
//                         {isLoading ? "Processing..." : "BOOK NOW"}
//                       </button>
//                     </form>
//                   ) : (
//                     <form
//                       className="sm:grid grid-cols-2 gap-4  text-white"
//                       onSubmit={handleSubmit}
//                     >
//                       <div className="flex flex-col gap-3">
//                         <label className="text-sm">Car Type</label>
//                         <select
//                           name="carType"
//                           onChange={handleChange}
//                           value={formData.carType}
//                           className="p-2 rounded border border-gray-400 bg-black"
//                           required
//                         >
//                           <option value="">Select Car Type</option>
//                           {carTypes.map((type) => (
//                             <option key={type} value={type}>
//                               {type}
//                             </option>
//                           ))}
//                         </select>

//                         <label className="text-sm">Driving License No.</label>
//                         <input
//                           type="text"
//                           maxLength={16}
//                           name="license"
//                           onChange={handleChange}
//                           value={formData.license}
//                           placeholder="Enter License No."
//                           className="p-2 rounded bg-transparent border border-gray-400"
//                           required
//                         />

//                         <label className="text-sm">Email</label>
//                         <input
//                           type="email"
//                           name="email"
//                           onChange={handleChange}
//                           value={formData.email}
//                           placeholder="Your Email"
//                           className="p-2 rounded bg-transparent border border-gray-400"
//                         />
//                       </div>

//                       <div className="flex flex-col gap-3 mt-4 md:mt-0">
//                         <label className="text-sm">Your Name</label>
//                         <input
//                           type="text"
//                           name="name"
//                           onChange={handleChange}
//                           value={formData.name}
//                           placeholder="Your Name"
//                           className="p-2 rounded bg-transparent border border-gray-400"
//                           required
//                         />
//                         <label className="text-sm">Aadhar Number</label>
//                         <input
//                           type="text"
//                           name="adhar"
//                           maxLength={12}
//                           onChange={handleChange}
//                           value={formData.adhar}
//                           placeholder="Enter Aadhar No."
//                           className="p-2 rounded bg-transparent border border-gray-400"
//                           required
//                         />

//                         <label className="text-sm">Phone Number</label>
//                         <input
//                           type="number"
//                           name="phone"
//                           onChange={handleChange}
//                           value={formData.phone}
//                           placeholder="Your Phone no."
//                           className="p-2 rounded bg-transparent border border-gray-400"
//                           required
//                         />
//                       </div>

//                       <button
//                         type="submit"
//                         disabled={isLoading}
//                         className="col-span-2 w-full  bg-yellow-400 text-black font-bold p-2 rounded-lg mt-4 disabled:opacity-50"
//                       >
//                         {isLoading ? "Processing..." : "BOOK SELF DRIVE"}
//                       </button>
//                     </form>
//                   )}
//                   <p
//                     className="col-span-2 text-sm text-blue-400 underline cursor-pointer mt-4"
//                     onClick={() => setShowTermsModal(true)}
//                   >
//                     Read Terms & Conditions
//                   </p>
//                 </div>
//               </motion.div>
//               {showTermsModal && (
//                 <div className="fixed inset-0  flex justify-center items-center z-50">
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     exit={{ scale: 0 }}
//                     className="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto relative"
//                   >
//                     <h2 className="text-xl font-bold mb-4">
//                       Terms & Conditions
//                     </h2>
//                     <p className="text-l mb-4">
//                       {/* Add your full terms & conditions here */}
//                       1.All toll, highway, and bridge fees incurred during the
//                       rental period are the responsibility of the customer.
//                       <br></br>
//                       2. The car must be returned in the same condition as
//                       rented.
//                       <br />
//                       3. Driver must follow traffic rules.
//                       <br />
//                       4. Cancellation must be done 24 hours before booking.
//                       <br />
//                       5. Customer is responsible for any damage during rental.
//                       <br />
//                       6. Payments must be completed before pickup.
//                       <br />
//                       7. Any violation of terms may result in fines or
//                       penalties.
//                       <br />
//                       8. Additional terms may apply based on rental agreement.
//                     </p>
//                     <button
//                       onClick={() => setShowTermsModal(false)}
//                       className="absolute top-2 right-2 text-red-500 font-bold"
//                     >
//                       X
//                     </button>
//                   </motion.div>
//                 </div>
//               )}

//               <AnimatePresence>
//                 {showSuccessPopup && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -20, scale: 0.8 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     exit={{ opacity: 0, y: -20, scale: 0.8 }}
//                     transition={{
//                       duration: 0.5,
//                       type: "spring",
//                       stiffness: 300,
//                     }}
//                     className="  bg-gradient-to-r from-green-400 to-green-600 
//                  text-white px-5 py-4 rounded-2xl shadow-2xl z-50 
//                  flex items-center gap-2 border-2 border-white/30"
//                   >
//                     <span className="w-5 h-5 bg-white rounded-full flex justify-center items-center text-green-600 font-bold animate-bounce">
//                       ✓
//                     </span>
//                     <span className="font-semibold text-sm md:text-base">
//                       Booking Successful!
//                     </span>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </>
//           </>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }


import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/603bf261-5d35-45ad-910b-0f2aa855bd2f.png";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// LocationSearch component for India-only autocomplete
const LocationSearch = ({ value, onChange, placeholder }) => {
  const [query, setQuery] = useState(value || "");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce typing
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(handler);
  }, [query]);

  // Fetch suggestions
  useEffect(() => {
    if (!debouncedQuery) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    const fetchLocations = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${debouncedQuery}&countrycodes=IN&addressdetails=1`
        );
        const data = await res.json();
        setSuggestions(data.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [debouncedQuery]);

  const handleSelect = (place) => {
    setQuery(place.display_name);
    setSuggestions([]);
    onChange(place.display_name); // Pass selected value to parent
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
        }}
        className="p-2 rounded bg-transparent border border-gray-400 w-full"
      />
      {loading && (
        <div style={{ position: "absolute", top: "38px", left: "10px" }}>
          🔄 Loading...
        </div>
      )}
      {!loading && suggestions.length > 0 && (
        <div
          style={{
            
            position: "absolute",
            top: "38px",
            width: "100%",
            background: "#000000ff",
            border: "1px solid #ccc",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {suggestions.map((place) => (
            <div
              key={place.place_id}
              onClick={() => handleSelect(place)}
              style={{ padding: "5px", cursor: "pointer" }}
            >
              {place.display_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function Hero() {
  const navigate = useNavigate();
  const [showSelfDriveForm, setShowSelfDriveForm] = useState(false);
  const [cars, setCars] = useState([]);
  const [carTypes, setCarTypes] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [selectedCarData, setSelectedCarData] = useState(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [formData, setFormData] = useState({
    carType: "",
    carModel: "",
    pickup: "",
    drop: "",
    km: "",
    name: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
    duration: "",
    license: "",
    dob: "",
    adhar: "",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Prefill values from localStorage
  useEffect(() => {
    const mode = localStorage.getItem("bookingMode");
    setShowSelfDriveForm(mode === "selfdrive");

    const pickup = localStorage.getItem("pickup");
    const drop = localStorage.getItem("drop");
    if (pickup || drop) {
      setFormData((prev) => ({
        ...prev,
        pickup: pickup || "",
        drop: drop || "",
      }));
      localStorage.removeItem("pickup");
      localStorage.removeItem("drop");
    }

    const savedCar = localStorage.getItem("selectedCar");
    if (savedCar) {
      const carData = JSON.parse(savedCar);
      setFormData((prev) => ({
        ...prev,
        carType: carData.carType || "",
        carModel: carData.carModel || "",
      }));
      localStorage.removeItem("selectedCar");
    }
  }, []);

  // Fetch cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/cars`);
        const data = await response.json();
        setCars(data);
        const types = [...new Set(data.map((car) => car.type))];
        setCarTypes(types);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  // Load saved booking data
  useEffect(() => {
    const mode = localStorage.getItem("bookingMode");
    if (mode === "selfdrive") {
      setShowSelfDriveForm(true);
      const savedSelfDrive = localStorage.getItem("selfDriveBooking");
      if (savedSelfDrive) setFormData(JSON.parse(savedSelfDrive));
    } else {
      setShowSelfDriveForm(false);
      const savedBooking = localStorage.getItem("bookingData");
      if (savedBooking) setFormData(JSON.parse(savedBooking));
    }
    localStorage.removeItem("bookingData");
    localStorage.removeItem("selfDriveBooking");
  }, []);

  // Car Models update
  useEffect(() => {
    if (formData.carType) {
      const models = cars
        .filter((car) => car.type === formData.carType)
        .map((car) => car.model);
      setCarModels(models);
    } else {
      setCarModels([]);
    }
  }, [formData.carType, cars]);

  // Selected Car Data update
  useEffect(() => {
    if (formData.carModel) {
      const car = cars.find(
        (c) => c.type === formData.carType && c.model === formData.carModel
      );
      setSelectedCarData(car || null);
    } else {
      setSelectedCarData(null);
    }
  }, [formData.carModel, formData.carType, cars]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const endpoint = showSelfDriveForm
        ? `${API_BASE_URL}/bookings/self-drive`
        : `${API_BASE_URL}/bookings/cab`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetch(`${API_BASE_URL}/email/send`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: `New booking for ${JSON.stringify(formData)} `,
          }),
        });

        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 5000); // hide after 5 sec
        localStorage.removeItem("selectedCar");

        // reset form
        setFormData({
          carType: "",
          carModel: "",
          pickup: "",
          drop: "",
          km: "",
          name: "",
          email: "",
          phone: "",
          startDate: "",
          endDate: "",
          duration: "",
          license: "",
          dob: "",
          adhar: "",
          location: "",
        });
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fadeInLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1 } },
  };
  const fadeInRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1 } },
  };

  return (
    <section
      className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-between 
                 px-6 md:px-20 bg-black bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Left text */}
      <motion.div
        variants={fadeInLeft}
        initial="hidden"
        animate="visible"
        className="w-full md:w-[45%] text-center md:text-left"
      >
        <h2 className="text-4xl md:text-5xl mt-20 md:mt-0 font-bold leading-tight text-yellow-400">
          Experience the road <br /> like never before.
        </h2>
        <p className="mt-6 md:mt-10 text-gray-300 text-base md:text-[1.3rem]">
          Discover freedom with our premium car rental service. From luxury
          sedans to rugged SUVs, find your perfect driving companion.
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/vehicles")}
          className="mt-8 md:mt-14 px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg"
        >
          View All Cars
        </motion.button>
      </motion.div>

      {/* Right booking form */}
      <motion.div
        variants={fadeInRight}
        initial="hidden"
        animate="visible"
        className="w-full md:w-1/2 flex justify-center relative mt-10 md:mt-0"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="w-full max-w-[450px] p-4 md:p-4 rounded-xl shadow-lg border border-yellow-400 bg-black/30 backdrop-blur-lg"
        >
          <>
            <>
              <h1 className="text-white text-center text-[1.5rem] mb-4">
                Book Now
              </h1>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-full flex justify-center items-center py-2"
              >
                <div className="w-full px-2">
                  {/* Tabs */}
                  <div className="flex justify-between mb-6 text-white font-bold text-lg">
                    <h3
                      className={`cursor-pointer ${
                        !showSelfDriveForm ? "text-yellow-400 underline" : ""
                      }`}
                      onClick={() => setShowSelfDriveForm(false)}
                    >
                      Book Your Cab
                    </h3>
                    <h3
                      className={`cursor-pointer ${
                        showSelfDriveForm ? "text-yellow-400 underline" : ""
                      }`}
                      onClick={() => setShowSelfDriveForm(true)}
                    >
                      Self Drive Car
                    </h3>
                  </div>

                  {/* Conditional Forms */}
                  {!showSelfDriveForm ? (
                    <form
                      className="md:grid grid-cols-2 gap-4 text-white"
                      onSubmit={handleSubmit}
                    >
                      {/* Column 1 */}
                      <div className="flex flex-col gap-3">
                        <label className="text-sm">Car Type</label>
                        <select
                          name="carType"
                          onChange={handleChange}
                          value={formData.carType}
                          className="p-2 rounded border border-gray-400 bg-black"
                          required
                        >
                          <option value="">Select Car Type</option>
                          {carTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>

                        <label className="text-sm">Pickup Location</label>
                        <LocationSearch
                          placeholder="Enter Pickup Location"
                          value={formData.pickup}
                          onChange={(val) =>
                            setFormData({ ...formData, pickup: val })
                          }
                        />

                        <label className="text-sm">Drop Location</label>
                        <LocationSearch
                          placeholder="Enter Drop Location"
                          value={formData.drop}
                          onChange={(val) =>
                            setFormData({ ...formData, drop: val })
                          }
                        />
                      </div>

                      {/* Column 2 */}
                      <div className="flex flex-col gap-3 mt-4 md:mt-0">
                        <label className="text-sm">Your Name</label>
                        <input
                          type="text"
                          name="name"
                          onChange={handleChange}
                          value={formData.name}
                          placeholder="Your Name"
                          className="p-2 rounded bg-transparent border border-gray-400"
                        />

                        <label className="text-sm">Email</label>
                        <input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          value={formData.email}
                          placeholder="Your Email"
                          className="p-2 rounded bg-transparent border border-gray-400"
                        />

                        <label className="text-sm">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          onChange={handleChange}
                          value={formData.phone}
                          placeholder="Phone Number"
                          className="p-2 rounded bg-transparent border border-gray-400"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="col-span-2 w-full  bg-yellow-400 text-black font-bold p-2 rounded-lg mt-4 disabled:opacity-50"
                      >
                        {isLoading ? "Processing..." : "BOOK NOW"}
                      </button>
                    </form>
                  ) : (
                    <form
                      className="sm:grid grid-cols-2 gap-4  text-white"
                      onSubmit={handleSubmit}
                    >
                      <div className="flex flex-col gap-3">
                        <label className="text-sm">Car Type</label>
                        <select
                          name="carType"
                          onChange={handleChange}
                          value={formData.carType}
                          className="p-2 rounded border border-gray-400 bg-black"
                          required
                        >
                          <option value="">Select Car Type</option>
                          {carTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>

                        <label className="text-sm">Driving License No.</label>
                        <input
                          type="text"
                          maxLength={16}
                          name="license"
                          onChange={handleChange}
                          value={formData.license}
                          placeholder="Enter License No."
                          className="p-2 rounded bg-transparent border border-gray-400"
                          required
                        />

                        <label className="text-sm">Email</label>
                        <input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          value={formData.email}
                          placeholder="Your Email"
                          className="p-2 rounded bg-transparent border border-gray-400"
                        />
                      </div>

                      <div className="flex flex-col gap-3 mt-4 md:mt-0">
                        <label className="text-sm">Your Name</label>
                        <input
                          type="text"
                          name="name"
                          onChange={handleChange}
                          value={formData.name}
                          placeholder="Your Name"
                          className="p-2 rounded bg-transparent border border-gray-400"
                          required
                        />
                        <label className="text-sm">Aadhar Number</label>
                        <input
                          type="text"
                          name="adhar"
                          maxLength={12}
                          onChange={handleChange}
                          value={formData.adhar}
                          placeholder="Enter Aadhar No."
                          className="p-2 rounded bg-transparent border border-gray-400"
                          required
                        />

                        <label className="text-sm">Phone Number</label>
                        <input
                          type="number"
                          name="phone"
                          onChange={handleChange}
                          value={formData.phone}
                          placeholder="Your Phone no."
                          className="p-2 rounded bg-transparent border border-gray-400"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="col-span-2 w-full  bg-yellow-400 text-black font-bold p-2 rounded-lg mt-4 disabled:opacity-50"
                      >
                        {isLoading ? "Processing..." : "BOOK SELF DRIVE"}
                      </button>
                    </form>
                  )}

                  <p
                    className="col-span-2 text-sm text-blue-400 underline cursor-pointer mt-4"
                    onClick={() => setShowTermsModal(true)}
                  >
                    Read Terms & Conditions
                  </p>
                </div>
              </motion.div>

              {/* Terms Modal */}
              {showTermsModal && (
                <div className="fixed inset-0  flex justify-center items-center z-50">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto relative"
                  >
                    <h2 className="text-xl font-bold mb-4">
                      Terms & Conditions
                    </h2>
                    <p className="text-l mb-4">
                      1.All toll, highway, and bridge fees incurred during the
                      rental period are the responsibility of the customer.
                      <br></br>
                      2. The car must be returned in the same condition as
                      rented.
                      <br />
                      3. Driver must follow traffic rules.
                      <br />
                      4. Cancellation must be done 24 hours before booking.
                      <br />
                      5. Customer is responsible for any damage during rental.
                      <br />
                      6. Payments must be completed before pickup.
                      <br />
                      7. Any violation of terms may result in fines or
                      penalties.
                      <br />
                      8. Additional terms may apply based on rental agreement.
                    </p>
                    <button
                      onClick={() => setShowTermsModal(false)}
                      className="absolute top-2 right-2 text-red-500 font-bold"
                    >
                      X
                    </button>
                  </motion.div>
                </div>
              )}

              {/* Success Popup */}
              <AnimatePresence>
                {showSuccessPopup && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.8 }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 300,
                    }}
                    className="  bg-gradient-to-r from-green-400 to-green-600 
                 text-white px-5 py-4 rounded-2xl shadow-2xl z-50 
                 flex items-center gap-2 border-2 border-white/30"
                  >
                    <span className="w-5 h-5 bg-white rounded-full flex justify-center items-center text-green-600 font-bold animate-bounce">
                      ✓
                    </span>
                    <span className="font-semibold text-sm md:text-base">
                      Booking Successful!
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          </>
        </motion.div>
      </motion.div>
    </section>
  );
}
