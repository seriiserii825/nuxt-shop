const SolutionModel = require("./../models/SolutionModel");

const create = async (req, res) => {
  const {
    title_it,
    title_en,
    slug_it,
    slug_en,
    excerpt_it,
    excerpt_en,
    tipo_id,
    imageMedia,
    imageMediaMenu
  } = req.body;
  try {
    const page = await SolutionModel.create({
      title_it,
      title_en,
      slug_it,
      slug_en,
      excerpt_it,
      excerpt_en,
      tipo_id,
      imageMedia,
      imageMediaMenu
    });
    if (page) {
      res.status(201).json({ status: 1, message: "Page was created" });
    } else {
      res.status(500).json({ status: 0, message: "Error on server" });
    }
  } catch (error) {
    res.status(500).json({ status: 0, message: error.message });
  }
};

const update = async (req, res) => {
  console.log(req.body, 'req.body')

  const {
    title_it,
    title_en,
    slug_it,
    slug_en,
    excerpt_it,
    excerpt_en,
    tipo_id,
    imageMedia,
    imageMediaMenu
  } = req.body;

  console.log(req.params.id, 'req.params.id')


  try {
    await SolutionModel.findByIdAndUpdate(req.params.id,
      {
        title_it,
        title_en,
        slug_it,
        slug_en,
        excerpt_it,
        excerpt_en,
        tipo_id,
        image_small: imageMedia,
        image_menu: imageMediaMenu
      }
    );
    res.status(200).json({ status: "success", message: "Solution was updated" });
  } catch (error) {
    res.status(500).json({ status: "success", message: error.message });
  }
};

const fetch = async (req, res) => {
  try {
    const solutions = await SolutionModel.find().populate({ path: 'tipo_id', select: 'title_it title_en' });
    res.json({ data: solutions, status: "success" });
  } catch (e) {
    res.json({ status: "fail", message: e.message });
    throw e;
  }
};

const getById = async (req, res) => {
  try {
    const data = await SolutionModel.findById(req.params.id);
    return res.status(200).json({ status: "success", data });
  } catch (error) {
    return res.status(404).json({ status: "fail", message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await SolutionModel.findByIdAndDelete(req.params.id);
    res.json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "fail", message: "can't delete pages" });
  }
};

module.exports = { create, fetch, remove, update, getById };
