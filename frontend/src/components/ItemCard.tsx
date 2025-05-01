import { useState } from "react";

interface CardProps {
    name: string;
    description: string;
    price: string;
    image: string;
    onclick: (quantity: number) => void;
}

export function ItemCard(props: CardProps) {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    return (
        <div className="bg-white  border-2 shadow-lg rounded-2xl overflow-hidden w-72 hover:shadow-amber-300 transition-shadow">
            <img
                src={props.image}
                alt={props.name}
                className="w-full h-40 object-cover bg-amber-100 rounded-b-sm"
            />
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{props.name}</h2>
                <p className="text-gray-600 mt-2">{props.description}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-amber-600">₹{props.price}</span>
                </div>

                <div>
                    <div className="flex items-center gap-2 ">
                        <button
                            onClick={handleDecrement}
                            className="px-3 py-1 bg-gray-200 rounded-full text-lg font-bold"
                        >
                            -
                        </button>
                        <span>{quantity}</span>
                        <button
                            onClick={handleIncrement}
                            className="px-3 py-1 bg-gray-200 rounded-full text-lg font-bold"
                        >
                            +
                        </button>

                        <button
                            onClick={() => props.onclick(quantity)}
                            className=" w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                        >
                            Add to Cart
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
