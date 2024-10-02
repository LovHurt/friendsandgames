const mongoose = require("mongoose");

const platformSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      platformOfGames: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "platformOfGames",
        },
      ],
    },
    { collection: "platforms", timestamps: true }
  );

  const platform = mongoose.model('platforms', platformSchema);

  module.exports = platform;