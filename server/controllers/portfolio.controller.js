const PortfolioModel = require("../models/PortfolioModel");
// const APIFeatures = require("../helpers/api-features");

const create = async(req, res) => {
  try {
    await PortfolioModel.create(req.body);
    res.status(201).json({ status: 1, message: "success" });
  } catch (error) {
    res.status(500).json({ status: 0, message: error.message });
  }
};

const update = async(req, res) => {
  try {
    await PortfolioModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ status: "success", message: "Page was updated" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
    throw error;
  }
};

const fetch = async(req, res) => {
  try {
    const portfolio = await PortfolioModel.find(req.query);
    res.json({ data: portfolio, status: "success" });
  } catch (e) {
    res.json({ status: 0, message: e.message });
  }
};

const getById = async(req, res) => {
  try {
    const portfolio = await PortfolioModel.findById(req.params.id);
    return res.status(200).json({ status: "success", data: portfolio });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const remove = async(req, res) => {
  try {
    await PortfolioModel.findByIdAndDelete(req.params.id);
    res.json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

module.exports = { create, fetch, remove, update, getById };
