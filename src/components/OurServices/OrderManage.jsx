import { useNavigate } from "react-router-dom";

const OrderManage = () => {
    window.scrollTo(0, 0);
    const navigate = useNavigate();

    // Function to handle button click and navigate to respective routes
    const handleOrderManage = () => {
        navigate('/order');
    };


    return (
        <div className="container mx-auto px-5 mt-24">
            {/* Order Management Header Section */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Order Management System
                </h2>
                <p className="text-lg md:w-2/3 mx-auto">
                    Our Order Management System makes it easy for you to place, track, and manage orders. Whether you're a customer placing an order or a business managing multiple requests, our system ensures smooth and efficient processing of every order.
                </p>
            </div>

            {/* How It Works Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {/* Step 1 */}
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300">
                    <h3 className="text-xl font-semibold mb-4">Place Your Order</h3>
                    <p>
                        Easily browse through our menu, select your items, and place your order with a few clicks. It's simple and hassle-free.
                    </p>
                </div>
                {/* Step 2 */}
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300">
                    <h3 className="text-xl font-semibold mb-4">Order Processing</h3>
                    <p>
                        Once your order is placed, our system automatically processes it and assigns it to the right team for preparation.
                    </p>
                </div>
                {/* Step 3 */}
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300">
                    <h3 className="text-xl font-semibold mb-4">Track Your Order</h3>
                    <p>
                        Stay updated on the status of your order in real-time. You will receive notifications as your order moves through each stage.
                    </p>
                </div>
            </div>

            {/* Features of Order Management */}
            <div className="text-center mb-12">
                <h2 className="text-2xl font-semibold mb-6">
                    Key Features of Our Order Management System
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300">
                        <h3 className="text-xl font-semibold mb-4">Real-Time Order Tracking</h3>
                        <p>
                            Track your order status in real-time from the moment it's placed until it's delivered to your door.
                        </p>
                    </div>
                    {/* Feature 2 */}
                    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300">
                        <h3 className="text-xl font-semibold mb-4">Easy Reordering</h3>
                        <p>
                            Quickly reorder your favorite items with one click. Our system remembers your previous orders.
                        </p>
                    </div>
                    {/* Feature 3 */}
                    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300">
                        <h3 className="text-xl font-semibold mb-4">Order History</h3>
                        <p>
                            View all your previous orders, including details on items, quantities, and prices, with the option to reorder easily.
                        </p>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="text-center mt-16 mb-16">
                <h3 className="text-2xl font-semibold mb-4">Start Managing Your Orders Today</h3>
                <p className="text-lg mb-6">
                    Ready to streamline your ordering process? Start using our Order Management System today and enjoy easy, fast, and efficient order handling.
                </p>
                <button onClick={handleOrderManage} className="bg-[#E23744] text-white py-2 px-6 rounded-full transition duration-300">
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default OrderManage;