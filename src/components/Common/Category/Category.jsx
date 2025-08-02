import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { FiArrowRight } from 'react-icons/fi';

// Import your images
import slide1 from '../../../assets/category/slide1.jpg';
import slide2 from '../../../assets/category/slide2.jpg';
import slide3 from '../../../assets/category/slide3.jpg';
import slide4 from '../../../assets/category/slide4.jpg';
import slide5 from '../../../assets/category/slide5.jpg';

const categories = [
    {
        id: 1,
        image: slide1,
        title: 'Salads',
        description: 'Fresh, healthy and delicious salad options'
    },
    {
        id: 2,
        image: slide2,
        title: 'Pizzas',
        description: 'Authentic Italian pizzas with premium toppings'
    },
    {
        id: 3,
        image: slide3,
        title: 'Soups',
        description: 'Comforting soups made with seasonal ingredients'
    },
    {
        id: 4,
        image: slide4,
        title: 'Desserts',
        description: 'Decadent desserts to satisfy your sweet tooth'
    },
    {
        id: 5,
        image: slide5,
        title: 'Drinks',
        description: 'Refreshing beverages to complement your meal'
    }
];

const Category = () => {
    return (
        <section className="relative py-16 md:py-24 lg:py-32">
            <div className="container mx-auto px-3">
                <div className='text-center mb-10 lg:mb-12'>
                    <h2 className="text-3xl md:text-5xl font-extrabold uppercase mb-5">
                        Starters / Appetizers
                    </h2>
                    <p className="max-w-4xl mx-auto">
                        From fresh salads to delicious pizzas, comforting soups to indulgent desserts, and refreshing beverages — we’ve got something for every craving. Browse our popular categories and order your favorites online in just a few clicks.
                    </p>
                </div>

                <Swiper
                    modules={[Pagination, Autoplay, EffectFade]}
                    spaceBetween={30}
                    slidesPerView={1}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 40
                        }
                    }}
                    className="category-swiper"
                >
                    {categories.map((category) => (
                        <SwiperSlide key={category.id}>
                            <div className="relative group overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl">
                                <div className="relative h-96 overflow-hidden">
                                    <img
                                        src={category.image}
                                        alt={category.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transition-all duration-500 group-hover:bottom-5">
                                    <h3 className="text-2xl font-bold mb-1">{category.title}</h3>
                                    <p className="text-sm opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500">
                                        {category.description}
                                    </p>
                                    <button className="mt-3 flex items-center text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        Explore Menu <FiArrowRight className="ml-2" />
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* <div className="text-end my-12">
                    <button className="inline-flex items-center px-5 py-3 bg-[#E23744] text-white font-medium rounded-full hover:bg-[#c5313d] transition-colors duration-300 shadow-lgl">
                        View Full Menu
                        <FiArrowRight className="ml-2" />
                    </button>
                </div> */}
            </div>
        </section>
    );
};

export default Category;