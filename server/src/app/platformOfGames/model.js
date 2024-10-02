const mongoose = require("mongoose");

const platformOfGameSchema = new mongoose.Schema(
    {
      gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "games",
        required: true,
      },
      platformId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "platforms",
      },
    },
    { collection: "platformOfGames", timestamps: true }
  );

  const platformOfGame = mongoose.model('platformOfGames', platformOfGameSchema);

  module.exports = platformOfGame;