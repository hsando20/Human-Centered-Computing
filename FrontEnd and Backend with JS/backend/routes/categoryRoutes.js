//categoryRoutes.js
//Assigns the controllers to each route

const { Router } = require("express");

const {
  createAllCategories,
  getCategory,
} = require("../controllers/categoryController");

const router = Router();

router.route("/").post(createAllCategories);
router.route("/:id").get(getCategory);
//   .post(createCategory)
//   .patch(updateCategory)
//   .delete(deleteCategory);

module.exports = router;
