import { useEffect, useRef, useState } from "react";

const CustomSelect = ({
    options,
    value,
    onChange,
    placeholder,
    disabled = false,
    className = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            className={`relative w-full ${className}`}
            ref={selectRef}
        >
            <button
                type="button"
                className={`w-full px-3 py-2 text-left border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E23744] flex justify-between items-center transition-colors duration-200 ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white cursor-pointer hover:border-gray-400"
                    } ${!value ? "text-gray-400 placeholder-gray-600" : "text-gray-700"}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
            >
                <span>{value || placeholder}</span>
                <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`px-3 py-2 cursor-pointer transition-colors duration-200 ${value === option.value
                                ? "bg-[#E23744] text-white"
                                : "hover:bg-[#E23744] hover:text-white"
                                }`}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;