import { useRef } from "react"
import { Input } from "../components/Input"
import { Button } from "../components/Buttons"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export function Signup() {
    const nameRef = useRef<HTMLInputElement>(null)
    const roomRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    async function signin() {
        const name = nameRef.current?.value;
        const room_number = roomRef.current?.value;
        const password = passwordRef.current?.value;
        const phone = phoneRef.current?.value;

        const response = await axios.post("http://localhost:3000/app/v1/signup", {
            name,
            room_number,
            phone,
            password
        })
        navigate("/signin")
    }

    return (
        <>

            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-slate-500 to-slate-800">
                <div className="w-fit p-5 space-y-4 rounded bg-white">
                    <Input type="text" placeholder="Room Number" refInput={nameRef} />
                    <Input type="text" placeholder="Room Number" refInput={roomRef} />
                    <Input type="text" placeholder="Phone Number" refInput={phoneRef} />
                    <Input type="text" placeholder="Password" refInput={passwordRef} />
                    <Button className="w-full" onClick={signin}>LogIn</Button>
                </div>
            </div >

        </>
    )
}