import { Link } from "react-router-dom";


const Error = () => {
    return (
        <div className=" mx-auto w-11/12">
            <h1 className="font-bold text-5xl">404 Page Not Found</h1>
            <Link to="/" className="btn">Go to Home</Link>
        </div>
    );
};

export default Error;