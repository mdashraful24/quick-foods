import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { AuthContext } from "../Provider/AuthProvider";
import Rating from "react-rating";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { FiLoader } from "react-icons/fi";
import useAxiosPublic from "../hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Providers = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [sortByRating, setSortByRating] = useState(null);

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['providers'],
    queryFn: async () => {
      const res = await axiosPublic.get("/providers");
      return res.data;
    }
  });

  const handleAddToFavorites = (provider) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You need to log in to add favorites.",
      });
      return;
    }

    fetch(`https://quick-foods-server.vercel.app/favorites?email=${user.email}`)
      .then((res) => res.json())
      .then((favorites) => {
        const isProviderInFavorites = favorites.some(fav => fav.providerId === provider._id);

        if (isProviderInFavorites) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Provider Already in Favorites",
            text: `${provider.name} is already in your favorites list!`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          fetch("https://quick-foods-server.vercel.app/favorites", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              providerId: provider._id,
              name: provider.name,
              image: provider.image,
              rating: provider.rating,
              isPremium: provider.isPremium,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                return response.json().then((errorData) => {
                  Swal.fire({
                    icon: "error",
                    title: "Failed to Add Favorite",
                    text: errorData.message || "Failed to add favorite.",
                  });
                });
              }
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Added to Favorites",
                text: `${provider.name} has been added to your favorites!`,
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.error("Error adding to favorites:", error);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred while adding the provider to favorites.",
              });
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while fetching your favorites.",
        });
      });
  };

  // Filter approved providers and apply search
  const approvedProviders = data.filter(
    (provider) =>
      provider.status === "approved" &&
      provider.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sort providers based on selected option
  const sortedProviders = [...approvedProviders].sort((a, b) =>
    sortByRating === 'desc' ? b.rating - a.rating : a.rating - b.rating
  );

  // Toggle sort direction
  const handleSortToggle = () => {
    setSortByRating(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  return (
    <div className="container mx-auto mt-24 mb-16 px-4">
      <Helmet>
        <title>Our Providers | Quick Foods</title>
      </Helmet>

      <h3 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Our Catering Providers
      </h3>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search providers name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-6 pr-16 rounded-full shadow-md focus:ring-2 focus:ring-[#E23744] focus:outline-none bg-white border border-gray-300 text-gray-800"
          />
          <button className="absolute top-1/2 -translate-y-1/2 right-0 h-12 w-12 bg-[#E23744] text-white rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 111.35-1.35l4.35 4.35z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Sort by Rating */}
      <div className="mb-6">
        <button
          onClick={handleSortToggle}
          className="btn w-full md:w-64 text-white bg-[#E23744] hover:bg-[#E23744] flex items-center justify-center gap-2"
        >
          {sortByRating === 'desc' ? (
            <>
              <span>Sort by Rating (High to Low)</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </>
          ) : (
            <>
                <span>Sort by Rating (Low to High)</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </>
          )}
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <FiLoader className="animate-spin text-4xl text-[#E23744]" />
        </div>
      ) : isError ? (
        <div className="text-center text-red-500">Failed to load providers.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProviders.length > 0 ? (
            sortedProviders.map((provider) => (
              <div
                key={provider._id}
                className="bg-white rounded-lg border overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div className="relative h-80">
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-full h-full object-cover"
                  />
                  {provider.isPremium && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white py-1 px-3 rounded-full text-xs font-semibold">
                      Premium
                    </span>
                  )}
                </div>
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {provider.name}
                    </h3>
                    <button
                      onClick={() => handleAddToFavorites(provider)}
                      className="btn btn-circle text-2xl"
                    >
                      <CiHeart />
                    </button>
                  </div>
                  <div className="flex items-center">
                    <Rating
                      initialRating={provider.rating}
                      emptySymbol={<span className="text-gray-300 text-2xl">★</span>}
                      fullSymbol={<span className="text-red-500 text-2xl">★</span>}
                      readonly
                    />
                    <span className="ml-2 text-gray-600">({provider.rating.toFixed(1)})</span>
                  </div>
                  <Link to={`/provider/${provider._id}`}>
                    <button className="mt-4 w-full bg-[#E23744] text-white py-2 px-4 rounded-lg transition-colors duration-300">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600 text-lg font-medium">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Providers;