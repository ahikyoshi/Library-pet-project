import { FC, useEffect } from "react";

interface cardProps{
    data: {
        author: string,
        cycle: {
            title: string
            number: string
        }
        id: string
        image: string
        title: string
    }
}

export const Card: FC<cardProps> = ({data: {title, image}}) => {

    useEffect(() => {
        console.log(title)
    },[title])
    return (
        <div className="w-40 h-64 bg-cover" style={{backgroundImage: `url(${image})`}}>
            <div className="w-40 h-64 absolute">
                <div className="">{title}</div>
            </div>
        </div>
    )
}