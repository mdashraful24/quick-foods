import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import CustomSelect from "../../Shared/CustomSelect";

<CustomSelect />

const AddCatering = () => {
  window.scrollTo(0, 0);
  const [selectedServiceArea, setSelectedServiceArea] = useState("");
  const [city, setCity] = useState("");
  const [selectedCateringTypes, setSelectedCateringTypes] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const cityServiceAreas = {
    Dhaka: [
      "Gulshan",
      "Banani",
      "Dhanmondi",
      "Mirpur",
      "Uttara",
      "Mohammadpur",
      "Motijheel",
      "Old Dhaka",
    ],
    Rajshahi: ["Rajshahi City", "Nowhata", "Katakhali", "Shahmukhdum"],
    Chittagong: [
      "Agrabad",
      "Nasirabad",
      "Halishahar",
      "Patenga",
      "Chawkbazar",
    ],
    Khulna: ["Khalishpur", "Sonadanga", "Boyra", "Doulatpur"],
    Barishal: ["Barishal City", "Rupatoli", "Kawnia", "Nathullabad"],
    Rangpur: ["Rangpur City", "Pirgachha", "Badarganj"],
    Sylhet: ["Sylhet City", "Zindabazar", "Upashahar"],
    Mymensingh: ["Mymensingh City", "Trishal", "Bhaluka"],
  };

  const cateringTypeOptions = [
    "Office Catering",
    "Event Cover",
    "Birthday Function",
    "Wedding",
    "Customized Order",
  ];

  const cityOptions = [
    { value: "Dhaka", label: "Dhaka" },
    { value: "Rajshahi", label: "Rajshahi" },
    { value: "Chittagong", label: "Chittagong" },
    { value: "Khulna", label: "Khulna" },
    { value: "Barishal", label: "Barishal" },
    { value: "Rangpur", label: "Rangpur" },
    { value: "Sylhet", label: "Sylhet" },
    { value: "Mymensingh", label: "Mymensingh" },
  ];

  const serviceAreaOptions = city
    ? cityServiceAreas[city]?.map(area => ({ value: area, label: area })) || []
    : [];

  const handleCityChange = (value) => {
    setCity(value);
    setSelectedServiceArea("");
  };

  const handleServiceAreaChange = (value) => {
    setSelectedServiceArea(value);
  };

  const handleCateringTypeChange = (event) => {
    const value = event.target.value;
    setSelectedCateringTypes((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!image) return null;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        return data.data.display_url;
      }
      return null;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const [formErrors, setFormErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const errors = {};

    if (!city) errors.city = "Please select a city";
    if (!selectedServiceArea) errors.serviceArea = "Please select a service area";
    if (!selectedCateringTypes.length) errors.cateringTypes = "Please select at least one catering service";
    if (rating === 0) errors.rating = "Please provide a rating";
    if (!image) errors.image = "Please upload an image";

    const form = document.forms[0];
    if (!form.name.value.trim()) errors.name = "Full name is required";
    if (!form.address.value.trim()) errors.address = "Address is required";
    if (!form.postalCode.value.trim()) errors.postalCode = "Postal code is required";
    if (!form.phone.value.trim()) errors.phone = "Phone number is required";
    if (!form.email.value.trim()) errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email.value)) errors.email = "Email is invalid";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        title: 'Form Validation Error',
        text: 'Please fill in all required fields correctly',
        icon: 'error',
        confirmButtonColor: '#E23744',
      });
      return;
    }

    const form = event.target;
    const name = form.name.value;
    const address = form.address.value;
    const postalCode = form.postalCode.value;
    const phone = form.phone.value;
    const email = form.email.value;

    Swal.fire({
      title: 'Submitting...',
      html: 'Please wait while we process your application',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      // Upload image first
      const imageUrl = await uploadImage();
      if (!imageUrl) {
        throw new Error("Image upload failed");
      }

      const providerData = {
        name: name,
        location: {
          address: address,
          city: city,
          postal_code: postalCode,
        },
        contact: {
          phone: phone,
          email: email,
        },
        service_area: selectedServiceArea,
        catering_types: selectedCateringTypes,
        rating: rating,
        image: imageUrl,
        reviews: [],
        status: "pending",
      };

      const response = await fetch(
        "https://quick-foods-server.vercel.app/pending-providers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(providerData),
        }
      );

      const data = await response.json();
      if (data.acknowledged) {
        Swal.fire({
          position: "center",
          title: 'Success!',
          text: 'Your request has been submitted successfully!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        form.reset();
        setCity("");
        setSelectedServiceArea("");
        setSelectedCateringTypes([]);
        setRating(0);
        setImage(null);
        setImagePreview("");
        setFormErrors({});
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to submit form. Please try again.',
        icon: 'error',
        confirmButtonColor: '#E23744',
      });
    }
  };

  return (
    <div className="px-4 bg-white mt-24 mb-16">
      <Helmet>
        <title>Service Form | Quick Foods</title>
      </Helmet>

      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Catering Service Form
      </h2>

      <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-xl border">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Field */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1.5 text-gray-700" htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E23744] focus:border-transparent ${formErrors.name ? "border-red-500" : "border-gray-300"
                  }`}
                required
              />
              {formErrors.name && (
                <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
              )}
            </div>

            {/* Address Field */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1.5 text-gray-700" htmlFor="address">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your address"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E23744] focus:border-transparent ${formErrors.address ? "border-red-500" : "border-gray-300"
                  }`}
                required
              />
              {formErrors.address && (
                <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
              )}
            </div>

            {/* City Field */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1.5 text-gray-700">
                City <span className="text-red-500">*</span>
              </label>
              <CustomSelect
                options={cityOptions}
                value={city}
                onChange={handleCityChange}
                placeholder="Select your city"
                className={formErrors.city ? "border-red-500" : ""}
              />
              {formErrors.city && (
                <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>
              )}
            </div>

            {/* Service Area Field */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1.5 text-gray-700">
                Service Area <span className="text-red-500">*</span>
              </label>
              <CustomSelect
                options={serviceAreaOptions}
                value={selectedServiceArea}
                onChange={handleServiceAreaChange}
                placeholder={city ? `Select area in ${city}` : "First select a city"}
                disabled={!city}
                className={formErrors.serviceArea ? "border-red-500" : ""}
              />
              {formErrors.serviceArea && (
                <p className="mt-1 text-sm text-red-600">{formErrors.serviceArea}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1.5 text-gray-700" htmlFor="email">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E23744] focus:border-transparent ${formErrors.email ? "border-red-500" : "border-gray-300"
                  }`}
                required
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1.5 text-gray-700" htmlFor="phone">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E23744] focus:border-transparent ${formErrors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                required
              />
              {formErrors.phone && (
                <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
              )}
            </div>

            {/* Postal Code Field */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1.5 text-gray-700" htmlFor="postalCode">
                Postal Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                placeholder="Enter your postal code"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E23744] focus:border-transparent ${formErrors.postalCode ? "border-red-500" : "border-gray-300"
                  }`}
                required
              />
              {formErrors.postalCode && (
                <p className="mt-1 text-sm text-red-600">{formErrors.postalCode}</p>
              )}
            </div>

            {/* Rating Field */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1.5 text-gray-700">
                Rating (1-5) <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={rating || ""}
                  onChange={(e) => setRating(parseFloat(e.target.value))}
                  placeholder="Enter rating (1-5)"
                  className={`w-32 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E23744] focus:border-transparent ${formErrors.rating ? "border-red-500" : "border-gray-300"
                    }`}
                />
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${(hoverRating || rating) >= star
                        ? "text-red-600"
                        : "text-gray-300"
                        }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600 text-sm">
                    {rating ? rating.toFixed(1) : "0.0"}
                  </span>
                </div>
              </div>
              {formErrors.rating && (
                <p className="mt-1 text-sm text-red-600">{formErrors.rating}</p>
              )}
            </div>

            {/* Image Upload Field */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-3 text-gray-700">
                Catering Service Image <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4">
                <label className="flex flex-col items-center justify-center w-64 h-44 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                    </div>
                  )}
                  <input
                    id="image"
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                  />
                </label>
                {image && (
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImagePreview("");
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
              {formErrors.image && (
                <p className="mt-1 text-sm text-red-600">{formErrors.image}</p>
              )}
            </div>

            {/* Catering Type Field */}
            <div className="mb-2">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Catering Services Offered <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                {cateringTypeOptions.map((type) => (
                  <div key={type} className="flex items-start group hover:text-[#E23744] transition-colors">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        id={type}
                        name="cateringTypes"
                        value={type}
                        checked={selectedCateringTypes.includes(type)}
                        onChange={handleCateringTypeChange}
                        className="h-4 w-4 accent-[#E23744] border rounded hover:"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor={type}
                        className="font-medium text-gray-700 group-hover:text-[#E23744] cursor-pointer transition-colors"
                      >
                        {type}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              {formErrors.cateringTypes && (
                <p className="mt-1 text-sm text-red-600">{formErrors.cateringTypes}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2.5 bg-[#E23744] text-white font-medium rounded-md hover:bg-[#d62f3c] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E23744]"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading Image...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCatering;