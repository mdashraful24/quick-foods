import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hook/useAxiosPublic";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { FaRegEdit } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const FoodBlogForm = () => {
    window.scrollTo(0, 0);
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFormComplete, setIsFormComplete] = useState(false);
    const navigate = useNavigate();

    // Watch form fields
    const title = watch("title");
    const category = watch("category");
    const content = watch("content");
    const image = watch("image");

    // Check if form is completely filled
    useEffect(() => {
        const isFilled =
            title?.trim() &&
            category &&
            content?.trim()?.length >= 100 &&
            image?.[0];
        setIsFormComplete(!!isFilled);
    }, [title, category, content, image]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const imageFile = { image: data.image[0] };
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: { 'content-type': 'multipart/form-data' }
            });

            if (res.data.success) {
                const blogPost = {
                    title: data.title,
                    category: data.category,
                    author: user?.displayName,
                    content: data.content,
                    image: res.data.data.display_url,
                    date: new Date().toISOString(),
                    authorEmail: user?.email,
                    authorImage: user?.photoURL
                };

                const blogRes = await axiosSecure.post('/blogs', blogPost);
                if (blogRes.data.insertedId) {
                    reset();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Blog published successfully!",
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
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Submit Failed",
                text: error.message || "Failed to publish blog",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="px-4 py-8">
            <Helmet>
                <title>Write Blog | Quick Foods</title>
            </Helmet>

            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Write Your Blog
                    </h1>
                    <p className="text-gray-600 max-w-lg mx-auto">
                        Write about your food experiences, restaurant reviews
                    </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* Author */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Author Name</label>
                            <div className="flex items-center space-x-3">
                                {user?.photoURL && (
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                )}
                                <input
                                    type="text"
                                    {...register("author")}
                                    value={user?.displayName || ""}
                                    readOnly
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Title and Category */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Blog Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., My Secret Pasta Recipe"
                                    {...register("title", { required: "Title is required" })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                                />
                                {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    {...register("category", { required: "Category is required" })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                                >
                                    <option value="">Select a category</option>
                                    <option value="breakfast">🍳 Breakfast</option>
                                    <option value="lunch">🥪 Lunch</option>
                                    <option value="dinner">🍝 Dinner</option>
                                    <option value="dessert">🍰 Dessert</option>
                                    <option value="drinks">🥤 Drinks</option>
                                    <option value="tips">👨‍🍳 Cooking Tips</option>
                                    <option value="reviews">📝 Restaurant</option>
                                </select>
                                {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>}
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Blog Content (min 100 characters) <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows="8"
                                placeholder="Share your story, recipe, or review..."
                                {...register("content", {
                                    required: "Content is required",
                                    minLength: {
                                        value: 100,
                                        message: "Content should be at least 100 characters"
                                    }
                                })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                            />
                            {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content.message}</p>}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upload Image <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("image", { required: true })}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-blue-700 file:text-white hover:file:bg-blue-800"
                            />
                            {errors.image && <p className="text-red-600 text-sm mt-1">Image is required</p>}
                        </div>

                        {/* Submit */}
                        {isFormComplete && (
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Publishing...
                                        </>
                                    ) : (
                                        <>
                                            Publish Blog <FaRegEdit className="ml-2" />
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FoodBlogForm;
