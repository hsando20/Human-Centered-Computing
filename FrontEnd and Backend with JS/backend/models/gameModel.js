//CategoryModel.js
//Defines the Scheme for game in MongoDB

const { Schema, model } = require("mongoose");
//Database Scheme
const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
    required: true,
    unique: true,
  },
  ytUrl: String,
  wikiUrl: String,
  releaseYear: String,
  categories: [Schema.Types.ObjectId],
  platforms: {
    type: [String],
    enum: ["playstation", "nintendo", "xbox", "computer"],
    required: true,
  },
  rating: [
    {
      _id: false,
      number: {
        type: Number,
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  description: {
    type: String,
    required: true,
  },
});

gameSchema.pre("save", function (next) {
  this.platforms = [...new Set(this.platforms)];
  return next();
});

const Game = model("Game", gameSchema);

module.exports = Game;
