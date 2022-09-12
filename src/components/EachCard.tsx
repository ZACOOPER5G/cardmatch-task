

export const EachCard = ({ src, handleActiveCard, card, flipped }: any) => {
    const handleClick = (e: any) => {
        handleActiveCard(card)
    }



    return (
        <div >
            <div className={ flipped ? "flipped" : "" }>
                <img 
                    className="back" 
                    src="./images/back.png" 
                    onClick={handleClick} 
                    alt="card-back"
                />
                <img className="front" src={src} />
            </div>
        </div>
    )
}
