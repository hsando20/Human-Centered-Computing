// Game.js
// The game website template

//Imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // obtains dynamic params from request
import { Rating } from "@mui/material";
import axios from "axios";
import env from "react-dotenv";

//Importing style sheet
import "./game.css";

//Games functional component
//Here is the logic for what it goes to the screen
// and what is presentend in game page
function Game() {
  const params = useParams(); // Gets the data from the url
  const [game, setGame] = useState(null); // Create a state for game
  const [starValue, setStarValue] = useState(3); //  The "stars" is the value/amount of stars

  //Creates an average for the stars of the game from all the ratings given
  const starAverage = (ratings) => {
    return (
      ratings.reduce((total, current) => (total += current.number), 0) /
      ratings.length
    );
  };

  //Handles the life cycle of the components
  useEffect(() => {
    (async function () {
      const response = await axios.get(`${env.API_URL}games/${params.game}`); // sends a request to the api
      const data = response.data.data; // extracts the data from the request
      setGame(data); // saves the data in the game state
      setStarValue(starAverage(data.rating)); // saves the stars average
    })();
  }, [params.game]);

  //Saves the star value given by the user
  //and get stored in the database
  const saveStars = async (value) => {
    setStarValue(value);
    const dataToUpdate = {
      type: "rating",
      rating: value,
    };

    await axios.patch(`${env.API_URL}games/${game.url}`, dataToUpdate);
  };

  //If statement when you select the game
  if (game)
    return (
      <>
        <section id="frame">
          <div id="cover">
            <img src={`${env.API_URL}img/games/${game.img}`} alt="cy" />
          </div>
          <p id="release-year">Released on {game.releaseYear}</p>
          <div className="data-box">
            <Rating
              sx={{
                "& .MuiRating-iconEmpty": {
                  color: "rgba(255,255,255,.5)",
                },
              }}
              name="simple-controlled"
              value={starValue}
              onChange={(event, newValue) => saveStars(newValue)}
              precision={0.5}
              size="large"
            />
          </div>
          {game.platforms.length > 0 && (
            <ul className="data-box">
              {game.platforms.map((platform, i) => (
                <li class="platforms" key={i}>
                  <img
                    src={`${env.API_URL}img/platforms/${platform}.png`}
                    alt="xy"
                    title={platform}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
        <section id="info">
          <article className="video-player">
            <iframe
              className="embed"
              src={game.ytUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </article>

          <article className="green">
            <h2>Description</h2>
            <hr />
            <p>
              {/* Feetchin description from database */}
              {game.description}
            </p>
          </article>
          <article className="orange">
            <span id="concated-header">{/* Deleted data for platforms */}</span>
            <h3>More Information</h3>
            <hr />
            <p>
              For more information click{" "}
              <a href={game.wikiUrl} target="_blank" rel="noreferrer">
                here
              </a>
            </p>
          </article>
        </section>
      </>
    );

  return <div>Loading</div>;
} // End games Function

export default Game;
