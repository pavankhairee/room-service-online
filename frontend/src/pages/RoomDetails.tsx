import axios from "axios";
import { useEffect, useState } from "react";

interface RoomInfo {
    room_id: number;
    room_number: string;
    room_type: string;
    status: string;
}

export function RoomsDetails() {
    const [room, setRoom] = useState<RoomInfo[]>([]);

    useEffect(() => {
        async function getRooms() {
            try {
                const response = await axios.get("http://localhost:3000/app/admin/allRoom", {
                    headers: {
                        Authorization: localStorage.getItem("token") || "",
                    },
                });
                setRoom(response.data.message);
            } catch (err) {
                console.error("Failed to fetch rooms", err);
            }
        }
        getRooms();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Room Details</h1>

            {room.length === 0 ? (
                <p className="text-gray-500">No room data available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {room.map((r) => (
                        <div
                            key={r.room_id}
                            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow"
                        >
                            <h2 className="text-xl font-semibold mb-2">Room Number {r.room_number} #{r.room_id}</h2>
                            <p className="text-gray-700">

                                <strong>Type:</strong> {r.room_type}
                            </p>
                            <p className="text-gray-700 flex items-center">
                                <strong>Status:</strong>{" "}
                                <span
                                    className={`ml-2 px-2 py-1 rounded-full text-sm ${r.status === "available"
                                        ? "bg-green-100 text-green-700"
                                        : r.status === "occupied"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {r.status}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
