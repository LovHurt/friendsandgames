const mongoose = require("mongoose");

const categoryOfGameSchema = new mongoose.Schema(
    {
      gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "games",
        required: true,
      },
      categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
      },
    },
    { collection: "categoryOfGames", timestamps: true }
  );

  const categoryOfGame = mongoose.model('categoryOfGames', categoryOfGameSchema);

  module.exports = categoryOfGame;