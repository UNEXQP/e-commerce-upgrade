import { createContext, useContext, useState, type ReactNode } from "react";
import type { Products } from "../types/Product";

interface CartItem extends Products {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Products, quantity?: number) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // const addToCart = (product: Products, quantity = 1) => {
    //     setCart((prevCart) => {
    //         const existingItems = prevCart.find((prev) => prev.id === product.id)
    //         if (existingItems) {
    //             prevCart.map((item) => (
    //                 item.id === product.id ?
    //                     { ...item, quantity: item.quantity + quantity } :
    //                     item
    //             ))
    //         }
    //         return [...prevCart, { ...product, quantity }]
    //     })
    // }

    const addToCart = (product: Products, quantity = 1) => {
        setCart(prevCart => {
            const existingItems = prevCart.find((item, _) => item.id === product.id)

            if (existingItems) {
                prevCart.map((item) => {
                    item.id === product.id ?
                        { ...item, quantity: item.quantity + quantity } : item
                })
            }
          return  [...prevCart, { ...product, quantity }]
        })
    }

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity < 1) return;
        setCart((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };



    const clearCart = () => setCart([]);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};