const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  title_it: {
    type: String,
    required: true,
    unique: true
  },
  title_en: {
    type: String,
    required: true,
    unique: true
  },
  slug_it: {
    type: String,
    required: true,
    unique: true
  },
  slug_en: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    unique: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  updatedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Page", pageSchema);
