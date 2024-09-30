const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      default: null,
    },
  },
  { collection: "categories", timestamps: true }
);

const category = mongoose.model('categories', categorySchema);

module.exports = category;