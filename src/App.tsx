import { useEffect, useState } from 'react';
import './App.css';
import { EachCard } from './components/EachCard';
import { Timer } from './components/Timer';

const cardFaces = [
  { src: "./images/ace_of_clubs.png", matched: false },
  { src: "./images/ace_of_diamonds.png", matched: false  },
  { src: "./images/ace_of_hearts.png", matched: false  },
  { src: "./images/ace_of_spades.png", matched: false  },
  { src: "./images/black_joker.png", matched: false  },
  { src: "./images/red_joker.png", matched: false  },
  { src: "./images/jack_of_clubs.png", matched: false  },
  { src: "./images/jack_of_diamonds.png", matched: false  },
  { src: "./images/jack_of_hearts.png", matched: false  },
  { src: "./images/jack_of_spades.png", matched: false  },
  { src: "./images/king_of_clubs.png", matched: false  },
  { src: "./images/king_of_diamonds.png", matched: false  },
  { src: "./images/king_of_hearts.png", matched: false  },
  { src: "./images/king_of_spades.png", matched: false  },
  { src: "./images/queen_of_clubs.png", matched: false  },
  { src: "./images/queen_of_diamonds.png", matched: false  },
  { src: "./images/queen_of_hearts.png", matched: false  },
  { src: "./images/queen_of_spades.png", matched: false  },
]

type ShuffledDeckType = {
  id: number;
  src: string;
  matched: boolean;
}[]

function App() {
  const [shuffledDeck, setShuffledDeck] = useState<ShuffledDeckType>([])

  const [timerActive, setTimerActive] = useState<Boolean>(false)

  const [activeCardOne, setActiveCardOne] = useState(null)
  const [activeCardTwo, setActiveCardTwo] = useState(null)
  const [previousActiveOne, setPreviousActiveOne] = useState(null)
  const [previousActiveTwo, setPreviousActiveTwo] = useState(null)

  const [isDisabled, setIsDisabled] = useState<Boolean>(false)

  const [won, setWon] = useState<Boolean>(false)
  const [winningTime, setWinningTime] = useState<number>(0)

  // function to shuffle card on each new game
  const shuffleDeck = () => {
    const shuffledDeck = [...cardFaces, ...cardFaces]
      .sort(() => Math.random() - 0.5)
      .map((card) => (
        { ...card, id: Math.random() }
    ))
    setShuffledDeck(shuffledDeck)
    setTimerActive(true)
    setWon(false)
  }

  // function to determine each active card
  const handleActiveCard = (card: any) => {
    if (!isDisabled) {
      activeCardOne ? setActiveCardTwo(card) : setActiveCardOne(card)
    }
  }

  // check if cards match
  useEffect(() => {
    setIsDisabled(true)
    if (activeCardOne && activeCardTwo) {
      setPreviousActiveOne(activeCardOne)
      setPreviousActiveTwo(activeCardTwo)

      // @ts-ignore
      if (activeCardOne.src === activeCardTwo.src) {
        setShuffledDeck((prev: any) => {
          return prev.map((card: any) => {
            // @ts-ignore
            if (card.src === activeCardOne.src) {
              return {...card, matched: true}
            } return card
          })
        } )
        resetChoices()  
      } else {
        setTimeout(() => resetChoices(), 1000)
      }
    }
  }, [activeCardOne, activeCardTwo, shuffledDeck, setShuffledDeck])

  // resets choices
  const resetChoices = () => {
    setActiveCardOne(null)
    setActiveCardTwo(null)
    setIsDisabled(false)
  }

  //disables card selections while cards are active
  useEffect(() => {
    if (activeCardOne && activeCardTwo) {
      setIsDisabled(true)
    }
    return () => setIsDisabled(false)
  }, [isDisabled, setIsDisabled])

  // checks for winner 
  useEffect(() => {
    setWon(false)
    let timeout = setInterval(() => {checkWinner()}, 1000)
        return () => clearInterval(timeout)
  }, [isDisabled, setIsDisabled])  

  const checkWinner = () => {
    if (shuffledDeck.length > 0 ) {
      const answer = shuffledDeck.every(card => (
        card.matched === true
      ))
      
      if (answer) {
        setWon(answer)
      }
    }
  };

  // checks for winning time
  const checkWinningTime = (time: any) => {
    won && setWinningTime(time)
    won && setTimerActive(false)
  }

  return (
    <div className="App">
      <div>
        <h1>Card Game</h1>
        <button onClick={shuffleDeck} >New Game</button>
        <p>Timer: {
            timerActive ? <Timer checkWinningTime={checkWinningTime} /> : "0"
          }</p>
      </div>
      <div className="card-grid">
        {
          shuffledDeck.map(card => (
            <EachCard 
              key={card.id} 
              src={card.src} 
              handleActiveCard={handleActiveCard} 
              card={card} 
              flipped={card.matched || activeCardOne === card || activeCardTwo === card} 
            />
          ))
        }
        {
          won && (
            <div className="won" >
              <p>Congratulations! You have won.</p>
              Your winning time was {winningTime} seconds.
              <p>Play again?</p>
              <button onClick={shuffleDeck} >New Game</button>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
