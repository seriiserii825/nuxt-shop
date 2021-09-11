const TipoModel = require("../models/TipoModel");

const create = async (req, res) => {
  try {
    const tipo = await TipoModel.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Tipo was created",
      data: {tipo: tipo}
    });
  } catch (error) {
    res.status(404).json({status: "fail", message: error.message});
    throw error;
  }
};

const fetchTipo = async (req, res) => {
  try {
    const tipos = await TipoModel.find();
    res.json({status: "success", tipos: tipos});
  } catch (e) {
    res.status(400).json({status: "fail", message: e.message});
  }
};
const remove = async (req, res) => {
  try {
    const tipo = await TipoModel.findByIdAndDelete(req.params.id);
    res.json({status: "success", message: "Removed"});
  } catch (e) {
    res(400).json({status: "fail", message: e.message});
  }
};
const getById = async (req, res) => {
  try {
    const tipo = await TipoModel.findById(req.params.id);
    res.json({status: "success", tipo: tipo});
  } catch (e) {
    console.log(e, "e");
  }
};
const update = async (req, res) => {
  try {
    const tipo = await TipoModel.findByIdAndUpdate(req.params.id, req.body);
    res.json({status: 1, message: "Updated"});
  } catch (e) {
    res.status(404).json({status: 1, message: "Updated"});
  }
};

module.exports = {create, fetchTipo, getById, update, remove};
