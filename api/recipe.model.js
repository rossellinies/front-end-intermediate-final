const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const RecipeSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  ingredients: String,
  directions: String,
  nutrition: String,
  image: String,
  year: String,
  // year: {
  //   type: String,
  //   required: true,
  // },
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
