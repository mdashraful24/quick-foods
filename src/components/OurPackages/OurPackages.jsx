import OrderDetails from "./OrderDetails";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiLoader } from "react-icons/fi";

const OurPackages = () => {
  window.scrollTo(0, 0);
  const axiosSecure = useAxiosSecure();

  // useQuery hook to fetch data
  const { data: packages = [], isLoading, isError } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    }
  });

  // Display loading or error state
  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <FiLoader className="animate-spin text-4xl text-[#E23744]" />
    </div>
  );

  if (isError) {
    return <div>Error fetching data!</div>;
  }

  return (
    <div className="container mx-auto px-4 mt-28 mb-20">
      <h1 className="text-2xl md:text-4xl text-center font-bold">Check Our Packages</h1>
      {packages.map((category) => (
        <div key={category.category} className="mt-10">
          <h2 className="text-2xl font-semibold">{category.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {category.packages.map((pkg) => (
              <OrderDetails key={pkg.name} packageDetails={pkg} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OurPackages;
