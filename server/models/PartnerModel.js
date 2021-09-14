const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
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
  url_it: {
    type: String,
    unique: true
  },
  url_en: {
    type: String,
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

module.exports = mongoose.model("Partner", partnerSchema);
