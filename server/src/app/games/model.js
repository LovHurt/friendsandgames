const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      minPlayers: {
        type: Number,
        required: true,
      },
      maxPlayers: {
        type: Number,
        required: true,
      },
      isPaid: {
        type: Boolean,
        required: true,
      },
      platformOfGames: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "platformOfGames",
        },
      ],
      medias: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "medias",
        },
      ],
      downloadLinks: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "downloadLinks",
        },
      ],
    },
    { collection: "games", timestamps: true }
  );

const game = mongoose.model('games', gameSchema);

module.exports = game;
