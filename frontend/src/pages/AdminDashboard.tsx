import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PopUpModal } from "../components/PopModel";
import { Input } from "../components/Input";
import axios, { Axios } from "axios";
import { Button } from "../components/Buttons";

export function AdminDash() {

    const [addOpen, setAddOpen] = useState(false)

    const roomIdRef = useRef<HTMLInputElement>(null)
    const roomNumberRef = useRef<HTMLInputElement>(null)
    const roomTypeRef = useRef<HTMLInputElement>(null)
    const roomStatusRef = useRef<HTMLInputElement>(null)

    const menuIdRef = useRef<HTMLInputElement>(null)
    const menuNameRef = useRef<HTMLInputElement>(null)
    const menuDescRef = useRef<HTMLInputElement>(null)
    const menuAvailableRef = useRef<HTMLInputElement>(null)
    const menuPriceRef = useRef<HTMLInputElement>(null)


    async function addRoomDetails() {
        const room_number = roomNumberRef.current?.value;
        const room_type = roomTypeRef.current?.value;
        const status = roomStatusRef.current?.value;

        const response = await axios.post('http://localhost:3000/app/admin/insertRoom', {
            room_number,
            room_type,
            status
        }, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
    }

    const [upOpen, setUpOpen] = useState(false)
    async function UpdateRoomDetails() {
        const room_id = roomIdRef.current?.value;
        const room_number = roomNumberRef.current?.value;
        const room_type = roomTypeRef.current?.value;
        const status = roomStatusRef.current?.value;

        const response = await axios.put('http://localhost:3000/app/admin/updateRoom', {
            room_id,
            room_number,
            room_type,
            status
        }, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
    }


    const [menuOpen, setMenuOpen] = useState(false)

    async function AddMenuItem() {

        const name = menuNameRef.current?.value;
        const description = menuDescRef.current?.value;
        const price = menuPriceRef.current?.value;
        const available = menuAvailableRef.current?.value;

        const response = await axios.post('http://localhost:3000/app/admin/insertMenu', {
            name,
            description,
            price,
            available
        }, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })

    }


    const [menuUpOpen, setMenuUpOpen] = useState(false)

    async function UpdateMenuItem() {
        const item_id = menuIdRef.current?.value;
        const name = menuNameRef.current?.value;
        const description = menuDescRef.current?.value;
        const price = menuPriceRef.current?.value;
        const available = menuAvailableRef.current?.value;

        const response = await axios.put('http://localhost:3000/app/admin/updateMenu', {
            item_id,
            name,
            description,
            price,
            available
        }, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })

    }

    const navigate = useNavigate();

    const handleClick = (route: string) => {
        console.log("Card clicked:", route);
        navigate(route);
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                <div>
                    <div
                        onClick={() => handleClick("/admin/rooms")}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center font-medium text-lg cursor-pointer hover:bg-gray-50"
                    >
                        Details of Rooms
                    </div>
                </div>

                <div>
                    <div
                        onClick={() => setAddOpen(true)}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow 
                        duration-300 p-6 text-center font-medium text-lg cursor-pointer hover:bg-gray-50">
                        Add New Room
                    </div>
                    <div>
                        <PopUpModal isOpen={addOpen} onClose={() => setAddOpen(false)}>
                            <Input typeField={"text"} placeholder={"Enter Room Number"} refInput={roomNumberRef} ></Input>
                            <Input typeField={"text"} placeholder={"Enter Room Type"} refInput={roomTypeRef} ></Input>
                            <Input typeField={"text"} placeholder={"Room Status"} refInput={roomStatusRef} ></Input>
                            <Button onClick={addRoomDetails}>Submit</Button>
                        </PopUpModal>
                    </div>
                </div>


                <div>
                    <div
                        onClick={() => setUpOpen(true)}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center font-medium text-lg cursor-pointer hover:bg-gray-50"
                    >
                        Update Rooms
                    </div>

                    <div>
                        <PopUpModal isOpen={upOpen} onClose={() => setUpOpen(false)}>
                            <Input typeField={"text"} placeholder={"Enter Room Id"} refInput={roomIdRef}></Input>
                            <Input typeField={"text"} placeholder={"Enter Room Number"} refInput={roomNumberRef} ></Input>
                            <Input typeField={"text"} placeholder={"Enter Room Type"} refInput={roomTypeRef} ></Input>
                            <Input typeField={"text"} placeholder={"Room Status"} refInput={roomStatusRef} ></Input>
                            <Button onClick={UpdateRoomDetails}>Submit</Button>
                        </PopUpModal>
                    </div>
                </div>

                <div>
                    <div
                        onClick={() => setMenuOpen(true)}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center font-medium text-lg cursor-pointer hover:bg-gray-50"
                    >
                        Add New Menu Item
                    </div>

                    <div>
                        <PopUpModal isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
                            <Input typeField={"text"} placeholder={"Enter Item Name"} refInput={menuNameRef}></Input>
                            <Input typeField={"text"} placeholder={"Enter Item Description"} refInput={menuDescRef}></Input>
                            <Input typeField={"text"} placeholder={"Enter Item Price"} refInput={menuPriceRef}></Input>
                            <Input typeField={"text"} placeholder={"Enter Item Available"} refInput={menuAvailableRef}></Input>
                            <Button onClick={AddMenuItem}>Submit</Button>
                        </PopUpModal>
                    </div>
                </div>

                <div>
                    <div
                        onClick={() => setMenuUpOpen(true)}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center font-medium text-lg cursor-pointer hover:bg-gray-50"
                    >
                        Update Menu Item
                    </div>

                    <div>
                        <PopUpModal isOpen={menuUpOpen} onClose={() => setMenuUpOpen(false)}>
                            <Input typeField={"text"} placeholder={"Enter Item Id"} refInput={menuIdRef}></Input>
                            <Input typeField={"text"} placeholder={"Enter Item Name"} refInput={menuNameRef}></Input>
                            <Input typeField={"text"} placeholder={"Enter Item Description"} refInput={menuDescRef}></Input>
                            <Input typeField={"text"} placeholder={"Enter Item Price"} refInput={menuPriceRef}></Input>
                            <Input typeField={"text"} placeholder={"Enter Item Available"} refInput={menuAvailableRef}></Input>
                            <Button onClick={UpdateMenuItem}>Submit</Button>
                        </PopUpModal>
                    </div>
                </div>

                <div>
                    <div
                        onClick={() => handleClick("/admin/menu")}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center font-medium text-lg cursor-pointer hover:bg-gray-50"
                    >
                        Details of Menu
                    </div>
                </div>

            </div>
        </div>
    );
}
