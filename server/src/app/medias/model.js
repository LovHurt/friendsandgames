const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
    {
      gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "games",
        required: true,
      },
      mediaType: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    { collection: "medias", timestamps: true }
  );

  const media = mongoose.model('medias', mediaSchema);

  module.exports = media;