//CategoryController.js
//Handles the information between the database and the webpage
//regarding category

const Category = require("../models/categoryModel");
const Game = require("../models/gameModel");

exports.createAllCategories = async (req, res) => {
  await Category.deleteMany();

  [
    "Sandbox/SB",
    "Real-time strategy/RTS",
    "Shooters/FPS",
    "Multiplayer online battle arena/MOBA",
    "Role-playing/RPG",
    "Simulation/Sim",
    "Party Games/Pg",
    "Adventure/Adv",
    "Horror/Hor",
  ].forEach((el) => {
    Category.create({ name: el.split("/")[0], id: el.split("/")[1] });
  });

  res.status(201).json({
    status: "success",
    requestedAt: req.requestTime,
  });
};

exports.getCategory = async (req, res) => {
  const category = await Category.find({ name: req.params.id });
  const categoryGames = await Game.find({
    categories: { $elemMatch: { $eq: category._id } },

    // /localhost:5000/api/v1/categories/platform // platform is req.param
  });

  console.log(category);
  console.log(categoryGames);

  if (categoryGames.length <= 0)
    res.status(404).json({
      status: "failure",
      requestedAt: req.requestTime,
    });

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: categoryGames.length,
    data: categoryGames,
    name: category.name,
  });
};
