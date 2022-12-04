//CategoryModel.js
//Defines the Scheme for category in MongoDB

const { Schema, model } = require("mongoose");
//Database Scheme
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
});

const Category = model("Category", categorySchema);

module.exports = Category;
