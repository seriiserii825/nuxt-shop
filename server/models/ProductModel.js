const { Schema, model } = require("mongoose");

const reviewSchema = Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true }
  },
  {
    timestamp: true
  }
);
const productSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
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
    type: String
  },
  brand: {
    type: String
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  price: {
    type: Number
  },
  countInStock: {
    type: Number,
    default: 0
  },
  rating: {
    type: String,
    default: 0
  },
  reviews: [reviewSchema],
  numReviews: {
    type: String
  },
  image: {
    type: String
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
