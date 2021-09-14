const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
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
  title_html_it: {
    type: String,
    required: true,
    unique: true
  },
  title_html_en: {
    type: String,
    required: true,
    unique: true
  },
  svg: {
    type: String,
  },
  image: {
    type: String,
  },
  image_small: {
    type: String,
  },
  show_in_slider: {
    type: Boolean,
    default: true
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

module.exports = mongoose.model("Portfolio", portfolioSchema);
