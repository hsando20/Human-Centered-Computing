//Layout.js
//This is the template of the website that is share between them

//Required Imports
import { useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import env from "react-dotenv";
import "./assets/global.css";
import ErrorBoundary from "./components/ErrorBoundaries";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

//Layout function
// The base of the design of the pages
function Layout() {
  const { game } = useParams();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
              <h1 id="name">
                {game
                  .split("-")
                  .map((word) => word[0].toUpperCase() + word.slice(1))
                  .join(" ")}
              </h1>
            </>
          ) : (
            <>
              <h2 id="logo">GB</h2>
              <h1 id="name">
                GAMEBASE <span>UWU</span>
              </h1>
            </>
          )}
          {/* Here will go the categoriez select  */}
          <div id="searchbar">
            {!game && (
              <>
                <Button
                  id="demo-customized-button"
                  aria-controls={open ? "demo-customized-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  CATEGORIES
                </Button>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} disableRipple>
                    {/* <EditIcon /> */}
                    All
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    {/* <EditIcon /> */}
                    Sandbox
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    {/* <FileCopyIcon /> */}
                    Real Time Strategy
                  </MenuItem>

                  <MenuItem onClick={handleClose} disableRipple>
                    {/* <ArchiveIcon /> */}
                    First Person Shooter
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    {/* <Moba /> */}
                    Multiplayer Online Battle Arena
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    {/* RPG /> */}
                    Role Play RPG
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    {/* Simulation */}
                    Simulation
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    {/* Party Games*/}
                    Party Games
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    {/* Adventure*/}
                    Adventure
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    {/* Horror*/}
                    Horror
                  </MenuItem>
                </StyledMenu>
              </>
            )}
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
