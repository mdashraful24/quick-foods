import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FiLoader, FiCheck, FiTrash2, FiInfo, FiEye } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "../hook/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PendingCaterings = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch pending caterings
  const { data: pendingCatering = [], isLoading, isError } = useQuery({
    queryKey: ['pendingCaterings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/pending-providers');
      return res.data.filter(provider => provider.status === 'pending'); // Filter pending providers
    },
    refetchOnWindowFocus: false,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/pending-providers/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['pendingCaterings']);
      Swal.fire({
        title: "Deleted!",
        text: "Catering request has been removed.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to delete request",
        icon: "error",
      });
    }
  });

  // Confirm mutation (Approve)
  const confirmMutation = useMutation({
    mutationFn: (cateringData) => axiosSecure.patch(`/pending-providers/${cateringData._id}`, {
      status: 'approved',  // Update the status to 'approved'
    }),
    onSuccess: () => {
      queryClient.invalidateQueries(['pendingCaterings']); // Refetch and filter
      Swal.fire({
        title: "Approved!",
        text: "Catering provider has been approved.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to confirm request",
        icon: "error",
      });
    }
  });

  const handleDelete = (id) => {
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
        deleteMutation.mutate(id);
      }
    });
  };

  const handleConfirm = (id) => {
    const cateringData = pendingCatering.find((item) => item._id === id);

    Swal.fire({
      title: "Approve Catering Provider?",
      text: `Are you sure you want to approve "${cateringData.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, approve!",
      cancelButtonText: "Cancel",
      background: "#ffffff",
      backdrop: `rgba(22, 163, 74, 0.1) left top no-repeat`,
      customClass: {
        title: 'text-xl font-bold text-gray-800',
        confirmButton: 'px-4 py-2 rounded-lg',
        cancelButton: 'px-4 py-2 rounded-lg'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        confirmMutation.mutate(cateringData);
      }
    });
  };

  const handleDetails = (id) => {
    navigate(`/admin/pendingCateringsDetails/${id}`);
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
          Failed to load pending caterings
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <Helmet>
        <title>Pending Catering Service Applications | Quick Foods</title>
      </Helmet>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-2">
          <FaClipboardList className="text-3xl" />
          Pending Applications
        </h2>
        <p className="text-gray-600">
          Pending Catering Service requests: <span className="font-bold">{pendingCatering.length}</span>
        </p>
      </div>

      {pendingCatering.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="mx-auto h-24 w-24 text-indigo-100">
            <FiInfo className="w-full h-full" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No pending requests</h3>
          <p className="mt-2 text-gray-500">
            All catering service applications have been processed.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence>
            {pendingCatering.map((catering) => (
              <motion.div
                key={catering._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-medium">
                        {catering.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{catering.name}</h3>
                      <p className="text-gray-500 text-sm">{catering.contact?.email}</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center">
                      <span className="ml-2 text-gray-600">
                        {catering.location?.city}, {catering.location?.address}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="ml-2 text-gray-600">{catering.contact?.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="ml-2 text-gray-600">
                        Serves: {catering.service_area}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleDetails(catering._id)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                    >
                      <FiEye />
                      <span>Details</span>
                    </button>
                    <button
                      onClick={() => handleConfirm(catering._id)}
                      disabled={confirmMutation.isLoading}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {confirmMutation.isLoading ? (
                        <FiLoader className="animate-spin" />
                      ) : (
                        <>
                          <FiCheck />
                          <span>Approve</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(catering._id)}
                      disabled={deleteMutation.isLoading}
                      className="col-span-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deleteMutation.isLoading ? (
                        <FiLoader className="animate-spin" />
                      ) : (
                        <>
                          <FiTrash2 />
                          <span>Reject</span>
                        </>
                      )}
                    </button>
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

export default PendingCaterings;