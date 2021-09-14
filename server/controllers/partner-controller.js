const PartnerModel = require("./../models/PartnerModel");

const create = async (req, res) => {
  console.log(req.body, 'req.body')
  try {
    await PartnerModel.create(req.body);
    res.status(201).json({ status: 1, message: "success" });
  } catch (error) {
    res.status(500).json({ status: 0, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    await PartnerModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ status: "success", message: "Partner was updated" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
    throw error;
  }
};

const fetch = async (req, res) => {
  try {
    const partners = await PartnerModel.find();
    if (partners && partners.length) {
      res.json({ partners, status: "success" });
    } else {
      res.json({ status: 0, message: "No partners found" });
    }
  } catch (e) {
    res.json({ status: "fail", message: "Error" });
    throw e;
  }
};

const getById = async (req, res) => {
  try {
    const partner = await PartnerModel.findById(req.params.id);
    return res.status(200).json({ status: "success", data: partner });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await PartnerModel.findByIdAndDelete(req.params.id);
    res.json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "fail", message: "can't delete page" });
  }
};

module.exports = { create, fetch, remove, update, getById };
