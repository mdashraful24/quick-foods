import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hook/useAxiosPublic";
import useAxiosSecure from "../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { FaEdit } from "react-icons/fa";

// Image upload
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdatedBlog = () => {
    window.scrollTo(0, 0);
    const blogData = useLoaderData();
    const { _id, title, category, author, content, image } = blogData;
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [isUpdating, setIsUpdating] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            title,
            category,
            author,
            content,
        }
    });

    const onSubmit = async (data) => {
        setIsUpdating(true);

        // Check if any fields have changed
        const isChanged = (
            data.title !== title ||
            data.category !== category ||
            data.author !== author ||
            data.content !== content ||
            (data.image && data.image[0])
        );

        if (!isChanged) {
            Swal.fire({
                icon: "info",
                title: "No Changes Detected",
                text: "You haven't made any changes to update.",
                confirmButtonColor: "#3B82F6",
                backdrop: `
                    rgba(29, 78, 216, 0.1)
                    left top
                    no-repeat
                `,
            });
            setIsUpdating(false);
            return;
        }

        let imageUrl = image;

        if (data.image && data.image[0]) {
            const imageFile = new FormData();
            imageFile.append("image", data.image[0]);

            try {
                const res = await axiosPublic.post(image_hosting_api, imageFile, {
                    headers: { "content-type": "multipart/form-data" },
                });

                if (res.data.success) {
                    imageUrl = res.data.data.display_url;
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Image Upload Failed",
                    text: "Failed to upload new image. Please try again.",
                });
                setIsUpdating(false);
                return;
            }
        }

        // Update blog data
        const updatedBlog = {
            title: data.title,
            category: data.category,
            author: data.author,
            content: data.content,
            image: imageUrl,
        };

        try {
            const response = await axiosSecure.patch(`/blogs/${_id}`, updatedBlog);
            reset();

            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `"${data.title}" updated successfully!`,
                    showConfirmButton: false,
                    timer: 1500,
                    background: "#fff",
                    backdrop: `
                        rgba(0,0,0,0.5)
                        url("/images/celebrate.gif")
                        center top
                        no-repeat
                    `,
                    customClass: {
                        title: 'text-2xl font-bold text-gray-800'
                    }
                });
                navigate("/admin/blogList");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: error.message || "Failed to update blog post",
            });
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="px-4 py-8">
            <Helmet>
                <title>Update Blog | Quick Foods</title>
            </Helmet>

            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Update <span className="text-blue-700">"{title}"</span>
                    </h1>
                    <p className="text-gray-600">
                        Revise your blog content and make it even better
                    </p>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-md border">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Blog Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Blog Title
                            </label>
                            <input
                                type="text"
                                {...register("title", { required: "Title is required" })}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-5ring-blue-500 focus:outline-none transition ${errors.title ? "border-blue-500" : "border-gray-300"}`}
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                            )}
                        </div>

                        {/* Category and Author */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <div className="relative">
                                    <select
                                        {...register("category", { required: "Category is required" })}
                                        className={`appearance-none w-full px-4 py-2 border rounded-lg focus:ring-2  focus:ring-blue-500 focus:border-blue-5ring-blue-500 focus:outline-none transition pr-10 ${errors.category ? "border-blue-500" : "border-gray-300"}`}
                                    >
                                        <option value="breakfast">Breakfast</option>
                                        <option value="lunch">Lunch</option>
                                        <option value="dinner">Dinner</option>
                                        <option value="snacks">Snacks</option>
                                        <option value="drinks">Drinks</option>
                                        <option value="reviews">Restaurant Reviews</option>
                                        <option value="tips">Cooking Tips</option>
                                    </select>
                                    <div className="pointer-events-none absolute right-0 bottom-3 pr-3 flex items-center text-gray-700">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                </div>
                                {errors.category && (
                                    <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                                )}
                            </div>

                            {/* Author */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Author
                                </label>
                                <input
                                    type="text"
                                    {...register("author", { required: "Author is required" })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2  focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition ${errors.author ? "border-blue-500" : "border-gray-300"}`}
                                />
                                {errors.author && (
                                    <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Blog Content (min 100 characters)
                            </label>
                            <textarea
                                rows="6"
                                {...register("content", {
                                    required: "Content is required",
                                    minLength: {
                                        value: 100,
                                        message: "Content should be at least 100 characters"
                                    }
                                })}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2  focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition ${errors.content ? "border-red-500" : "border-gray-300"}`}
                            ></textarea>
                            {errors.content && (
                                <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                            )}
                        </div>

                        {/* Image Section */}
                        <div className="flex flex-col md:flex-row md:justify-between gap-5">
                            {/* Current Image Preview */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Current Featured Image
                                </label>
                                <div>
                                    <img
                                        src={image}
                                        alt={`Current ${title} blog image`}
                                        className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                    />
                                </div>
                            </div>

                            {/* New Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload New Image (Optional)
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register("image")}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-blue-700 file:text-white hover:file:bg-blue-800"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isUpdating}
                                className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-colors ${isUpdating ? "opacity-75 cursor-not-allowed" : ""
                                    }`}
                            >
                                {isUpdating ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <FaEdit className="mr-2" />
                                        Update Blog Post
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdatedBlog;