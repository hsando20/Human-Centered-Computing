//Imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import axios from "axios";
import env from "react-dotenv";

//Importing style sheet
import "./game.css";

//Games functional component
//Here is the logic for what it goes to the screen
// and what is presentend in game page
function Game() {
  const params = useParams();
  const [game, setGame] = useState();
  const [starValue, setStarValue] = useState(3); //  The "stars" is the value/amount of stars

  const starAverage = (ratings) => {
    return (
      ratings.reduce((total, current) => (total += current.number), 0) /
      ratings.length
    );
  };

  useEffect(() => {
    (async function () {
      const response = await axios.get(`${env.API_URL}games/${params.game}`);
      const data = response.data.data;
      setGame(data);
      setStarValue(starAverage(data.rating));
    })();
  }, []);

  const saveStars = async (value) => {
    setStarValue(value);
    const dataToUpdate = {
      rating: value,
    };

    await axios.patch(`${env.API_URL}games/${game.url}`, dataToUpdate);
  };

  if (game)
    return (
      <>
        <div id="cover">
          <img src={`${env.API_URL}img/games/${game.img}`} alt="cy" />
          <div id="rating">
            <Rating
              name="simple-controlled"
              value={starValue}
              onChange={(event, newValue) => saveStars(newValue)}
              precision={0.5}
              size="large"
            />
            // platform games //feetched from the database
          </div>
        </div>
        <section id="info">
          <article>
            <iframe
              style={{ width: "20rem", height: "15rem" }}
              src="https://www.youtube.com/embed/JkzgJjWfvBA"
              //SRC UN API QUE FEETCHE DE LA BASE DE DATOS EL ENLACE DEL VIDEO QUE ESTE GUARDADO.
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
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
              exercitationem consequuntur at animi natus laudantium aspernatur
              voluptas reprehenderit. Dolorum iste ad non, sit tempore nesciunt!
              Quis perferendis beatae natus amet.
            </p>
          </article>
          <article className="orange">
            <span id="concated-header">
              <h2>Platforms : </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,
                dolore! Error, sunt quibusdam! Corporis maiores ullam rem minima
                esse laborum consectetur nisi quae eos quis, magnam
                perspiciatis, incidunt accusamus qui!
              </p>
            </span>
            <hr />
            <h3>More Information</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              soluta provident nisi, nam nihil cumque debitis enim ratione
              repellat quos rem suscipit voluptatem quas quo? Rerum amet labore
              quia nostrum.
            </p>
          </article>
        </section>
      </>
    );

  return <div>Loading</div>;
} // End games Function

export default Game;
