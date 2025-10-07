
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/home";
import Contact from "./pages/Contact";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Vehicles from "./pages/Vehicles";

import About from "./pages/About";
import AdminPanel from "./component/admin/adminpanel";
import BookingForm from "./component/Booking";
import FloatingButtons from "./component/Floatingbuttons";
import Loader from "./component/loader";
import Gallery from "./pages/Gallery";

function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust time as needed for loader animation

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles" element={<Vehicles />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />

        {/* Admin route */}
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/bookingform" element={<BookingForm />} />
      </Routes>
      <FloatingButtons />
      <Footer />
    </>
  );
} 

export default App;




