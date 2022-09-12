

export const EachCard = ({ src }: any) => {
  return (
    <div >
        <img className="back" src="./images/back.png" />
        <img className="front" src={src} />
    </div>
  )
}
