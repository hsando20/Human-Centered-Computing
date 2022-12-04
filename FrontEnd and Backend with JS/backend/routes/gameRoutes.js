//gameRoutes.js
//Assigns the controllers to each route

const { Router } = require("express");

const {
  getAllGames,
  createAllGames,
  getGame,
  createGame,
  updateGame,
  deleteGame,
} = require("../controllers/gameController");

const router = Router();

router.route("/").get(getAllGames).post(createAllGames);
router
  .route("/:id")
  .get(getGame)
  .post(createGame)
  .patch(updateGame)
  .delete(deleteGame);

module.exports = router;
