import { useNavigate } from "react-router-dom";

export function AdminDash() {
    const navigate = useNavigate();

    const handleClick = (route: string) => {
        console.log("Card clicked:", route); // Your custom function logic here
        navigate(route); // Navigate to the page
    };

    const dashboardItems = [
        { title: "Details of Rooms", route: "/admin/rooms" },
        { title: "Add New Room", route: "/admin/rooms/add" },
        { title: "Update Rooms", route: "/admin/rooms/update" },
        { title: "Add New Menu Item", route: "/admin/menu/add" },
        { title: "Update Menu Item", route: "/admin/menu/update" },
        { title: "Details of Menu", route: "/admin/menu" }
    ];

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboardItems.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleClick(item.route)}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center font-medium text-lg cursor-pointer hover:bg-gray-50"
                    >
                        {item.title}
                    </div>
                ))}
            </div>
        </div>
    );
}
