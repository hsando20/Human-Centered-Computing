const { Router } = require("express");

const {
  getAllUsers,
  createAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = Router();

router.route("/").get(getAllUsers).post(createAllUsers);
router
  .route("/:id")
  .get(getUser)
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
