import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const PolicyPage = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-16 py-12 flex flex-col items-center">
      {/* Header */}
      <motion.h1
        className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Car Rental App – Policies & Feedback
      </motion.h1>

      <div className="w-full max-w-4xl space-y-10">
        {/* Terms & Conditions */}
        <motion.section
          className="rounded-2xl bg-[#1a1a1a] shadow-lg shadow-yellow-900/30 p-6 border border-yellow-700/30 hover:scale-[1.02] transition-transform"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
        >
          <h2 className="text-2xl font-semibold mb-3 text-yellow-400">
            Terms & Conditions
          </h2>
          <p className="text-gray-300 leading-relaxed">
            By using our Car Rental services, you agree to comply with our
            rental terms. Drivers must possess a valid driving license and meet
            the minimum age requirement of 21 years. All vehicles must be
            returned in the same condition as rented. Late returns may incur
            additional charges. We reserve the right to cancel bookings due to
            unforeseen circumstances or policy violations.
          </p>
        </motion.section>

        {/* Privacy Policy */}
        <motion.section
          className="rounded-2xl bg-[#1a1a1a] shadow-lg shadow-yellow-900/30 p-6 border border-yellow-700/30 hover:scale-[1.02] transition-transform"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
        >
          <h2 className="text-2xl font-semibold mb-3 text-yellow-400">
            Privacy Policy
          </h2>
          <p className="text-gray-300 leading-relaxed">
            We value your privacy and ensure that all personal information
            provided by you (such as name, contact, and ID proof) is securely
            stored and not shared with third parties without consent. We use
            cookies and analytics to improve user experience and booking
            efficiency. Payment details are processed securely via encrypted
            gateways.
          </p>
        </motion.section>

        {/* Cancellation Policy */}
        <motion.section
          className="rounded-2xl bg-[#1a1a1a] shadow-lg shadow-yellow-900/30 p-6 border border-yellow-700/30 hover:scale-[1.02] transition-transform"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
        >
          <h2 className="text-2xl font-semibold mb-3 text-yellow-400">
            Cancellation Policy
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Users can cancel bookings up to 24 hours before the scheduled pickup
            time for a full refund. Cancellations made within 24 hours of pickup
            may result in partial deductions. In case of non-show or late
            cancellation, the booking amount will not be refunded. Refunds will
            be processed within 5–7 business days.
          </p>
        </motion.section>

        {/* Feedback */}
        <motion.section
          className="rounded-2xl bg-[#1a1a1a] shadow-lg shadow-yellow-900/30 p-6 border border-yellow-700/30 hover:scale-[1.02] transition-transform"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
        >
          <h2 className="text-2xl font-semibold mb-3 text-yellow-400">
            Feedback
          </h2>
          <p className="text-gray-300 leading-relaxed">
            We value your experience! Please share your feedback, suggestions,
            or complaints with us to help improve our services. Your input
            allows us to enhance our car collection, booking system, and
            customer support. Email us anytime at{" "}
            <span className="text-yellow-400">email@gmail.com</span>.
          </p>
        </motion.section>
      </div>

      {/* Footer */}
    
    </div>
  );
};

export default PolicyPage;
