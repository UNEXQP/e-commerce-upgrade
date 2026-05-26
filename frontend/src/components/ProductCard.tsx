import { Link } from "react-router-dom"
import type { Products } from "../types/Product"
import { useCart } from "../context/CartContext"

interface Props {
    product: Products
}

export const ProductCard = ({ product }: Props) => {
    const { addToCart } = useCart()

    if (!product) return null

    return (
        <Link
            to={`/products/${product.id}`}
            className="w-full max-w-sm mx-auto block"
        >
            {/* Image Container */}
            <div className="bg-[#F0EEED] rounded-2xl p-3 sm:p-4 h-[200px] sm:h-[250px] flex items-center justify-center transition-transform hover:scale-[1.02]">
                <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain h-[140px] sm:h-[180px] lg:h-[200px] w-full p-2 rounded-[10px]"
                />
            </div>

            {/* Product Info */}
            <div className="mt-3 sm:mt-4 px-1">
                <h3 className="font-bold text-sm sm:text-base line-clamp-1">
                    {product.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {product.rating.rate} ★
                </p>

                <p className="font-semibold text-sm sm:text-lg mt-1">
                    ${product.price}
                </p>

                <button
                    onClick={(e) => {
                        e.preventDefault()
                        addToCart(product)
                    }}
                    className="bg-black text-white px-4 py-2.5 rounded-full mt-3 w-full cursor-pointer text-sm sm:text-base hover:opacity-90 transition"
                >
                    Add to Cart
                </button>
            </div>
        </Link>
    )
}