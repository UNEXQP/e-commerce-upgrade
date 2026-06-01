import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useCart } from "../context/CartContext";
import { FiMinus, FiPlus, FiTrash2, FiCopy, FiCheck, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";

type ModalStep = "idle" | "form" | "loading" | "payment" | "confirmed";

interface PaymentDetails {
    virtualAccount: string;
    virtualAccountName: string;
    bankName: string;
    amountKobo: number;
    reference: string;
    trackingId: string;
}

export const CartPage = () => {
    const {
        cart,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice,
        clearCart,
    } = useCart();

    const [step, setStep] = useState<ModalStep>("idle");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [payment, setPayment] = useState<PaymentDetails | null>(null);
    const [copied, setCopied] = useState(false);

    const totalWithTax = totalPrice * 1.05;
    const amountKobo = Math.round(totalWithTax * 100);

    const handleCheckout = async () => {
        setError("");
        if (!name.trim() || !phone.trim()) {
            setError("Please fill in all fields");
            return;
        }
        if (phone.length < 10) {
            setError("Enter a valid phone number");
            return;
        }

        setStep("loading");

        try {
            const res = await fetch("http://localhost:3001/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderId: `order_${Date.now()}`,
                    amountKobo,
                    customerName: name.trim(),
                    customerPhone: phone.trim(),
                }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Checkout failed");

            setPayment(data);
            setStep("payment");
        } catch (err: any) {
            setError(err.message || "Something went wrong");
            setStep("form");
        }
    };

    const copyAccount = () => {
        if (!payment) return;
        navigator.clipboard.writeText(payment.virtualAccount);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const closeModal = () => {
        setStep("idle");
        setName("");
        setPhone("");
        setError("");
        setPayment(null);
    };

    if (cart.length === 0) {
        return (
            <>
                <Navbar />
                <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 px-6 text-center">
                    <p className="text-2xl font-bold">Your cart is empty</p>
                    <Link to="/products" className="bg-black text-white px-6 py-3 rounded-full text-sm">
                        Browse Products
                    </Link>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Your Cart</h1>
                    <p className="text-sm text-gray-400">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
                </div>

                {/* LAYOUT */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* CART ITEMS */}
                    <div className="flex-1 flex flex-col gap-4">
                        {cart.map((item) => (
                            <div key={item.id} className="flex flex-col sm:flex-row gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                                <div className="bg-[#F0EEED] rounded-xl w-full sm:w-[100px] h-[120px] sm:h-[100px] flex items-center justify-center shrink-0">
                                    <img src={item.image} alt={item.title} className="w-[90px] h-[90px] object-contain" />
                                </div>
                                <div className="flex flex-col justify-between flex-1 gap-3">
                                    <div className="flex justify-between gap-3">
                                        <h3 className="font-semibold text-sm sm:text-base line-clamp-2">{item.title}</h3>
                                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                            <FiTrash2 size={16} />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="font-bold text-sm sm:text-base">${(item.price * item.quantity).toFixed(2)}</p>
                                        <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1.5">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-600 hover:text-black">
                                                <FiMinus size={13} />
                                            </button>
                                            <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-600 hover:text-black">
                                                <FiPlus size={13} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button onClick={clearCart} className="text-sm text-gray-400 hover:text-red-500 self-start mt-2 transition-colors">
                            Clear cart
                        </button>
                    </div>

                    {/* SUMMARY */}
                    <div className="w-full lg:w-[340px]">
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm lg:sticky lg:top-6">
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
                                <span>${totalWithTax.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={() => setStep("form")}
                                className="w-full bg-black text-white rounded-full py-3 text-sm font-medium hover:bg-gray-900 transition"
                            >
                                Checkout
                            </button>
                            <Link to="/products" className="block text-center text-sm text-gray-400 mt-3 hover:text-black transition">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            {/* MODAL */}
            {step !== "idle" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative">

                        {/* CLOSE */}
                        {step !== "loading" && (
                            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-black transition">
                                <FiX size={20} />
                            </button>
                        )}

                        {/* STEP: FORM */}
                        {(step === "form") && (
                            <>
                                <h2 className="text-xl font-bold mb-1">Complete your order</h2>
                                <p className="text-sm text-gray-400 mb-6">Enter your details to generate a payment account</p>

                                <div className="flex flex-col gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 block mb-1.5">Full Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="e.g. Rotimi Anfela"
                                            maxLength={30}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 block mb-1.5">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="e.g. 08012345678"
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                                        />
                                    </div>

                                    {error && <p className="text-red-500 text-sm">{error}</p>}

                                    <div className="border-t border-gray-100 pt-4 flex justify-between text-sm font-bold">
                                        <span>Total to pay</span>
                                        <span>₦{totalWithTax.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</span>
                                    </div>

                                    <button
                                        onClick={handleCheckout}
                                        className="w-full bg-black text-white rounded-full py-3 text-sm font-medium hover:bg-gray-900 transition"
                                    >
                                        Generate Payment Account
                                    </button>
                                </div>
                            </>
                        )}

                        {/* STEP: LOADING */}
                        {step === "loading" && (
                            <div className="flex flex-col items-center justify-center py-10 gap-4">
                                <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                <p className="text-sm text-gray-500">Creating your payment account...</p>
                            </div>
                        )}

                        {/* STEP: PAYMENT */}
                        {step === "payment" && payment && (
                            <>
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <h2 className="text-xl font-bold">Transfer Details</h2>
                                </div>
                                <p className="text-sm text-gray-400 mb-6">Make a bank transfer to complete your order</p>

                                {/* VA NUMBER */}
                                <div className="bg-gray-50 rounded-2xl p-5 mb-4">
                                    <p className="text-xs text-gray-400 mb-1">Account Number</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-3xl font-bold tracking-widest">{payment.virtualAccount}</span>
                                        <button
                                            onClick={copyAccount}
                                            className="flex items-center gap-1.5 text-xs font-medium bg-black text-white px-3 py-1.5 rounded-full hover:bg-gray-800 transition"
                                        >
                                            {copied ? <FiCheck size={12} /> : <FiCopy size={12} />}
                                            {copied ? "Copied" : "Copy"}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 text-sm mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Account Name</span>
                                        <span className="font-medium">{payment.virtualAccountName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Bank</span>
                                        <span className="font-medium">{payment.bankName || "Providus Bank"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Amount</span>
                                        <span className="font-bold text-base">₦{(payment.amountKobo / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 })}</span>
                                    </div>
                                </div>

                                <p className="text-xs text-gray-400 text-center mb-4">
                                    Transfer the exact amount. Your order will be confirmed automatically once payment is received.
                                </p>

                                <button
                                    onClick={() => setStep("confirmed")}
                                    className="w-full bg-black text-white rounded-full py-3 text-sm font-medium hover:bg-gray-900 transition"
                                >
                                    I've Made the Transfer
                                </button>
                            </>
                        )}

                        {/* STEP: CONFIRMED */}
                        {step === "confirmed" && (
                            <div className="flex flex-col items-center text-center py-6 gap-4">
                                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                                    <FiCheck size={24} className="text-green-600" />
                                </div>
                                <h2 className="text-xl font-bold">Transfer Noted</h2>
                                <p className="text-sm text-gray-400 max-w-xs">
                                    We'll confirm your payment automatically. You'll receive an update once the transfer is verified.
                                </p>
                                <button
                                    onClick={() => { closeModal(); clearCart(); }}
                                    className="mt-2 bg-black text-white rounded-full px-8 py-3 text-sm font-medium hover:bg-gray-900 transition"
                                >
                                    Done
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            )}
        </>
    );
};