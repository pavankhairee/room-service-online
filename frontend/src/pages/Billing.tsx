import axios from "axios"
import { useEffect, useState } from "react"



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


    return (
        <>
            <div className="m-2">
                <h1>The Bill Page</h1>
                <p className="text-xl">{totalBill.response}</p>
            </div>
        </>
    )
}