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
  categories: [Schema.Types.ObjectId],
  platforms: [Schema.Types.ObjectId],
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

const Game = model("Game", gameSchema);

module.exports = Game;
