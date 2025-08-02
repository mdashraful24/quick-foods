import { FaEdit, FaTrashAlt, FaPlus, FaBlogger } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { FiLoader } from "react-icons/fi";

const BlogsList = () => {
    window.scrollTo(0, 0);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch blogs using useQuery
    const { data: blogs = [], isLoading, error } = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
            const res = await axiosSecure.get("/blogs");
            return res.data;
        },
    });

    // Delete blog mutation
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/blogs/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["blogs"]);
        },
    });

    // Handle delete function
    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Delete Blog Post?",
            text: `Are you sure you want to delete "${item.title}"?`,
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
                deleteMutation.mutate(item._id, {
                    onSuccess: () => {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `"${item.title}" deleted!`,
                            showConfirmButton: false,
                            timer: 1500,
                            background: "#ffffff",
                            customClass: {
                                title: 'text-xl font-bold text-gray-800'
                            }
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            icon: "error",
                            title: "Delete Failed",
                            text: "Failed to delete the blog post. Please try again.",
                        });
                    }
                });
            }
        });
    };

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-screen">
            <FiLoader className="animate-spin text-4xl text-indigo-600" />
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
        <div className="px-4 py-8">
            <Helmet>
                <title>Manage Blog Posts | Quick Foods</title>
            </Helmet>

            <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                            <FaBlogger className="text-3xl" />
                            Blog Posts Management
                        </h2>
                        <p className="text-gray-600">
                            Total Blog {blogs.length === 1 ? 'Post' : 'Posts'}: <span className="font-bold">{blogs.length}</span>
                        </p>
                    </div>
                    <Link
                        to="/admin/blogField"
                        className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors"
                    >
                        <FaPlus /> Add New Post
                    </Link>
                </div>

                <div className="bg-white shadow-md rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Image
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Author
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {blogs.map((item, index) => (
                                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img
                                                    className="h-10 w-10 rounded-full object-cover"
                                                    src={item.image}
                                                    alt={item.title}
                                                    onError={(e) => {
                                                        e.target.src = '/default-blog.jpg';
                                                    }}
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                            {item.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {item.author}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {new Date(item.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-2">
                                                <Link
                                                    to={`/admin/updateBlog/${item._id}`}
                                                    className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                                                    title="Edit"
                                                >
                                                    <FaEdit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteItem(item)}
                                                    className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                                    title="Delete"
                                                >
                                                    <FaTrashAlt className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {blogs.length === 0 && (
                        <div className="text-center py-12">
                            <h3 className="text-lg font-medium text-gray-900">No blog posts found</h3>
                            <p className="mt-1 text-sm text-gray-900">Get started by creating a new blog post.</p>
                            {/* <div className="mt-6">
                                <Link
                                    to="/admin/blogField"
                                    className="inline-flex items-center px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors"
                                >
                                    <FaPlus className="mr-2" /> Add New Post
                                </Link>
                            </div> */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogsList;