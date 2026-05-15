import '../index.css'
import { FaShoppingCart } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa'
import { FaChevronDown } from "react-icons/fa";
import { useCart } from "../context/CartContext"
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const { totalItems } = useCart()

    return (
        <>
            <header>
                <div className='bg-black text-amber-50 flex justify-center p-2'>
                    <p>Sign up and get 20% off your first order. <span className='border-b'>Sign Up Now</span> </p>
                </div>
                <nav className='flex justify-around w-full items-center p-6'>
                    <h1 className='font-extrabold text-4xl'>SHOP.CO</h1>

                    <ul className='list-none flex items-center gap-8'>
                        <li className='flex items-center gap-1.5 cursor-pointer hover:text-gray-500'>Shop <FaChevronDown /></li>
                        <li className='hover:text-gray-500 cursor-pointer'>On Sale</li>
                        <li className='hover:text-gray-500 cursor-pointer'>New Arrival</li>
                        <li className='hover:text-gray-500 cursor-pointer'>Brands</li>
                    </ul>

                    <div className='flex items-center gap-3 bg-gray-200 rounded-3xl p-2 w-2xl'>
                        <FaSearch className='ml-2' />
                        <input type="text" placeholder='search for product' className='bg-transparent outline-none flex-1' />
                    </div>

                    <div className='flex items-center gap-6'>
                        <Link to="/cart" className='relative'>
                            <FaShoppingCart />
                            {totalItems > 0 && (
                                <span className='absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                        <FaUser />
                    </div>

                </nav>
            </header>
        </>
    )
}