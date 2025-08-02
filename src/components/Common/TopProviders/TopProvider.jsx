import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from 'react-icons/io';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TopProvider = ({ id, name, rating, image }) => {
    const navigate = useNavigate();

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const handleViewProfile = () => {
        navigate(`/provider/${id}`);
    };

    return (
        <div className="md:max-w-sm w-full bg-white rounded-xl shadow-md overflow-hidden">
            {/* Image */}
            <div className="relative h-80 overflow-hidden group transition duration-300 hover:-translate-y-1">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                {/* Social Icons on Hover */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FaFacebook className="text-white text-4xl hover:text-blue-500 transition" />
                    <FaTwitter className="text-white text-4xl hover:text-sky-400 transition" />
                    <FaInstagram className="text-white text-4xl hover:text-pink-500 transition" />
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{name}</h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#E23744]/10 text-[#E23744]">
                        {rating.toFixed(1)}
                    </span>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                    <div className="flex mr-2">
                        {[...Array(fullStars)].map((_, i) => (
                            <IoMdStar key={`full-${i}`} className="text-[#E23744] text-lg" />
                        ))}
                        {hasHalfStar && <IoMdStarHalf className="text-[#E23744] text-lg" />}
                        {[...Array(emptyStars)].map((_, i) => (
                            <IoMdStarOutline key={`empty-${i}`} className="text-[#E23744] text-lg" />
                        ))}
                    </div>
                    <span className="text-sm text-gray-500">({rating.toFixed(1)} rating)</span>
                </div>

                {/* Button */}
                <button
                    onClick={handleViewProfile}
                    className="w-full py-2 px-4 bg-[#E23744] hover:bg-[#c5313d] text-white font-medium rounded-lg transition-colors duration-300"
                >
                    View Profile
                </button>
            </div>
        </div>
    );
};

export default TopProvider;
