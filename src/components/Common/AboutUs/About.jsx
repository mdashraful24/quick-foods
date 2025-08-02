const About = () => {
    return (
        <section className="container mx-auto px-3 pt-16 md:pt-24 lg:pt-32">
            <div className="text-center mb-8 md:mb-12">
                <h1 className="text-3xl md:text-5xl font-extrabold uppercase">About Us</h1>
                <p className="mt-3 max-w-xl mx-auto">
                    Discover the story behind Quick Foods — connecting you with top-notch catering services across Bangladesh.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="h-96 md:h-[500px]">
                    <img
                        src="https://images.unsplash.com/photo-1551218808-94e220e084d2"
                        alt="About Quick Foods"
                        className="rounded-2xl shadow-lg w-full h-full"
                    />
                </div>

                <div className="space-y-5 text-justify">
                    <h2 className="text-2xl font-semibold">Who We Are</h2>
                    <p className="leading-relaxed">
                        Welcome to Quick Foods, your one-stop destination for all catering needs across Bangladesh.
                        We’ve brought together the best catering service providers under one platform, making it
                        easy for you to explore, order, and enjoy delicious meals. Our delivery service ensures
                        your food reaches you fresh and on time.
                        <br /><br />
                        We take pride in offering budget-friendly student packages, including breakfast, lunch,
                        snacks, and dinner, designed to be the best in town. Looking ahead, we’re excited to
                        introduce our next venture—delivering pure, high-quality ingredients to our catering
                        partners. At Quick Foods, we connect you with great food and unmatched convenience.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
