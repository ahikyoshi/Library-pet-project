// Core
import axios from "axios"
import { useEffect, useState } from "react"
// Components
import { Info } from "./parts/Info/Info"
import { Cycle } from "./parts/Cycle/Cycle"
// import Text from "./Component/Text/Text"
import { Rate } from "./parts/Rate/Rate"
import { Feedback } from "./parts/Feedback/Feedback"
// Styles
// import "./styles.scss"
// import { useParams } from "react-router-dom"
const HOST_IP_LOCAL = "localhost:4444"
const HOST_IP_HOST = "192.168.0.105:4444"

const emptyData = {
    image: "https://cv3.litres.ru/pub/c/cover_415/37205232.webp",
    title: "Загружаеться...",
    author: "Загружаеться...",
    cycle: {
        title: "Загружаеться...",
        number: ""
    },
    discribe: "Загружается...",
    files_status: ["text", "audio"],
    user: {
        rate: 0,
        feedback: "Загружается..."
    },
    _id: "empty"
}

const Book = () => {

    const id = "hBkFdTtUEbRcqLrg"
    const [data, setData] = useState(emptyData)
    const [amountRate, setAmountRate] = useState({ number: 0, color: "red" })
    
    useEffect(() => {
        axios.get(`http://${HOST_IP_HOST}/library/book/${id}`)
            .then((res) => {setData(res.data)})
    }, [id])

    return (
        <div className="w-screen mt-20 p-2 bg-white lg:w-10/12">
            <Info data={data} />
            <Cycle id={data._id} />
            <Feedback feedback={data.user.feedback} id={data._id} />
            <Rate rate={data.user.rate}/>
            {/* <Info book={book} amountRate={amountRate}/>
            <Cycle data={book} /> 
            <Text />
            <Rate book={book} amountRate={amountRate} setAmountRate={setAmountRate} />
            <Feedback book={book}/> */}

        </div>
    )
}

export default Book