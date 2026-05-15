

export const Footer = () => {
    return (
        <div className="relative top-['100px']">

            {/* Newsletter banner — sits on top, overlaps the footer bg */}
            <div className="bg-black text-white flex justify-between items-center 
                      rounded-2xl px-12 py-8 mx-16
                      absolute left-0 right-0 -top-12 z-10">
                <h1 className="text-3xl font-bold max-w-xs">
                    STAY UPTO DATE ABOUT OUR LATEST OFFERS
                </h1>
                <div className="flex gap-3">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="rounded-full px-4 py-2 text-black"
                    />
                    <button className="bg-white text-black rounded-full px-5 py-2 font-semibold">
                        Subscribe to Newsletter
                    </button>
                </div>
            </div>


            <div className="pt-40 pb-8 px-12 grid grid-cols-5 gap-6 mt-5 bg-gray-300">

                {/* Brand col */}
                <div>
                    <h3 className="text-xl font-black tracking-tighter mb-3">SHOP.CO</h3>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-[180px] mb-5">
                        We have clothes that suits your style and which you're proud to wear. From women to men.
                    </p>
                    <div className="flex gap-2">
                        {["𝕏", "f", "◎", "⌥"].map((icon, i) => (
                            <div key={i} className="w-7 h-7 rounded-full border border-gray-300 
                                      flex items-center justify-center text-xs cursor-pointer
                                      hover:border-black transition-colors">
                                {icon}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Link columns */}
                {[
                    { title: "COMPANY", links: ["About", "Features", "Works", "Career"] },
                    { title: "HELP", links: ["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"] },
                    { title: "FAQ", links: ["Account", "Manage Deliveries", "Orders", "Payments"] },
                    { title: "RESOURCES", links: ["Free eBooks", "Development Tutorial", "How to – Blog", "Youtube Playlist"] },
                ].map(({ title, links }) => (
                    <div key={title}>
                        <h4 className="text-xs font-bold tracking-widest mb-4">{title}</h4>
                        <ul className="flex flex-col gap-2.5">
                            {links.map(link => (
                                <li key={link} className="text-sm text-gray-500 hover:text-black cursor-pointer transition-colors">
                                    {link}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-100 mx-12 py-5 flex justify-between items-center">
                <span className="text-xs text-gray-400">Shop.co © 2000-2023, All Rights Reserved</span>
                <div className="flex gap-2">
                    {["VISA", "MC", "PayPal", "⌘Pay", "GPay"].map(method => (
                        <div key={method} className="bg-gray-100 px-3 py-1.5 rounded text-xs font-bold text-gray-600">
                            {method}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}