//usersRoutes.js
//Assigns the controllers to each route

const { Router } = require("express");

const {
  createAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = Router();

router.route("/").post(createAllUsers);
router
  .route("/:id")
  .get(getUser)
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
