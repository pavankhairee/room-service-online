import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "../components/Buttons"
import { Link, useNavigate } from "react-router-dom"



export function Billing() {

    const [totalBill, setTotalBill] = useState(0)

    useEffect(() => {
        async function Billing() {

            const response = await axios.get("http://localhost:3000/app/v1/bill",
                {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                })
            setTotalBill(response.data)
        }
        Billing()
    }, [])

    const navigate = useNavigate();
    return (
        <>
            <div className="m-2">
                <h1>The Bill Page</h1>
                <Button onClick={() => navigate("/menupage")}>Back</Button>
                <p className="text-xl">{totalBill.response}</p>
            </div>
        </>
    )
}