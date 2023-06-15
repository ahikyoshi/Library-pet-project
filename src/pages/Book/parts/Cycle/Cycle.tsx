import { FC, useEffect, useState } from "react"
import axios from "axios"
import { Card } from "../../../../components/Card/Card"

interface cycleProps {
    id: string
}

export const Cycle: FC<cycleProps> = (props) => {
    useEffect(() => {
        console.log(props)
    }, [props])

    const [cycleList, setCyclelist] = useState([])

    useEffect(() => {
        if (props.id != "empty") {
            axios.get(`http://localhost:4444/library/${props.id}/cycle`)
                .then((res) => {
                    let newArr: any = []
                    res.data.forEach((item: any) => {
                        newArr[item.cycle.number] = item
                    })
                    setCyclelist(newArr.filter((n: any) => n))
                 })
        }
    }, [props])

    return (
        <div className="cycle" id="cycles">
            <div className="cycle-title">Из той же серии:</div>
            <div className="cycle-container">
                <div className="cycle-content">
                    {
                        cycleList.map((item) => { return <Card data={item} key={item.id} /> })
                    }
                </div>
            </div>
        </div>
    )
}