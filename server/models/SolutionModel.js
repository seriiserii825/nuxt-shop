const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  excerpt_it: {
    type: String
  },
  excerpt_en: {
    type: String
  },
  image_small: {
    type: String
  },
  image_menu: {
    type: String
  },
  createdDate: {
    // У каждой страницы автоматически сохраняется дата создания.
    type: Date,
    default: Date.now
  },
  updatedDate: {
    // У каждой страницы автоматически сохраняется дата создания.
    type: Date,
    default: Date.now
  },
  tipo_id: { type: Schema.Types.ObjectId, ref: "Tipo" }
});

module.exports = mongoose.model("Solution", pageSchema);
