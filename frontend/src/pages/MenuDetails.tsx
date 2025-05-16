import axios from "axios"
import { useEffect, useState } from "react"


interface MenuDetail {
    item_id: string,
    name: string,
    description: string,
    price: string,
    available: boolean
}
export function MenuDetails() {

    const [item, setItem] = useState<MenuDetail[]>([])

    useEffect(() => {
        async function getMenu() {
            try {
                const response = await axios.get('http://localhost:3000/app/admin/allMenu',
                    {
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }
                    });
                setItem(response.data.message)
            } catch (err) {
                console.error("Failed to fetch rooms", err);
            }
        }
        getMenu()
    }, [])

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Menu Items</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {item.map((menuItem) => (
                    <div
                        key={menuItem.item_id}
                        className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{menuItem.name} #{menuItem.item_id}</h2>
                        <p className="text-gray-600 mb-3">{menuItem.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-green-600 font-bold text-lg">₹{menuItem.price}</span>
                            <span
                                className={`text-sm font-medium px-3 py-1 rounded-full ${menuItem.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {menuItem.available ? "Available" : "Unavailable"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}