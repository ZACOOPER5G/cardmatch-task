

export const EachCard = ({ src, handleActiveCard, card }: any) => {
    const handleClick = (e: any) => {
        handleActiveCard(card)
    }

    return (
        <div >
            <img 
                className="back" 
                src="./images/back.png" 
                onClick={handleClick} 
                alt="card-back"
            />
            <img className="front" src={src} />
        </div>
    )
}
