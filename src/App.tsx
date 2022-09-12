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

function App() {

  return (
    <div className="App">
      <div className="card-grid">
        {
          cardFaces.map(card => (
            <EachCard src={card.src} />
          ))
        }
      </div>
    </div>
  );
}

export default App;
