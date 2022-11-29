//Layout JS

import { Link, Outlet, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import env from "react-dotenv";

import "./assets/global.css";
import ErrorBoundary from "./components/ErrorBoundaries";

//Layout Funcition
// The base of the desing of the pages
// inside layout is the webpages
function Layout() {
  const { game } = useParams();

  return (
    <div>
      <div id="bg-img-container">
        <div className="overlay"></div>
        <img src={`${env.API_URL}img/background.jpg`} alt="cy" />
      </div>
      <div className="container">
        <header>
          {game ? (
            <>
              <h2 id="logo">
                <Link to="/">
                  <ArrowBack fontSize="large" />
                </Link>
              </h2>
              <h1 id="name">{game}</h1>
            </>
          ) : (
            <>
              <h2 id="logo">GB</h2>
              <h1 id="name">
                GAMEBASE <span>UWU</span>
              </h1>
            </>
          )}
          <div id="searchbar">
            <input type="text" name="" id="" />
          </div>
          <div className="tab first-tab"></div>
          <div className="tab second-tab"></div>
        </header>

        <main>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}

export default Layout;
