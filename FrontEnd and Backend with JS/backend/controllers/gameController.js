const fs = require("fs");
const Game = require("../models/gameModel");

exports.getAllGames = async (req, res) => {
  const allGames = await Game.find();

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: allGames.length,
    data: allGames,
  });
};

exports.createAllGames = async (req, res) => {
  await Game.deleteMany();

  fs.readdir(`${__dirname}/../img/games`, (err, files) => {
    if (err) console.log(err);

    files.forEach((img) => {
      const name = img
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ")
        .replace(".jpeg", "");
      const url = img.replace(".jpeg", "");

      Game.create({
        name,
        img,
        url,
        ytUrl: "",
        categories: [null],
        platforms: [null],
        wikiUrl: "",
        rating: [
          {
            number: 3,
            user: null,
          },
        ],
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      });
    });
  });

  res.status(201).json({
    status: "success",
    requestedAt: req.requestTime,
  });
};

exports.getGame = async (req, res) => {
  const game = await Game.findOne({ url: req.params.id });

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: game,
  });
};

exports.createGame = (req, res) => {
  const gameId = req.params.id;
  const game = games.find({ id: gameId });

  res.status(201).json({
    status: "success",
    requestedAt: req.requestTime,
    data: game,
  });
};

exports.updateGame = async (req, res) => {
  console.log(req.body.rating);
  if (!req.body.rating) return;

  let user = null;
  if (req.body.user) user = req.body.user;

  const prevVersion = await Game.findOne({ url: req.params.id });
  console.log(prevVersion);
  const game = await Game.findByIdAndUpdate(prevVersion._id, {
    rating: prevVersion.rating.concat([
      { number: Number(req.body.rating), user },
    ]),
  });

  res.status(202).json({
    status: "success",
    requestedAt: req.requestTime,
    data: game,
  });
};

exports.deleteGame = (req, res) => {
  const gameId = req.params.id;
  const game = games.find({ id: gameId });

  res.status(203).json({
    status: "success",
    requestedAt: req.requestTime,
  });
};
