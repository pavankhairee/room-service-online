import axios from "axios"
import { BACKEND_URL } from "../Config"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { ItemCard } from "../components/ItemCard";

export function Menu() {
    const [menuItem, setMenuItem] = useState([]);
    useEffect(() => {

        async function MenuItem() {
            const response = await axios.get("http://localhost:3000/app/v1/allmenu");
            setMenuItem(response.data.allmenu);
            console.log(response.data.allmenu);
        }

        MenuItem()
    }, [])

    const [cart, setCart] = useState<{ menu_item_id: number; quantity: number, name: string }[]>([]);

    // Update the cart and save to localStorage
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(savedCart);
    }, []);

    function addToCart(menu_item_id: number, quantity: number, name: string) {
        setCart(prev => {

            const exists = prev.find(item => item.menu_item_id === menu_item_id);

            if (exists) {

                return prev.map(item =>
                    item.menu_item_id === menu_item_id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { menu_item_id, quantity, name }];
        });
    }


    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const navigate = useNavigate();
    return (

        <div className="min-h-screen w-full px-4 py-6">
            <div className="flex justify-between">
                <div>
                    <h2 className="text-2xl font-bold ">Menu</h2>
                </div>
                <div className="flex gap-4">
                    <button className="bg-green-600 text-white px-2 py-2  rounded shadow hover:bg-green-700" onClick={() => navigate("/service")}>Room Service</button>
                    <button className="bg-green-600 text-white px-2 py-2  rounded shadow hover:bg-green-700" onClick={() => navigate("/bill")}>Total Bill</button>
                    <button className="bg-green-600 text-white px-2 py-2  rounded shadow hover:bg-green-700" onClick={() => navigate("/history")}>History</button>
                    <button className="bg-green-600 text-white px-2 py-2  rounded shadow hover:bg-green-700" onClick={() => navigate("/cart")}>Go to Cart</button>

                </div>
            </div><br />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.isArray(menuItem) &&
                    menuItem.map((item: any, index: number) => (
                        <ItemCard
                            key={index}
                            image={item.image}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            onclick={(quantity) => addToCart(item.item_id, quantity)}

                        />
                    ))}
            </div>
        </div>


    );
}