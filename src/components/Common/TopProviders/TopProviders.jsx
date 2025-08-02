import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../hook/useAxiosPublic';
import TopProvider from './TopProvider';
import { FiLoader } from 'react-icons/fi';

const TopProviders = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    // Fetch providers with enhanced error handling
    const { data: providersData, isLoading, error } = useQuery({
        queryKey: ['top-providers'],
        queryFn: async () => {
            try {
                // console.log('Fetching providers data...');
                const response = await axiosPublic.get('/providers');

                // console.log('API Response:', {
                //     status: response.status,
                //     data: response.data,
                //     headers: response.headers
                // });

                if (!response.data) {
                    throw new Error('No data received from server');
                }

                return response.data;
            } catch (err) {
                console.error('Error fetching providers:', {
                    message: err.message,
                    response: err.response?.data,
                    stack: err.stack
                });
                throw err;
            }
        },
        retry: 1, // Will retry failed requests 1 time
        refetchOnWindowFocus: false
    });

    // Loading state
    if (isLoading) return (
        <div className="flex flex-col justify-center items-center h-60 gap-2">
            <FiLoader className="animate-spin text-4xl text-[#E23744]" />
            <p className="text-gray-600">Loading top providers...</p>
        </div>
    );

    // Error state
    if (error) {
        console.error('Render error:', error);
        return (
            <div className="flex flex-col justify-center items-center h-60 gap-2">
                <p className="text-center text-red-500 text-lg">
                    Failed to load providers. Please try again later.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="text-white py-1 px-4 rounded bg-[#E23744] hover:bg-[#c5313d]"
                >
                    Retry
                </button>
            </div>
        );
    }

    // Safely handle data
    const providers = Array.isArray(providersData) ? providersData : [];
    // console.log('Processed providers:', providers);

    // Filter and sort providers
    const sortedProviders = providers
        .filter((item) => {
            const isValid = item?.rating >= 4.5 && item?.status === 'approved';
            if (!isValid) {
                console.warn('Excluded provider:', item);
            }
            return isValid;
        })
        .sort((a, b) => b.rating - a.rating);

    const topRatedProviders = sortedProviders.slice(0, 6);
    // console.log('Top rated providers:', topRatedProviders);

    const handleSeeMore = () => navigate('/providers');

    return (
        <div className="container mx-auto px-3 pt-16 md:pt-24 lg:pt-32">
            <div className='text-center mb-10 lg:mb-12'>
                <h2 className="text-3xl md:text-5xl font-extrabold uppercase mb-5">
                    Most Rated Providers
                </h2>
                <p className="max-w-4xl mx-auto">
                    Explore our top-rated service providers, highly praised for their exceptional quality, reliability, and customer satisfaction. These professionals have earned outstanding reviews and continue to deliver excellence in every service they offer.
                </p>
            </div>

            {topRatedProviders.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {topRatedProviders.map((item) => (
                            <TopProvider
                                key={item._id}
                                id={item._id}
                                name={item.name}
                                rating={item.rating}
                                image={item.image}
                                serviceArea={item.service_area}
                                cateringTypes={item.catering_types}
                            />
                        ))}
                    </div>

                    {providers.length > 6 && (
                        <div className="flex justify-center mt-10">
                            <button
                                onClick={handleSeeMore}
                                className="text-white py-3 px-8 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 shadow-xl hover:scale-105 transition-all duration-300 font-medium"
                            >
                                View All Providers
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg mb-4">
                        No top-rated providers available at the moment.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="text-[#E23744] border border-[#E23744] py-2 px-6 rounded-lg hover:bg-[#E23744] hover:text-white transition-colors"
                    >
                        Refresh
                    </button>
                </div>
            )}
        </div>
    );
};

export default TopProviders;
