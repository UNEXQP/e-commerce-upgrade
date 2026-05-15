import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { useCart } from "../context/CartContext"
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi"
import { Link } from "react-router-dom"

export const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart()

    if (cart.length === 0) {
        return (
            <>
                <Navbar />
                <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
                    <p className="text-2xl font-bold">Your cart is empty</p>
                    <Link to="/products" className="bg-black text-white px-6 py-3 rounded-full text-sm">
                        Browse Products
                    </Link>
                </div>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight">Your Cart</h1>
                    <p className="text-sm text-gray-400">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1 flex flex-col gap-4">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
                            >
                                <div className="bg-[#F0EEED] rounded-xl w-[100px] h-[100px] flex items-center justify-center shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-[80px] h-[80px] object-contain"
                                    />
                                </div>

                                <div className="flex flex-col justify-between flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-sm line-clamp-2 w-[75%]">{item.title}</h3>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                                        >
                                            <FiTrash2 size={16} />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>

                                        <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1.5">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="cursor-pointer text-gray-600 hover:text-black"
                                            >
                                                <FiMinus size={13} />
                                            </button>
                                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="cursor-pointer text-gray-600 hover:text-black"
                                            >
                                                <FiPlus size={13} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={clearCart}
                            className="text-sm text-gray-400 hover:text-red-500 self-start mt-2 transition-colors cursor-pointer"
                        >
                            Clear cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-[340px] shrink-0">
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-6">
                            <h2 className="font-bold text-lg mb-5">Order Summary</h2>

                            <div className="flex flex-col gap-3 text-sm text-gray-600 mb-5">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-black">${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-green-500 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax (5%)</span>
                                    <span className="font-medium text-black">${(totalPrice * 0.05).toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-base mb-6">
                                <span>Total</span>
                                <span>${(totalPrice * 1.05).toFixed(2)}</span>
                            </div>

                            <button className="w-full bg-black text-white rounded-full py-3 text-sm font-medium cursor-pointer hover:bg-gray-900 transition-colors">
                                Checkout
                            </button>

                            <Link
                                to="/products"
                                className="block text-center text-sm text-gray-400 mt-3 hover:text-black transition-colors"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}