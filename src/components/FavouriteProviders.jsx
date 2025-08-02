import React, { useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { FiLoader } from "react-icons/fi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Rating from "react-rating";

const FavouriteProviders = () => {
  window.scrollTo(0, 0);
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Using react-query for better data fetching and state management
  const { data: favorites = [], isLoading, error } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const response = await fetch(
        `https://quick-foods-server.vercel.app/favorites?email=${user.email}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch favorite providers");
      }
      return response.json();
    },
    enabled: !!user?.email,
  });

  const handleDelete = (providerId, providerName) => {
    Swal.fire({
      title: "Delete Favorite Provider?",
      text: `Are you sure you want to remove "${providerName}" from your favorites?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E23744",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#ffffff",
      backdrop: `
            rgba(226, 55, 68, 0.1)
            left top
            no-repeat
          `,
      customClass: {
        title: 'text-xl font-bold text-gray-800',
        confirmButton: 'px-4 py-2 rounded-lg',
        cancelButton: 'px-4 py-2 rounded-lg'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://quick-foods-server.vercel.app/favorites/${providerId}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Provider has been removed from your favorites.",
                icon: "success",
                confirmButtonColor: "#E23744"
              });
              // Invalidate the query to trigger a refetch
              queryClient.invalidateQueries(["favorites"]);
            } else {
              Swal.fire("Error", "Provider not found in favorites.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting favorite provider:", error);
            Swal.fire("Error", "Failed to delete provider. Please try again later.", "error");
          });
      }
    });
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <FiLoader className="animate-spin text-4xl text-[#E23744]" />
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
        <h3 className="text-xl font-bold text-red-500 mb-2">Failed to load favorite providers</h3>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button
          onClick={() => queryClient.refetchQueries(["favorites"])}
          className="px-4 py-2 bg-[#E23744] text-white rounded-lg hover:bg-[#d32c3a] transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto mt-24 mb-20 px-5">
      <Helmet>
        <title>Favorite Providers | Quick Foods</title>
      </Helmet>

      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Favorite Providers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {favorites.length > 0 ? (
          favorites.map((fav) => (
            <div key={fav._id} className="bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="relative">
                <img src={fav.image} alt={fav.name} className="w-full object-cover h-80" />
                {fav.isPremium && (
                  <span className="absolute top-2 left-2 bg-yellow-500 text-white py-1 px-3 rounded-full text-xs font-semibold">
                    Premium
                  </span>
                )}
              </div>
              <div className="p-5 flex flex-col justify-between flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{fav.name}</h3>
                <div className="flex items-center mt-2">
                  <Rating
                    initialRating={fav.rating}
                    emptySymbol={<span className="text-gray-300 text-2xl">★</span>}
                    fullSymbol={<span className="text-red-500 text-2xl">★</span>}
                    readonly
                  />
                  <span className="ml-2 text-gray-600">
                    ({fav.rating})
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                  <Link to={`/provider/${fav.providerId}`}>
                    <button className="w-full py-2 px-4 border border-[#E23744] text-[#E23744] hover:bg-[#E23744] hover:text-white rounded-lg font-medium transition-colors text-center">
                      View Details
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(fav._id, fav.name)}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xl text-center col-span-full">No favorite providers found.</p>
        )}
      </div>
    </div>
  );
};

export default FavouriteProviders;