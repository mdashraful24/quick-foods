import { useNavigate } from 'react-router-dom';
import bgAbout from '../../../assets/bg-icon.png';
import catering from '../../../assets/icon-1.png';
import order from '../../../assets/icon-5.png';
import service from '../../../assets/link.png';

const Services = () => {
    const navigate = useNavigate();

    const services = [
        {
            id: 1,
            title: "Catering",
            description: "Professional catering services for all occasions with customized menus to suit your event needs.",
            icon: catering,
            route: '/catering',
            bgColor: 'bg-[#FFF5F5]'
        },
        {
            id: 2,
            title: "Order Management",
            description: "Streamline your orders with our intuitive management tool for seamless operations.",
            icon: order,
            route: '/orderManage',
            bgColor: 'bg-[#F5F9FF]'
        },
        {
            id: 3,
            title: "Delivery",
            description: "Reliable and timely delivery services to bring your orders right to your doorstep.",
            icon: service,
            route: '/delivery',
            bgColor: 'bg-[#F8F5FF]'
        }
    ];

    const handleClick = (route) => {
        navigate(route);
    };

    return (
        <div
            className="hero hero-overlay bg-fixed bg-opacity-10 py-16 md:py-20"
            style={{
                backgroundImage: `url(${bgAbout})`,
            }}>
            
            <div className="container mx-auto px-3">
                {/* Section header */}
                <div className='text-center mb-10 lg:mb-12'>
                    <h2 className="text-3xl md:text-5xl font-extrabold uppercase mb-3">
                        Our Premium Services
                    </h2>
                    <p className="max-w-4xl mx-auto">
                        Exceptional solutions tailored to meet your catering and delivery needs with professionalism and care.
                    </p>
                </div>

                {/* Services grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className={`relative group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${service.bgColor}`}
                        >
                            <div className="p-8">
                                {/* Icon container */}
                                <div className="mb-6 w-20 h-20 mx-auto rounded-2xl bg-white flex items-center justify-center shadow-md group-hover:bg-[#E23744] group-hover:scale-110 transition-all duration-300">
                                    <img
                                        src={service.icon}
                                        alt={service.title}
                                        className="w-12 h-12 object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300"
                                    />
                                </div>

                                {/* Content */}
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                                    <p className="text-gray-600 mb-6">{service.description}</p>
                                    <button
                                        onClick={() => handleClick(service.route)}
                                        className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-[#E23744] hover:bg-[#c5313d] shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                                    >
                                        Read More
                                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Decorative element */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E23744] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    ))}
                </div>

                {/* CTA section */}
                <div className="mt-16 text-center">
                    <p className="text-gray-600 mb-6">Have special requirements?</p>
                    <button
                        onClick={() => navigate('/contact')}
                        className="inline-flex items-center px-8 py-3 border border-[#E23744] text-lg font-bold rounded-full text-[#E23744] hover:text-white hover:bg-[#E23744] transition-colors duration-300"
                    >
                        Contact Us
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Services;
