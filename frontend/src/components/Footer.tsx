

export const Footer = () => {
    return (
        <footer className="relative mt-20 bg-gray-300">

            {/* NEWSLETTER */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-16 w-[92%] max-w-6xl">
                <div className="bg-black text-white rounded-2xl px-6 sm:px-10 lg:px-12 py-8 flex flex-col lg:flex-row items-center justify-between gap-6">

                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold max-w-md text-center lg:text-left">
                        STAY UP TO DATE ABOUT OUR LATEST OFFERS
                    </h1>

                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="rounded-full px-4 py-2 text-black w-full sm:w-[250px]"
                        />

                        <button className="bg-white text-black rounded-full px-5 py-2 font-semibold w-full sm:w-auto">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* MAIN FOOTER */}
            <div className="pt-32 sm:pt-40 pb-10 px-6 sm:px-10 lg:px-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

                    {/* BRAND */}
                    <div>
                        <h3 className="text-xl font-black tracking-tighter mb-3">
                            SHOP.CO
                        </h3>

                        <p className="text-sm text-gray-600 leading-relaxed max-w-[220px] mb-5">
                            We have clothes that suits your style and which you're proud to wear.
                        </p>

                        <div className="flex gap-2">
                            {["𝕏", "f", "◎", "⌥"].map((icon, i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-xs cursor-pointer hover:border-black transition"
                                >
                                    {icon}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* LINKS */}
                    {[
                        {
                            title: "COMPANY",
                            links: ["About", "Features", "Works", "Career"],
                        },
                        {
                            title: "HELP",
                            links: [
                                "Customer Support",
                                "Delivery Details",
                                "Terms & Conditions",
                                "Privacy Policy",
                            ],
                        },
                        {
                            title: "FAQ",
                            links: ["Account", "Manage Deliveries", "Orders", "Payments"],
                        },
                        {
                            title: "RESOURCES",
                            links: [
                                "Free eBooks",
                                "Development Tutorial",
                                "Blog",
                                "YouTube Playlist",
                            ],
                        },
                    ].map(({ title, links }) => (
                        <div key={title}>
                            <h4 className="text-xs font-bold tracking-widest mb-4">
                                {title}
                            </h4>

                            <ul className="flex flex-col gap-2.5">
                                {links.map((link) => (
                                    <li
                                        key={link}
                                        className="text-sm text-gray-600 hover:text-black cursor-pointer transition"
                                    >
                                        {link}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* BOTTOM BAR */}
                <div className="border-t border-gray-400 mt-10 pt-6 flex flex-col sm:flex-row gap-4 sm:justify-between items-center text-center">
                    <span className="text-xs text-gray-500">
                        Shop.co © 2000-2026, All Rights Reserved
                    </span>

                    <div className="flex flex-wrap justify-center gap-2">
                        {["VISA", "MC", "PayPal", "Apple Pay", "GPay"].map(
                            (method) => (
                                <div
                                    key={method}
                                    className="bg-gray-100 px-3 py-1.5 rounded text-xs font-bold text-gray-600"
                                >
                                    {method}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
};