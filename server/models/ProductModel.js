const {Schema, model} = require("mongoose");

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
  },
  brand: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  price: {
    type: Number,
  },
  countInStock: {
    type: Number,
  },
  rating: {
    type: String,
  },
  numReviews: {
    type: String,
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

module.exports = model("Product", productSchema);
