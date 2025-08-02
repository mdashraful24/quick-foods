import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { useContext } from 'react';
import { ProviderContext } from '../../../Provider/CateringProviders';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ReviewCard = ({ review }) => {
    return (
        <motion.div
            className="h-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-red-600/20"
            whileHover={{ y: -5 }}
        >
            <div className="p-8 h-60 flex flex-col">
                {/* Rating */}
                <div className="flex justify-center mb-4">
                    {Array(5).fill(0).map((_, i) => (
                        <FaStar
                            key={i}
                            className={`text-xl ${i < review.rating ? 'text-red-600' : ''}`}
                        />
                    ))}
                </div>

                {/* Quote */}
                <div className="relative mb-6">
                    <FaQuoteLeft className="absolute -top-2 left-0 text-3xl text-red-600/20" />
                    <p className="italic pl-10 text-lg leading-relaxed">
                        {review.comment}
                    </p>
                </div>

                {/* Customer Info */}
                <div className="mt-auto pt-4 border-t border-gray-300 flex items-center">
                    <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                        {review.customer.charAt(0)}
                    </div>
                    <div className="ml-4">
                        <h3 className="font-semibold">{review.customer}</h3>
                        <p className="text-sm">Verified Customer</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const CustomerReviews = () => {
    const { providers } = useContext(ProviderContext);

    // Flatten and sort reviews
    const topReviews = providers
        .flatMap(provider => provider.reviews || [])
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8);

    return (
        <section className="py-16 md:py-24 lg:py-32">
            <div className="container mx-auto px-3">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 lg:mb-12"
                >
                    <div className="text-center">
                        <h1 className="text-3xl md:text-5xl font-extrabold uppercase">
                            What Our Customers Say
                        </h1>
                        <p className="mt-5 max-w-xl mx-auto">
                            Don’t just take our word for it see why our customers rave about our top-quality catering services!
                        </p>
                    </div>
                </motion.div>

                {topReviews.length > 0 ? (
                    <Swiper
                        modules={[Pagination, Autoplay, EffectCoverflow]}
                        effect="coverflow"
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView="auto"
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                            slideShadows: false,
                        }}
                        spaceBetween={30}
                        loop={true}
                        autoplay={{
                            delay: 1500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: {
                                slidesPerView: 3,
                                coverflowEffect: {
                                    rotate: 0,
                                    stretch: -50,
                                    depth: 100,
                                    modifier: 2,
                                }
                            },
                        }}
                        className="pb-12"
                    >
                        {topReviews.map((review, index) => (
                            <SwiperSlide
                                key={index}
                                className="max-w-sm mx-auto"
                            >
                                <ReviewCard review={review} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            No reviews available yet. Be the first to review!
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CustomerReviews;