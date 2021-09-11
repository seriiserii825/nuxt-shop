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
  createdDate: {
    // У каждой страницы автоматически сохраняется дата создания.
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("Tipo", pageSchema);
