import About from "../components/Common/AboutUs/About";
import Category from "../components/Common/Category/Category";
import HeroSection from "../components/Common/HeroSection/HeroSection";
import Services from "../components/Common/Services/Services";
import TopProviders from "../components/Common/TopProviders/TopProviders";
import CustomerReviews from "../components/Common/CustomerReviews/CustomerReviews";

const HomeLayout = () => {
    window.scrollTo(0, 0);

    return (
        <div>
            {/* Hero Banner */}
            <HeroSection></HeroSection>

            {/* About */}
            <About></About>

            {/* Top Providers */}
            <TopProviders></TopProviders>

            {/* Category */}
            <Category></Category>

            {/* Services */}
            <Services></Services>

            {/* Customer Reviews */}
            <CustomerReviews></CustomerReviews>
        </div>
    );
};

export default HomeLayout;