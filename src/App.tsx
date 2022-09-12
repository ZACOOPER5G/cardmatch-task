import { useEffect, useState } from 'react';
import './App.css';
import { EachCard } from './components/EachCard';

const cardFaces = [
  { "src": "./images/ace_of_clubs.png" },
  { "src": "./images/ace_of_diamonds.png" },
  { "src": "./images/ace_of_hearts.png" },
  { "src": "./images/ace_of_spades.png" },
  { "src": "./images/black_joker.png" },
  { "src": "./images/red_joker.png" },
  { "src": "./images/jack_of_clubs.png" },
  { "src": "./images/jack_of_diamonds.png" },
  { "src": "./images/jack_of_hearts.png" },
  { "src": "./images/jack_of_spades.png" },
  { "src": "./images/king_of_clubs.png" },
  { "src": "./images/king_of_diamonds.png" },
  { "src": "./images/king_of_hearts.png" },
  { "src": "./images/king_of_spades.png" },
  { "src": "./images/queen_of_clubs.png" },
  { "src": "./images/queen_of_diamonds.png" },
  { "src": "./images/queen_of_hearts.png" },
  { "src": "./images/queen_of_spades.png" },
]

type ShuffledDeckType = {
  id: number;
  src: string;
}[]

function App() {
  const [shuffledDeck, setShuffledDeck] = useState<ShuffledDeckType>([])

  const [currentTime, setCurrentTime] = useState(0)
  const [timerActive, setTimerActive] = useState<Boolean>(false)

  const [activeCardOne, setActiveCardOne] = useState(null)
  const [activeCardTwo, setActiveCardTwo] = useState(null)

  //function to shuffle card on each new game
  const shuffleDeck = () => {
    const shuffledDeck = [...cardFaces, ...cardFaces]
      .sort(() => Math.random() - 0.5)
      .map((card) => (
        { ...card, id: Math.random() }
    ))
    setCurrentTime(0)
    setShuffledDeck(shuffledDeck)
    setTimerActive(true)
  }

  //will run timer as game is active
  useEffect(() => {
    
    if (timerActive) {
    let timeout = setInterval(() => {setCurrentTime((prev) => prev + 1)}, 1000)
    return () => clearInterval(timeout)
  }
  }, [shuffleDeck]) 


// function to determine each active card
const handleActiveCard = (card: any) => {
  console.log(card)
  activeCardOne ? setActiveCardTwo(card) : setActiveCardOne(card)
}

  return (
    <div className="App">
      <div>
        <h1>Card Game</h1>
        <button onClick={shuffleDeck} >New Game</button>
        <p>Timer: {currentTime}</p>
      </div>
      <div className="card-grid">
        {
          shuffledDeck.map(card => (
            <EachCard key={card.id} src={card.src} handleActiveCard={handleActiveCard} card={card} />
          ))
        }
      </div>
    </div>
  );
}

export default App;
