import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPublic from "../../hook/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import { FiLoader } from "react-icons/fi";

const Blog = () => {
    window.scrollTo(0, 0);
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();
    const [activeCategory, setActiveCategory] = useState("All");

    // Fetch blogs using useQuery
    const { data: blogs = [], isLoading, error } = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
            const response = await axiosPublic.get("/blogs");
            return response.data;
        },
    });

    // Extract unique categories
    const categories = ["All", ...new Set(blogs.map(blog => blog.category))];

    // Filter blogs based on selected category
    const filteredBlogs = activeCategory === "All" ? blogs : blogs.filter(blog => blog.category === activeCategory);

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-screen">
            <FiLoader className="animate-spin text-4xl text-[#E23744]" />
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
                <h3 className="text-xl font-bold text-red-500 mb-2">Failed to load blogs</h3>
                <p className="text-gray-600 mb-4">{error.message}</p>
                <button
                    onClick={() => queryClient.refetchQueries(["blogs"])}
                    className="px-4 py-2 bg-[#E23744] text-white rounded-lg hover:bg-[#d32c3a] transition-colors"
                >
                    Retry
                </button>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 mt-24 mb-20">
            <Helmet>
                <title>Blogs | Quick Foods</title>
            </Helmet>

            <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">Blogs</h1>

            <div className="h-auto">
                {/* Categories */}
                <div className="flex flex-wrap justify-center mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 m-1 text-sm font-semibold border rounded-full capitalize hover:bg-red-500 hover:text-white ${activeCategory === category
                                ? "bg-red-500 text-white"
                                : "border-gray-300 text-gray-700"}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {filteredBlogs.length === 0 ? (
                    <div className="text-center text-gray-600 text-lg font-medium py-10">
                        No blogs available in this category.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredBlogs.map((blog) => (
                            <div
                                key={blog._id}
                                className="bg-white rounded-lg border overflow-hidden hover:shadow-lg"
                            >
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-80 object-cover"
                                />
                                <div className="p-5">
                                    <div className="flex items-center gap-2">
                                        <p className="text-gray-600">{blog.author}</p>
                                        <div className="h-4 border-l border-gray-500"></div>
                                        <span className="text-gray-500">{new Date(blog.date).toDateString()}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{blog.title}</h3>
                                    <p className="text-gray-600 mb-4">{blog.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;