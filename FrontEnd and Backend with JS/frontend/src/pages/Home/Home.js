import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import env from "react-dotenv";
import axios from "axios";

import "./home.css";

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
