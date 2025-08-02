// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
// import { NavLink } from "react-router-dom";
// import banner from '../../src/assets/banner-image2.png'
// import banner2 from '../../src/assets/food-9.png'
// import banner3 from '../../src/assets/food-10.png'

// const Banner = () => {
//     return (
//         <div>
//             <section className="relative font-lora mb-16">
//                 {/* Carousel Section */}
//                 <Carousel
//                     infiniteLoop
//                     useKeyboardArrows
//                     autoPlay
//                     showThumbs={false}
//                     showStatus={false}
//                     showIndicators={false}
//                     swipeable
//                     emulateTouch
//                     interval={3000}
//                     transitionTime={1000}
//                     stopOnHover
//                     renderArrowPrev={(clickHandler) => (
//                         <button
//                             className="absolute top-1/2 left-5 md:left-10 lg:left-20 transform -translate-y-1/2 bg-transparent p-2 md:p-5 rounded-full shadow-xl z-10 md:w-12 md:h-12 flex items-center justify-center opacity-75 hover:opacity-100 transition-opacity"
//                             onClick={clickHandler}
//                         >
//                             <span className=" text-xl md:text-2xl"><SlArrowLeft /></span>
//                         </button>
//                     )}
//                     renderArrowNext={(clickHandler) => (
//                         <button
//                             className="absolute top-1/2 right-5 md:right-10 lg:right-20 transform -translate-y-1/2 bg-transparent hover:bg-[#3CB815] p-2 md:p-5 rounded-full shadow-lg z-10 md:w-12 md:h-12 flex items-center justify-center opacity-75 hover:opacity-100 transition-opacity"
//                             onClick={clickHandler}
//                         >
//                             <span className="text-white text-xl md:text-2xl"><SlArrowRight /></span>
//                         </button>
//                     )}
//                 >
//                     {/* 1st Swiper */}
//                     <div>
//                         <img
//                             src={banner}
//                             alt="Banner 1"
//                             className="w-full h-[300px] sm:h-[400px] md:h-[500px]  lg:h-[750px]"
//                         />
//                         {/* Title and Button Section */}
//                         <div className="absolute inset-0 flex items-center pl-12 sm:pl-24 md:pl-32 lg:pl-40">
//                             <div className="text-left text-gray-800 ml-3 md:ml-0 space-y-6">
//                                 <h1 className="text-xl md:text-3xl lg:text-6xl font-bold w-6/12 md:w-7/12 lg:w-8/12" >
//                                     Organic Food Is Good For Health
//                                 </h1>
//                                 <div className="flex space-x-4">
//                                     <NavLink to='/providers'><button className="bg-[#3CB815] text-white font-semibold px-6 py-2 md:px-10 md:py-3 rounded-full hover:bg-green-500 transition">
//                                         Provider
//                                     </button></NavLink>
//                                     <button className="bg-[#F65005] text-white font-semibold px-6 py-2 md:px-10 md:py-3 rounded-full hover:bg-orange-500 transition">
//                                         Services
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     {/* 2nd Swiper */}
//                     <div>
//                         <img
//                             src={banner2}
//                             alt="Banner 2"
//                             className="w-full h-[300px] sm:h-[400px] md:h-[500px]  lg:h-[750px]"
//                         />
//                         {/* Title and Button Section */}
//                         <div className="absolute inset-0 flex items-center pl-12 sm:pl-24 md:pl-32 lg:pl-40">
//                             <div className="text-left text-gray-800 ml-3 md:ml-0 space-y-6">
//                                 <h1 className="text-xl md:text-3xl lg:text-6xl font-bold w-6/12 md:w-7/12 lg:w-8/12" >
//                                     Organic Food Is Good For Health
//                                 </h1>
//                                 <div className="flex space-x-4">
//                                     <NavLink to='/providers'><button className="bg-[#3CB815] text-white font-semibold px-6 py-2 md:px-10 md:py-3 rounded-full hover:bg-green-500 transition">
//                                         Provider
//                                     </button></NavLink>
//                                     <button className="bg-[#F65005] text-white font-semibold px-6 py-2 md:px-10 md:py-3 rounded-full hover:bg-orange-500 transition">
//                                         Services
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     {/* 3rd Swiper */}
//                     <div>
//                         <img
//                             src={banner3}
//                             alt="Banner 3"
//                             className="w-full h-[300px] sm:h-[400px] md:h-[500px]  lg:h-[750px]"
//                         />
//                         {/* Title and Button Section */}
//                         <div className="absolute inset-0 flex items-center pl-12 sm:pl-24 md:pl-32 lg:pl-40">
//                             <div className="text-left text-gray-800 ml-3 md:ml-0 space-y-6">
//                                 <h1 className="text-xl md:text-3xl lg:text-6xl font-bold w-6/12 md:w-7/12 lg:w-8/12" >
//                                     Organic Food Is Good For Health
//                                 </h1>
//                                 <div className="flex space-x-4">
//                                     <button className="bg-[#3CB815] text-white font-semibold px-6 py-2 md:px-10 md:py-3 rounded-full hover:bg-green-500 transition">
//                                         Products
//                                     </button>
//                                     <button className="bg-[#F65005] text-white font-semibold px-6 py-2 md:px-10 md:py-3 rounded-full hover:bg-orange-500 transition">
//                                         Services
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </Carousel>
//             </section>
//         </div>
//     );
// };

// export default Banner;

