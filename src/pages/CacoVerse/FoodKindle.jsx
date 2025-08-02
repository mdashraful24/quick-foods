import { motion } from "framer-motion";

const FoodKindle = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <motion.div
                className="text-center p-8 bg-white rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                    Upcoming Events
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                    Stay tuned for exciting updates and new arrivals!
                </p>
                <a href="/" className="text-red-600 hover:font-bold">Go to CaCo.</a>
            </motion.div>
        </div>
    );
};

export default FoodKindle;
