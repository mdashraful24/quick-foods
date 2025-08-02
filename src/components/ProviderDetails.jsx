import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { FaArrowLeft, FaMapMarkerAlt, FaPhone, FaRegStar, FaStar } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { FiLoader } from 'react-icons/fi';
import useAxiosPublic from '../hook/useAxiosPublic';
import Rating from 'react-rating';

const ProviderDetails = () => {
    window.scrollTo(0, 0);
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [showFullServiceArea, setShowFullServiceArea] = useState(false);

    // React Query fetch
    const { data: providers = [], isLoading, isError, error } = useQuery({
        queryKey: ['providers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/providers');
            return res.data;
        },
        onError: () => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch providers. Please try again later.',
            });
        }
    });

    const provider = providers.find((p) => p._id === id);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <FiLoader className="animate-spin text-4xl text-[#E23744]" />
            </div>
        );
    }

    if (isError || !provider) {
        return <h2 className="text-center mt-28">Provider not found</h2>;
    }

    const serviceAreaArray = Array.isArray(provider.service_area)
        ? provider.service_area
        : [provider.service_area];

    const initialServiceAreas = serviceAreaArray.slice(0, 4);
    const serviceAreasToShow = showFullServiceArea ? serviceAreaArray : initialServiceAreas;

    const toggleServiceArea = () => {
        setShowFullServiceArea(!showFullServiceArea);
    };

    return (
        <div className='container mx-auto mt-24 mb-16 px-4'>
            <Helmet>
                <title>{provider.name} | Quick Foods</title>
                <meta name="description" content={`Details for ${provider.name} catering service`} />
            </Helmet>

            <h3 className="text-3xl md:text-4xl font-bold mb-3">
                Catering Providers Details
            </h3>

            {/* Header with back button */}
            <div>
                <Link to="/providers" className="flex items-center font-medium text-[#E23744] hover:text-[#C5313D]">
                    <FaArrowLeft className="mr-2" />
                    Back to Providers
                </Link>
            </div>

            {/* Main Content */}
            <div className="py-5">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white border rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
                        {/* Image Section */}
                        <div className="lg:w-10/12 h-72 md:h-[500px] lg:h-[600px] relative">
                            <img
                                src={provider.image || '/default-catering.jpg'}
                                alt={provider.name}
                                className="w-full h-full"
                                onError={(e) => {
                                    e.target.src = '/default-catering.jpg';
                                }}
                            />
                            {provider.isPremium && (
                                <div className="absolute top-4 left-4 bg-[#E23744] text-white py-1 px-3 rounded-full text-xs font-bold shadow-md">
                                    PREMIUM
                                </div>
                            )}
                        </div>

                        {/* Details Section */}
                        <div className="lg:w-7/12 py-5 px-5 md:px-10 space-y-5">
                            {/* Title & Rating */}
                            <div className="mb-6">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                                    {provider.name}
                                </h1>
                                <div className="flex items-center">
                                    <Rating
                                        initialRating={provider.rating}
                                        emptySymbol={<span className="text-gray-300 text-2xl">★</span>}
                                        fullSymbol={<span className="text-red-500 text-2xl">★</span>}
                                        readonly
                                    />
                                    <span className="ml-2 text-gray-600">
                                        ({(provider.rating || 0).toFixed(1)})
                                    </span>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <FaMapMarkerAlt className="text-[#E23744] mt-1 mr-3 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-gray-700">Address</h3>
                                        <p className="text-gray-600">
                                            {provider.location?.address || 'N/A'}, {provider.location?.city || 'N/A'}, {provider.location?.postal_code || 'N/A'}
                                        </p>
                                    </div>
                                </div>

                                {/* Phone Number */}
                                <div className="flex items-start">
                                    <FaPhone className="text-[#E23744] mt-1 mr-3 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-gray-700">Phone</h3>
                                        <p className="text-gray-600">
                                            {provider.contact?.phone || 'N/A'}
                                        </p>
                                    </div>
                                </div>

                                {/* Mail */}
                                <div className="flex items-start">
                                    <IoMdMail className="text-[#E23744] text-lg mt-1 mr-3 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-gray-700">Email</h3>
                                        <p className="text-gray-600">
                                            {provider.contact?.email || 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Catering Types */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Catering Types</h3>
                                {provider.catering_types?.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {provider.catering_types.map((type, index) => (
                                            <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                                {type}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No catering types specified</p>
                                )}
                            </div>

                            {/* Service Areas */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Areas</h3>
                                {provider.service_area?.length > 0 ? (
                                    <>
                                        <div className="flex flex-wrap gap-2">
                                            {serviceAreasToShow.map((area, index) => (
                                                <span key={index} className="bg-gray-100 px-3 py-1 rounded-full font-medium">
                                                    {area}
                                                </span>
                                            ))}
                                        </div>
                                        {/* {provider.service_area.length > 4 && (
                                            <button
                                                onClick={toggleServiceArea}
                                                className="mt-3 text-[#E23744] text-sm font-medium hover:underline flex items-center"
                                            >
                                                {showFullServiceArea ? 'Show less' : `Show all (${provider.service_area.length})`}
                                            </button>
                                        )} */}
                                    </>
                                ) : (
                                    <p className="text-gray-500">No service areas specified</p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href={`tel:${provider.contact?.phone}`}
                                    className="border border-[#E23744] text-[#E23744] hover:bg-[#E23744] hover:text-white py-3 px-6 rounded-lg font-medium transition-colors text-center"
                                >
                                    Contact Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderDetails;







// ⚠️ Reserve Code. Don't remove without permission
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
// import Swal from 'sweetalert2';
// import { FaArrowLeft, FaMapMarkerAlt, FaPhone, FaRegStar, FaStar } from 'react-icons/fa';
// import { IoMdMail } from 'react-icons/io';
// import { FiLoader } from 'react-icons/fi';

// const ProviderDetails = () => {
//     window.scrollTo(0, 0);
//     const { id } = useParams(); // Get the `_id` from the URL params
//     const [providers, setProviders] = useState([]);
//     const [provider, setProvider] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // State to manage whether full service area is visible
//     const [showFullServiceArea, setShowFullServiceArea] = useState(false);

//     // Fetch all providers from the API
//     useEffect(() => {
//         fetch('https://quick-foods-server.vercel.app/providers')
//             .then((res) => {
//                 if (!res.ok) {
//                     throw new Error('Failed to fetch providers');
//                 }
//                 return res.json();
//             })
//             .then((data) => {
//                 setProviders(data);
//                 const foundProvider = data.find((p) => p._id === id);
//                 if (foundProvider) {
//                     setProvider(foundProvider);
//                 } else {
//                     setError('Provider not found');
//                 }
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error('Error fetching providers:', error);
//                 setError(error.message);
//                 setLoading(false);
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error',
//                     text: 'Failed to fetch providers. Please try again later.',
//                 });
//             });
//     }, [id]);

//     if (loading) return (
//         <div className="flex justify-center items-center min-h-screen">
//             <FiLoader className="animate-spin text-4xl text-[#E23744]" />
//         </div>
//     );

//     if (error || !provider) {
//         return <h2 className="text-center mt-28">Provider not found</h2>;
//     }

//     // Ensure `service_area` is defined before slicing
//     const initialServiceAreas = provider.service_area ? provider.service_area.slice(0, 4) : [];
//     const serviceAreasToShow = showFullServiceArea ? provider.service_area : initialServiceAreas;

//     const toggleServiceArea = () => {
//         setShowFullServiceArea(!showFullServiceArea); // Toggle visibility of full service area
//     };

//     return (
//         <div>
//             <Helmet>
//                 <title>{provider.name} | Quick Foods</title>
//                 <meta name="description" content={`Details for ${provider.name} catering service`} />
//             </Helmet>

//             {/* Header with back button */}
//             <div className="bg-white shadow-sm">
//                 <div className="container mx-auto px-4 py-4">
//                     <Link
//                         to="/providers"
//                         className="flex items-center text-[#E23744] hover:text-[#C5313D]"
//                     >
//                         <FaArrowLeft className="mr-2" />
//                         Back to Providers
//                     </Link>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="container mx-auto px-4 py-14 md:py-20">
//                 <div className="max-w-6xl mx-auto">
//                     {/* Provider Card */}
//                     <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
//                         {/* Image Section */}
//                         <div className="lg:w-1/2 relative h-64 lg:h-auto">
//                             <img
//                                 src={provider.image || '/default-catering.jpg'}
//                                 alt={provider.name}
//                                 className="w-full h-full object-cover"
//                                 onError={(e) => {
//                                     e.target.src = '/default-catering.jpg';
//                                 }}
//                             />
//                             {provider.isPremium && (
//                                 <div className="absolute top-4 left-4 bg-[#E23744] text-white py-1 px-3 rounded-full text-xs font-bold shadow-md">
//                                     PREMIUM
//                                 </div>
//                             )}
//                         </div>

//                         {/* Details Section */}
//                         <div className="lg:w-1/2 p-6 md:p-8">
//                             <div className="mb-6">
//                                 <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
//                                     {provider.name}
//                                 </h1>
//                                 <div className="flex items-center">
//                                     {[...Array(5)].map((_, i) => (
//                                         i < Math.floor(provider.rating || 0)
//                                             ? <FaStar key={i} className="text-[#E23744]" />
//                                             : <FaRegStar key={i} className="text-[#E23744]" />
//                                     ))}
//                                     <span className="ml-2 text-gray-600">
//                                         ({(provider.rating || 0).toFixed(1)})
//                                     </span>
//                                 </div>
//                             </div>

//                             {/* Contact Info */}
//                             <div className="space-y-4 mb-8">
//                                 <div className="flex items-start">
//                                     <FaMapMarkerAlt className="text-[#E23744] mt-1 mr-3 flex-shrink-0" />
//                                     <div>
//                                         <h3 className="font-semibold text-gray-700">Address</h3>
//                                         <p className="text-gray-600">
//                                             {provider.location?.address || 'N/A'}, {provider.location?.city || 'N/A'}, {provider.location?.postal_code || 'N/A'}
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center">
//                                     <FaPhone className="text-[#E23744] mr-3 flex-shrink-0" />
//                                     <div>
//                                         <h3 className="font-semibold text-gray-700">Phone</h3>
//                                         <p className="text-gray-600">
//                                             {provider.contact?.phone || 'N/A'}
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center">
//                                     <IoMdMail className="text-[#E23744] text-lg mr-3 flex-shrink-0" />
//                                     <div>
//                                         <h3 className="font-semibold text-gray-700">Email</h3>
//                                         <p className="text-gray-600">
//                                             {provider.contact?.email || 'N/A'}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Service Areas */}
//                             <div className="mb-8">
//                                 <h3 className="text-xl font-semibold text-gray-800 mb-3">
//                                     Service Areas
//                                 </h3>
//                                 {provider.service_area?.length > 0 ? (
//                                     <>
//                                         <div className="flex flex-wrap gap-2">
//                                             {serviceAreasToShow.map((area, index) => (
//                                                 <span
//                                                     key={index}
//                                                     className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
//                                                 >
//                                                     {area}
//                                                 </span>
//                                             ))}
//                                         </div>
//                                         {provider.service_area.length > 4 && (
//                                             <button
//                                                 onClick={() => setShowFullServiceArea(!showFullServiceArea)}
//                                                 className="mt-3 text-[#E23744] text-sm font-medium hover:underline flex items-center"
//                                             >
//                                                 {showFullServiceArea ? 'Show less' : `Show all (${provider.service_area.length})`}
//                                             </button>
//                                         )}
//                                     </>
//                                 ) : (
//                                     <p className="text-gray-500">No service areas specified</p>
//                                 )}
//                             </div>

//                             {/* Action Buttons */}
//                             <div className="flex flex-col sm:flex-row gap-4">
//                                 {/* <Link
//                                     to={`/provider/${provider._id}/review`}
//                                     className="bg-[#E23744] hover:bg-[#C5313D] text-white py-3 px-6 rounded-lg font-medium text-center transition-colors"
//                                 >
//                                     Write a Review
//                                 </Link> */}
//                                 <a
//                                     href={`tel:${provider.contact?.phone}`}
//                                     className="border border-[#E23744] text-[#E23744] hover:bg-[#E23744] hover:text-white py-3 px-6 rounded-lg font-medium transition-colors text-center"
//                                 >
//                                     Contact Now
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProviderDetails;