import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hook/useAxiosSecure";
import { FiLoader, FiArrowLeft } from "react-icons/fi";
import { TbListDetails } from "react-icons/tb";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const PendingCateringDetails = () => {
    window.scrollTo(0, 0);
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    // Fetch single pending catering details
    const { data: catering, isLoading, isError } = useQuery({
        queryKey: ['pendingCatering', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/providers/${id}`);
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <FiLoader className="animate-spin text-4xl text-indigo-600" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    Failed to load catering details
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 py-8">
            <Helmet>
                <title>{catering?.name} Details | Quick Foods</title>
            </Helmet>

            <div className="mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                        <TbListDetails className="text-3xl" />
                        Catering Details
                    </h2>
                </div>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-6 text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                    <FiArrowLeft /> Back to Pending Applications
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden grid lg:grid-cols-2 lg:gap-10">
                {/* Image on left side - full height */}
                <div className="relative h-72 md:h-[500px]">
                    <img
                        src={catering?.image || "https://via.placeholder.com/800x300?text=Catering+Image"}
                        alt={catering?.name}
                        className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden"></div>
                    <div className="absolute bottom-4 left-4 md:hidden">
                        <h1 className="text-3xl font-bold text-white">{catering?.name}</h1>
                        <p className="text-white/90">{catering?.location?.city}</p>
                    </div>
                    <span className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Pending Approval
                    </span>
                </div>

                {/* Content on right side */}
                <div className="p-6">
                    {/* Name and city visible only on desktop (hidden on mobile since shown on image) */}
                    <div className="hidden md:block mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{catering?.name}</h1>
                        <p className="text-gray-600">{catering?.location?.city}</p>
                    </div>

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-xl font-bold mb-2 text-gray-800">Contact Information</h2>
                            <div className="space-y-2">
                                <p>
                                    <span className="font-medium text-gray-700">Email:</span> {catering?.contact?.email}
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">Phone:</span> {catering?.contact?.phone}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold mb-2 text-gray-800">Location</h2>
                            <div className="space-y-2">
                                <p>
                                    <span className="font-medium text-gray-700">Address:</span> {catering?.location?.address}
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">City:</span> {catering?.location?.city}
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">Postal Code:</span> {catering?.location?.postal_code}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Service Info */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-2 text-gray-800">Service Information</h2>
                        <div className="space-y-2">
                            <p>
                                <span className="font-medium text-gray-700">Service Area:</span> {catering?.service_area}
                            </p>
                            <div className="flex items-center gap-3">
                                <span className="font-medium text-gray-700">Catering Types:</span>
                                <div className="flex flex-wrap gap-2">
                                    {catering?.catering_types?.map((type, index) => (
                                        <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <p>
                                <span className="font-medium text-gray-700">Rating:</span>{" "}
                                <span className="text-xl text-blue-600">
                                    {Array.from({ length: Math.floor(catering?.rating || 0) }).map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </span>{" "}
                                ({catering?.rating || 0})
                            </p>
                        </div>
                    </div>

                    {/* Status Info */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Application Status</h2>
                        <div className="flex items-center gap-3">
                            <div className={`h-3 w-3 rounded-full ${catering?.status === 'approved' ? 'bg-green-500' :
                                catering?.status === 'rejected' ? 'bg-red-500' :
                                    'bg-yellow-500'
                                }`}></div>
                            <span className="font-medium capitalize">
                                {catering?.status || 'pending'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PendingCateringDetails;