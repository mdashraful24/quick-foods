import { useNavigate } from 'react-router-dom';
import catering from '../../../src/assets/catering.jpg'

const Catering = () => {
    window.scrollTo(0, 0);
    const navigate = useNavigate();

    // Function to handle button click and navigate to respective routes
    const handleCatering = () => {
        navigate('/providers');
    };

    return (
        <div className="container mx-auto px-5 mt-24">
            {/* Catering Image */}
            <div className="w-full h-full mb-10">
                <img
                    src={catering}
                    alt="Catering"
                    className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
            </div>

            {/* Catering Details Section */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Our Catering Services
                </h2>
                <p className="text-lg md:w-2/3 mx-auto">
                    We provide top-notch catering services for all occasions, whether it's a corporate event, a wedding, or a private party. Our team of expert chefs prepares a wide variety of delicious dishes to cater to all tastes and dietary requirements. From appetizers to desserts, we ensure an unforgettable dining experience for you and your guests.
                </p>
            </div>

            {/* Catering Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300">
                    <h3 className="text-xl font-semibold mb-4">Customizable Menus</h3>
                    <p>
                        Choose from a variety of menu options and customize it to fit the theme and dietary needs of your event.
                    </p>
                </div>
                {/* Feature 2 */}
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300">
                    <h3 className="text-xl font-semibold mb-4">Experienced Team</h3>
                    <p>
                        Our catering team is highly experienced in providing exceptional service and creating memorable experiences.
                    </p>
                </div>
                {/* Feature 3 */}
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300">
                    <h3 className="text-xl font-semibold mb-4">Delivery & Setup</h3>
                    <p>
                        We offer delivery and setup services to ensure everything is ready for your event without the hassle.
                    </p>
                </div>
            </div>

            {/* Contact or Booking Section */}
            <div className="text-center mt-16 mb-16">
                <h3 className="text-2xl font-semibold mb-4">Ready to Book?</h3>
                <p className="text-lg mb-6">
                    Contact us today to discuss your event details, or request a quote for your upcoming catering needs.
                </p>
                <button onClick={handleCatering} className="bg-[#E23744] text-white py-2 px-6 rounded-full transition duration-300">
                    Explore Providers
                </button>
            </div>
        </div>
    );
};

export default Catering;
