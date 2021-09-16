const ProductModel = require("./../models/ProductModel");

const create = async(req, res) => {
  try {
    await ProductModel.create(req.body);
    res.status(201).json({ status: 1, message: "success" });
  } catch (error) {
    res.status(500).json({ status: 0, message: error.message });
  }
};

const update = async(req, res) => {
  try {
    await ProductModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ status: "success", message: "Category was updated" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
    throw error;
  }
};

const fetch = async(req, res) => {
  try {
    let records;
    if (req.query.category) {
      records = await ProductModel.find().populate({ path: 'category', select: 'title' });
      records.reverse();
    } else {
      records = await ProductModel.find();
      records.reverse();
    }
    res.json({ status: "success", records });
  } catch (e) {
    console.log('fetch error'.red)
    res.json({ status: "fail", message: "Error" });
    throw e;
  }
};

const getById = async(req, res) => {
  try {
    let record;
    if (req.query.category) {
      record = await ProductModel.findById(req.params.id).populate({ path: 'category', select: 'title' });
    } else {
      record = await ProductModel.findById(req.params.id);
    }
    return res.status(200).json({ status: "success", record });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const remove = async(req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "fail", message: "can't delete page" });
  }
};

module.exports = { create, fetch, remove, update, getById };
