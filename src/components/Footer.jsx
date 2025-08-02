import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import logo from "../assets/LogoCaCo.png"
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 shadow-inner py-10 px-5">
      {/* Top Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 justify-items-center gap-5 container mx-auto">
        {/* Learn More Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Learn More</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-red-600 hover:underline">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 hover:underline">
                Refund Account
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 hover:underline">
                Careers
              </a>
            </li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-3">
              <FaFacebook></FaFacebook>
              <a href="https://www.facebook.com/share/1HLeDKrDeF/" className="hover:text-red-600 hover:underline">
                Facebook
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaXTwitter></FaXTwitter>
              <a href="#" className="hover:text-red-600 hover:underline">
                X
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaInstagram></FaInstagram>
              <a href="#" className="hover:text-red-600 hover:underline">
                Instagram
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaLinkedin></FaLinkedin>
              <a href="#" className="hover:text-red-600 hover:underline">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        {/* CaCoverse Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">CaCoverse</h3>
          <ul className="space-y-2 capitalize">
            <li>
              <a href="foodKindle" className="hover:text-red-600 hover:underline">
                foodkindle
              </a>
            </li>
            <li>
              <a href="feedingBD" className="hover:text-red-600 hover:underline">
                Feeding BD
              </a>
            </li>
            <li>
              <a href="purevia" className="hover:text-red-600 hover:underline">
                Purevia
              </a>
            </li>
            <li>
              <a href="helloCaCo" className="hover:text-red-600 hover:underline">
                HelloCaCo
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-xl font-bold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-red-600 hover:underline">
                Terms
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 hover:underline">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 container mx-auto flex flex-col-reverse md:flex-row items-center justify-evenly gap-5 md:gap-0 text-sm">
        {/* Branding */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            {/* Logo */}
            <div>
              <img className="w-[120px]" src={logo} alt="logo" />
            </div>
            {/* Divider */}
            <div className="h-7 border-l-2 border-[#E23744]"></div>
            {/* Title */}
            <div>
              <h1 className="text-base font-bold">Quick Foods</h1>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-center md:text-left">&copy; {new Date().getFullYear()} CateringConnects. All rights reserved.</p>

        </div>
        {/* Subscribe Section */}
        <div className="flex items-center mt-4">
          <div className="w-full flex-0">
            <form noValidate>
              <div className="flex flex-row">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="flex-1 p-2 bg-white border border-[#E23744] rounded-l-md focus:outline-none focus:ring-[#E23744]"
                />
                <button
                  type="submit"
                  className="w-full text-base px-4 lg:px-6 py-2 text-white bg-[#E23744] rounded-r-md whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </footer>
  );
};
export default Footer;