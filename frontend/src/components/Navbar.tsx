import "../index.css";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {
    const { totalItems } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="w-full">
            {/* TOP BANNER */}
            <div className="bg-black text-amber-50 flex justify-center p-2 text-xs sm:text-sm text-center px-4">
                <p>
                    Sign up and get 20% off your first order.{" "}
                    <span className="border-b cursor-pointer">
                        Sign Up Now
                    </span>
                </p>
            </div>

            {/* NAV */}
            <nav className="flex items-center justify-between px-4 sm:px-8 lg:px-16 py-4 relative">
                {/* LOGO + HAMBURGER */}
                <div className="flex items-center gap-3">
                    <button
                        className="lg:hidden text-xl"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    <h1 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl">
                        SHOP.CO
                    </h1>
                </div>

                {/* DESKTOP LINKS */}
                <ul className="hidden lg:flex items-center gap-8">
                    <li className="flex items-center gap-1.5 cursor-pointer hover:text-gray-500">
                        Shop <FaChevronDown />
                    </li>
                    <li className="hover:text-gray-500 cursor-pointer">
                        On Sale
                    </li>
                    <li className="hover:text-gray-500 cursor-pointer">
                        New Arrival
                    </li>
                    <li className="hover:text-gray-500 cursor-pointer">
                        Brands
                    </li>
                </ul>

                {/* SEARCH (desktop only) */}
                <div className="hidden md:flex items-center gap-3 bg-gray-200 rounded-3xl p-2 w-[250px] lg:w-[400px]">
                    <FaSearch className="ml-2" />
                    <input
                        type="text"
                        placeholder="Search for product"
                        className="bg-transparent outline-none flex-1 text-sm"
                    />
                </div>

                {/* ICONS */}
                <div className="flex items-center gap-4 sm:gap-6">
                    <Link to="/cart" className="relative text-xl">
                        <FaShoppingCart />

                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    <FaUser />
                </div>
            </nav>

            {/* MOBILE MENU */}
            {menuOpen && (
                <div className="lg:hidden px-6 pb-4 space-y-4 border-t">
                    {/* MOBILE SEARCH */}
                    <div className="flex items-center gap-3 bg-gray-200 rounded-3xl p-2 w-full">
                        <FaSearch className="ml-2" />
                        <input
                            type="text"
                            placeholder="Search for product"
                            className="bg-transparent outline-none flex-1 text-sm"
                        />
                    </div>

                    {/* MOBILE LINKS */}
                    <ul className="flex flex-col gap-4 text-sm">
                        <li className="flex items-center gap-1.5 cursor-pointer">
                            Shop <FaChevronDown />
                        </li>
                        <li>On Sale</li>
                        <li>New Arrival</li>
                        <li>Brands</li>
                    </ul>
                </div>
            )}
        </header>
    );
};