//home.js
//Code for the main page

//Imports
import { useState, useEffect } from "react"; // useSate creates a reactive state  , useEffect life cycle of the component
import { Link } from "react-router-dom"; // Creates a link for the same address
import env from "react-dotenv";
import axios from "axios";
import "./home.css";

//It's the functional component for the main page
function Home() {
  const [imgStyle, setImgStyle] = useState("");
  const [games, setGames] = useState(null);
  const imgError = () => {
    setImgStyle("img-error");
  };

  useEffect(() => {
    async function fetch() {
      const response = await axios.get(`${env.API_URL}games`);
      setGames(response.data.data);
    }
    fetch();
  }, []);

  return (
    <ul id="game-list">
      {games ? (
        games.map((game) => (
          <Link to={`/${game.url}`} key={game.name}>
            {" "}
            {/*Creates all the links for all the game pages in the database  */}
            <li>
              <div className="overlay"></div>
              <img
                // src={`${env.API_URL}${game.img}`}
                src={`${env.API_URL}img/games/${game.img}`}
                alt={game.name}
                onError={() => imgError()}
                className={imgStyle}
              />
            </li>
          </Link>
        ))
      ) : (
        <span>Loading</span>
      )}
    </ul>
  );
}

export default Home;
