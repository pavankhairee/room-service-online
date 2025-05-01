interface CartCardProps {
    name: string;
    description: string;
    price: string;
    image: string;
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

export function CartCard(props: CartCardProps) {
    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden w-72">
            <img
                src={props.image}
                alt={props.name}
                className="w-full h-36 object-cover"
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{props.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{props.description}</p>
                <div className="flex justify-between items-center mt-3">
                    <span className="text-md font-bold text-amber-600">₹{props.price}</span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={props.onDecrease}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            −
                        </button>
                        <span>{props.quantity}</span>
                        <button
                            onClick={props.onIncrease}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}
