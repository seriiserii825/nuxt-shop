const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  slug: {
    type: String,
    unique: true
  },
  image: {
    type: String,
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

module.exports = mongoose.model("Category", categorySchema);
