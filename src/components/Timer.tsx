import { useEffect, useState } from "react"

export const Timer = ( props: any ) => {
    const [currentTime, setCurrentTime] = useState(0)

    const checkWinTime = () => {
        props.checkWinningTime(currentTime)
    }

    // will run timer as game is active
    useEffect(() => {
        let timeout = setInterval(() => {setCurrentTime((prev) => prev + 1)}, 1000)
        checkWinTime()
        return () => clearInterval(timeout)
    }, [currentTime, setCurrentTime]) 

    return (
        <div>{currentTime}</div>
    )
}


