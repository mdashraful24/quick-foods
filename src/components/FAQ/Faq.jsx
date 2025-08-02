import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { IoTriangle } from "react-icons/io5";
import { toast } from "react-toastify";

const Faq = () => {
  window.scrollTo(0, 0);
  const [faqs, setFaqs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("General");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const faqRef = useRef(null);

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    fetch("faqData.json")
      .then((response) => response.json())
      .then((data) => setFaqs(data))
      .catch((error) => console.error("Error fetching data:", error));

    const handleClickOutside = (event) => {
      if (faqRef.current && !faqRef.current.contains(event.target)) {
        setExpandedIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddQuestion = () => {
    const newEntry = {
      question: newQuestion,
      category: newCategory,
    };

    fetch("https://quick-foods-server.vercel.app/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry),
    })
      .then((response) => response.json())
      .then((savedFaq) => {
        setFaqs([...faqs, savedFaq]);
        setNewQuestion("");
        setNewCategory("");
        setIsModalOpen(false);
        toast.success("Question added successfully!", {
          position: "top-right",
        });
      })
      .catch((error) => {
        console.error("Error posting data:", error);
        toast.error("Failed to add question!", {
          position: "top-right",
        });
      });
  };

  return (
    <div className="container mx-auto mt-16 mb-16 min-h-80 rounded-xl p-8">
      <Helmet>
        <title>FAQ | Quick Foods</title>
      </Helmet>

      <h2 className="text-2xl md:text-4xl font-bold text-center mb-5">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-gray-600 mb-10">
        These are the most commonly asked questions about Quick Foods
        (CaCo).
      </p>

      {/* Categories */}
      <div className="flex flex-wrap justify-center mb-8">
        {faqs.length > 0 &&
          faqs.map((categoryData) => (
            <button
              key={categoryData._id}
              onClick={() => {
                setActiveCategory(categoryData.category);
                setExpandedIndex(null);
              }}
              className={`px-4 py-2 m-1 text-sm font-semibold border rounded-full hover:bg-red-500 hover:text-white ${activeCategory === categoryData.category
                ? "bg-red-500 text-white"
                : "border-gray-300 text-gray-700"
                }`}
            >
              {categoryData.category}
            </button>
          ))}
      </div>

      {/* FAQ List */}
      <div ref={faqRef} className="space-y-4">
        {faqs.length > 0 &&
          faqs
            .filter((categoryData) => categoryData.category === activeCategory)
            .map((categoryData) => (
              <div key={categoryData._id}>
                {categoryData.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="p-4 mt-3 border rounded-lg shadow-sm hover:shadow-md"
                  >
                    <button
                      className="w-full text-left font-semibold flex  gap-2"
                      onClick={() => toggleFAQ(index)}
                    >
                      <IoTriangle
                        className={`text-[#E23744] transform transition-transform duration-200 w-4 h-6 flex-shrink-0 ${expandedIndex === index ? "rotate-180" : "rotate-90"
                          }`}
                      />
                      <span>{faq.question}</span>
                    </button>
                    {expandedIndex === index && (
                      <div className="mt-2 text-gray-700">{faq.answer}</div>
                    )}
                  </div>
                ))}
              </div>
            ))}
      </div>
    </div>
  );
};

export default Faq;
