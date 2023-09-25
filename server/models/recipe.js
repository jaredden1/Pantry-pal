const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    ingredients: { type: String },
    number: { type: Number },
    limitLicense: { type: Boolean },
    ranking: { type: Number },
    ignorePantry: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
