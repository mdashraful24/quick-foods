import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import banner from "../../../assets/banner.png";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const HeroSection = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200,
            once: true,
            easing: 'ease-in-out-quad'
        });
    }, []);

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Image with Dark Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${banner})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-30 shadow-[inset_0_-80px_60px_-30px_rgba(0,0,0,0.7)] backdrop-brightness-80"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
                {/* <Navbar /> */}

                <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-3 text-center">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <h1
                            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-extrabold text-white drop-shadow-lg"
                            data-aos="fade-right"
                            data-aos-delay="500"
                        >
                            QUICK
                        </h1>
                        <h1
                            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-extrabold text-white drop-shadow-lg"
                            data-aos="fade-left"
                            data-aos-delay="500"
                        >
                            FOODS
                        </h1>
                    </div>

                    <p
                        className="mt-8 text-xl md:text-2xl text-white max-w-2xl drop-shadow-md"
                        data-aos="fade-up"
                        data-aos-delay="800"
                    >
                        Discover the fastest way to your favorite meals
                    </p>

                    <Link
                        to="/providers"
                        className="mt-12 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                        data-aos="fade-up"
                        data-aos-delay="1000"
                    >
                        Order Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;