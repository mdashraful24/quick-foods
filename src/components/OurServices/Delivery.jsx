import { useNavigate } from 'react-router-dom';
import catering from '../../../src/assets/catering.jpg'

const Delivery = () => {
    window.scrollTo(0, 0);
    const navigate = useNavigate();

    const handleCatering = () => {
        navigate('/order');
    };

    return (
        <div className="container mx-auto px-5 mt-24">
            {/* Delivery Image */}
            <div className="w-full mb-10">
                <img
                    src={catering}
                    alt="Delivery"
                    className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
            </div>

            {/* Delivery Details Section */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Our Delivery Services
                </h2>
                <p className="text-lg md:w-2/3 mx-auto">
                    Our delivery service is designed to ensure timely and safe delivery of your orders. Whether you're hosting an event or just need a quick meal delivered to your home, we ensure that every delivery is handled with the utmost care and attention to detail. Fast, reliable, and convenient – we bring the best food straight to your door.
                </p>
            </div>

            {/* Delivery Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300">
                    <h3 className="text-xl font-semibold mb-4">Timely Deliveries</h3>
                    <p>
                        We pride ourselves on punctuality, ensuring your food is delivered at the exact time you expect.
                    </p>
                </div>
                {/* Feature 2 */}
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300">
                    <h3 className="text-xl font-semibold mb-4">Safe & Secure Packaging</h3>
                    <p>
                        Our packaging ensures that your food remains fresh and secure during transit, with no mess.
                    </p>
                </div>
                {/* Feature 3 */}
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300">
                    <h3 className="text-xl font-semibold mb-4">Wide Delivery Area</h3>
                    <p>
                        We deliver to a wide range of areas, ensuring you can enjoy our food no matter where you are.
                    </p>
                </div>
            </div>

            {/* Contact or Order Now Section */}
            <div className="text-center mt-16 mb-16">
                <h3 className="text-2xl font-semibold mb-4">Place Your Order Now</h3>
                <p className="text-lg mb-6">
                    Ready to experience our delivery service? Place your order today and get your food delivered fast and fresh.
                </p>
                <button onClick={handleCatering} className="bg-[#E23744] text-white py-2 px-6 rounded-full transition duration-300">
                    Order Now
                </button>
            </div>
        </div>
    );
};

export default Delivery;
