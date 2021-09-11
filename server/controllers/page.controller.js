const PageModel = require("./../models/PageModel");

const create = async (req, res) => {
  const {
    title_it,
    title_en,
    slug_it,
    slug_en,
    imageMedia
  } = req.body;

  let image = null;

  if (req.file) {
    image = req.file.filename
  } else {
    image = imageMedia
  }
  try {
    await PageModel.create({
      title_it,
      title_en,
      slug_it,
      slug_en,
      homeIntroIt: {
        homeIntroSubTitle_it,
        homeIntroTitle_it,
        homeIntroText_it,
      },
      homeIntroEn: {
        homeIntroSubTitle_en,
        homeIntroTitle_en,
        homeIntroText_en,
      },
      image
    });
    res.status(201).json({ status: 1, message: "success" });
  } catch (error) {
    res.status(500).json({ status: 0, message: error.message });
  }
};

const update = async (req, res) => {
  const {
    title_it,
    title_en,
    slug_it,
    slug_en,
    imageMedia
  } = req.body;
  let image = '';

  if (req.file) {
    image = req.file.filename
  } else {
    image = imageMedia
  }
  try {
    await PageModel.findByIdAndUpdate(req.params.id,
      {
        title_it,
        title_en,
        slug_it,
        slug_en,
        image
      }
    );
    res.status(200).json({ status: "success", message: "Page was updated" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
    throw error;
  }
};

const fetch = async (req, res) => {
  try {
    const pages = await PageModel.find();
    if (pages && pages.length) {
      res.json({ pages, status: "success" });
    } else {
      res.json({ status: 0, message: "No pages found" });
    }
  } catch (e) {
    res.json({ status: "fail", message: "Error" });
    throw e;
  }
};

const getById = async (req, res) => {
  try {
    const page = await PageModel.findById(req.params.id);
    return res.status(200).json({ status: "success", page });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await PageModel.findByIdAndDelete(req.params.id);
    res.json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "fail", message: "can't delete page" });
  }
};

module.exports = { create, fetch, remove, update, getById };
