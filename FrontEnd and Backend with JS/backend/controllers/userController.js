//userController.js
//Handles the information between the database and the webpage
//regarding user

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: [].length,
    data: [],
  });
};

exports.createAllUsers = (req, res) => {
  res.status(201).json({
    status: "success",
    requestedAt: req.requestTime,
    results: [].length,
    data: [],
  });
};

exports.getUser = (req, res) => {
  const gameId = req.params.id;
  const game = games.find({ id: gameId });

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: game,
  });
};

exports.createUser = (req, res) => {
  const gameId = req.params.id;
  const game = games.find({ id: gameId });

  res.status(201).json({
    status: "success",
    requestedAt: req.requestTime,
    data: game,
  });
};

exports.updateUser = (req, res) => {
  const gameId = req.params.id;
  const game = games.find({ id: gameId });

  res.status(202).json({
    status: "success",
    requestedAt: req.requestTime,
    data: game,
  });
};

exports.deleteUser = (req, res) => {
  const gameId = req.params.id;
  const game = games.find({ id: gameId });

  res.status(203).json({
    status: "success",
    requestedAt: req.requestTime,
  });
};
