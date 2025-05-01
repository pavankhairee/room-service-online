import axios from "axios"
import { useEffect, useState } from "react"



interface HistoryItem {

    order_id: number;
    item_name: string;
    quantity: number;
    price: string;
    created_at: string;
    status: string;
}


export function HistoryPage() {

    const [history, setHistory] = useState<HistoryItem[]>([]);
    useEffect(() => {

        async function getHistory() {

            const response = await axios.get("http://localhost:3000/app/v1/orders", {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })

            setHistory(response.data.response)
        }
        getHistory()
    }, [])

    return (
        <>
            <div>
                <h1 className="text-2xl">Order History </h1>
                {history.length === 0 ? (
                    <p>No Orders Found</p>
                ) : (Array.isArray(history) &&

                    <div className="flex flex-wrap gap-4 ">
                        {history.map((order) => (
                            <div
                                key={order.order_id}
                                className="bg-white w-72 p-4 rounded-lg hover:bg-sky-100 shadow-md flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold">{order.item_name}</h3>
                                    <p>Order id : {order.order_id}</p>
                                    <p>Quantity: {order.quantity}</p>
                                    <p>Price: ₹{order.price}</p>

                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                    Ordered At: {new Date(order.created_at).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
                <div>
                </div>
            </div>
        </>
    )
}