const mongoose = require("mongoose");

const downloadLinkSchema = new mongoose.Schema(
    {
      gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "games",
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    { collection: "downloadLinks", timestamps: true }
  );

  const downloadLink = mongoose.model('downloadLinks', downloadLinkSchema);

  module.exports = downloadLink;