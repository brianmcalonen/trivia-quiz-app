const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  id: Number,
  name: String,
});

module.exports = mongoose.model("Category", CategorySchema);
