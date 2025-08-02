import { useQuery, useMutation } from "@tanstack/react-query";
import { FiTrash2, FiInfo, FiLoader, FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "../hook/useAxiosSecure";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";

const ManageProviders = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // Fetch providers using useQuery
    const { data: providers = [], isLoading, isError, refetch } = useQuery({
        queryKey: ["providers"],
        queryFn: async () => {
            const res = await axiosSecure.get("/providers");
            return res.data.filter(provider => provider.status === "approved");
        },
        refetchOnWindowFocus: false,
    });

    // Delete provider using useMutation
    const deleteProviderMutation = useMutation({
        mutationFn: async (providerId) => {
            const res = await axiosSecure.delete(`/pending-providers/${providerId}`);
            return res.data;
        },
        onSuccess: () => {
            refetch(); // Refetch providers after deletion
        },
        onError: (error) => {
            console.error("Error deleting provider:", error);
        },
    });

    const handleDeleteProvider = (providerId) => {
        Swal.fire({
            title: "Delete Request?",
            text: "This action cannot be undone",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#E23744",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            background: "#ffffff",
            backdrop: `rgba(226, 55, 68, 0.1) left top no-repeat`,
            customClass: {
                title: 'text-xl font-bold text-gray-800',
                confirmButton: 'px-4 py-2 rounded-lg',
                cancelButton: 'px-4 py-2 rounded-lg'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProviderMutation.mutate(providerId);
            }
        });
    };

    const handleUpdateProvider = (providerId) => {
        navigate(`/admin/updateProviders/${providerId}`);
    };

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
                    Failed to load providers
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 py-8">
            <Helmet>
                <title>Manage Providers | Quick Foods</title>
            </Helmet>

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                    <FaClipboardList className="text-3xl" />
                    Manage Providers
                </h2>
                <p className="text-gray-600">
                    Total Catering Providers: <span className="font-bold">{providers.length}</span>
                </p>
            </div>

            {/* <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manage Providers</h1>
                    <p className="text-gray-600 mt-2">Total Catering Providers: <span className="font-bold">{providers.length}</span></p>
                </div>
            </div> */}

            {providers.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                    <div className="mx-auto h-24 w-24 text-indigo-100">
                        <FiInfo className="w-full h-full" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No providers available</h3>
                    <p className="mt-2 text-gray-500">All providers have been approved or none have applied yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    <AnimatePresence>
                        {providers.map((provider) => (
                            <motion.div
                                key={provider._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-300 hover:shadow-xl transition-shadow"
                            >
                                <div
                                    key={provider._id}
                                >
                                    <div className="p-5 flex flex-col flex-grow relative">
                                        {/* Status badge */}
                                        <div className="flex justify-end">
                                            <span
                                                className={`text-xs font-semibold px-3 py-1 rounded-full ${provider.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-green-100 text-green-800"
                                                    }`}
                                            >
                                                {provider.status === "pending" ? "Pending" : "Approved"}
                                            </span>
                                        </div>

                                        {/* Provider Info */}
                                        <div className="flex items-start mt-4">
                                            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                                <span className="text-indigo-600 font-medium">
                                                    {provider.name.charAt(0)}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-medium text-gray-900">{provider.name}</h3>
                                                <p className="text-gray-500 text-sm">{provider.contact?.email}</p>
                                            </div>
                                        </div>

                                        <div className="mt-6 space-y-4 flex-grow">
                                            <div className="flex items-center">
                                                <FiInfo className="h-5 w-5 text-gray-400" />
                                                <span className="ml-2 text-gray-600">
                                                    {provider.location?.city}, {provider.location?.address}
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-gray-600 ml-7">
                                                    Service Area: {provider.service_area}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="mt-6 flex justify-between space-x-2">
                                            <button
                                                onClick={() => handleUpdateProvider(provider._id)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                                            >
                                                <FiEdit />
                                                <span>Update</span>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProvider(provider._id)}
                                                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                                            >
                                                <FiTrash2 />
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default ManageProviders;