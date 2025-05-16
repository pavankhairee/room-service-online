import axios from "axios";
import { useEffect, useState } from "react";
import { ItemCard } from "../components/ItemCard";
import { CartCard } from "../components/CartCard";
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import { Button } from "../components/Buttons";
import { Menu } from "./MenuPage";

type CartItem = {
    menu_item_id: number;
    quantity: number;
    name: string
};

export function CartPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [menuItems, setMenuItems] = useState<any[]>([]);
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(savedCart);

        axios.get("http://localhost:3000/app/v1/allmenu").then(res => {
            setMenuItems(res.data.allmenu);
        });
    }, []);

    const handlePlaceOrder = async () => {
        try {
            const response = await axios.post("http://localhost:3000/app/v1/orders", {
                items: cart
            }, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            });

            console.log("Order ID:", response.data.order_id);
            setCart([]);
            localStorage.removeItem("cart");
        } catch (error) {
            console.error("Order failed:");
        }


    };

    function updateCartItem(menu_item_id: number, change: number) {
        setCart(prev =>
            prev.map(item =>
                item.menu_item_id === menu_item_id
                    ? { ...item, quantity: Math.max(item.quantity + change, 1) }
                    : item
            )
        );
    }

    const navigate = useNavigate()
    return (
        <div className="p-4 min-h-screen">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
                <Button onClick={() => navigate("/menupage")}>Back</Button>
            </div>

            {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {cart.map(cartItem => {
                        const menuData = menuItems.find(item => item.item_id === cartItem.menu_item_id);
                        if (!menuData) return null;

                        return (
                            <CartCard
                                key={menuData.item_id}
                                image={menuData.image}
                                name={menuData.name}
                                description={menuData.description}
                                price={menuData.price}
                                quantity={cartItem.quantity}
                                onIncrease={() => updateCartItem(cartItem.menu_item_id, 1)}
                                onDecrease={() => updateCartItem(cartItem.menu_item_id, -1)}
                            />
                        );
                    })}

                </div>

            )}
            {cart.length > 0 &&
                <button
                    onClick={handlePlaceOrder}
                    className="mt-6 bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700"
                >
                    Place Order
                </button>
            }
        </div>
    );
}
