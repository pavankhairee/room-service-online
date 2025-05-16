import axios from "axios";
import { useRef } from "react"
import { Input } from "../components/Input";
import { Button } from "../components/Buttons";


export function RoomInsert() {
    const roomIdRef = useRef<HTMLInputElement>(null)
    const roomNumberRef = useRef<HTMLInputElement>(null)
    const roomTypeRef = useRef<HTMLInputElement>(null)
    const roomStatusRef = useRef<HTMLInputElement>(null)


    async function addRoomDetails() {
        const room_id = roomIdRef.current?.value;
        const room_number = roomNumberRef.current?.value;
        const room_type = roomTypeRef.current?.value;
        const status = roomStatusRef.current?.value;

        const response = await axios.post('http://localhost:3000/app/admin/insertRoom', {
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

    return (
        <>
            <div>
                <Input typeField={"text"} placeholder={"Enter Room Id"} refInput={roomIdRef} ></Input>
                <Input typeField={"text"} placeholder={"Enter Room Number"} refInput={roomNumberRef} ></Input>
                <Input typeField={"text"} placeholder={"Enter Room Type"} refInput={roomTypeRef} ></Input>
                <Input typeField={"text"} placeholder={"Room Status"} refInput={roomStatusRef} ></Input>
                <Button onClick={addRoomDetails}>Update Details</Button>
            </div>
        </>
    )
}