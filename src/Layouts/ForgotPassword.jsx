import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const { forgotPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear any previous messages
    setMessage({ type: "", text: "" });

    if (!email.trim()) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    try {
      // Trigger password reset
      await forgotPassword(email);
      setMessage({
        type: "success",
        text: "A password reset link has been sent to your email. Please check your inbox.",
      });
      setEmail("");
    } catch (error) {
      alert("Error sending reset link:", error.message);
      setMessage({
        type: "error",
        text: "Failed to send reset link. Please check the email address and try again.",
      });
    }
  };

  return (
    <div className="mt-28 mb-20 px-4">
        <h2 className="text-xl md:text-4xl font-bold text-center">Reset Password</h2>
        <p className="text-base text-center mt-2">
          Enter your email address to receive a password reset link.
        </p>

      <div className="max-w-lg mx-auto shadow-md border rounded-lg p-4 md:p-6 mt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="block font-medium"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-red-600 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {message.text && (
            <p
              className={`${message.type === "success" ? "text-green-500" : "text-red-500"
                }`}
            >
              {message.text}
            </p>
          )}

          <button
            type="submit"
            className="mt-6 btn w-full bg-[#E23744] text-white py-2 rounded-md hover:bg-[#E23744]"
          >
            Send Reset Link
          </button>
        </form>

        {/* <div className="text-center mt-4">
          Already have an account? Back to {" "}
          <Link to="/auth/login" className="font-bold text-[#E23744]">
            Login
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default ForgotPassword;