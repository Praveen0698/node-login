// dataController.js
const data = require("./schema");

exports.createCompany = async (req, res) => {
  try {
    const result = await data.create({
      companyName: req.body.companyName,
      companyType: req.body.companyType,
      trendingName: req.body.trendingName,
      cin: req.body.cin,
      contactNumber: req.body.contactNumber,
      email: req.body.email,
      website: req.body.website,
      gst: req.body.gst,
      uan: req.body.uan,
      address: req.body.address,
      file: req.file.filename,
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    await data.deleteOne({ _id: req.params.id });
    res.json({ message: "Company deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const result = await data.find({});
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const result = await data.findOne({ _id: req.params.id });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const result = await data.findOne({ _id: req.params.id });
    await result.updateOne({
      companyName: req.body.companyName,
      contactNumber: req.body.contactNumber,
      email: req.body.email,
      gst: req.body.gst,
      uan: req.body.uan,
      cin: req.body.cin,
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
