require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

let dbSchema = new mongoose.Schema({
  companyName: String,
  companyType: String,
  trendingName: String,
  cin: String,
  contactNumber: Number,
  email: String,
  website: String,
  gst: String,
  uan: String,
  address: String,
  file: String,
});

const CompanyModel = mongoose.model("companyData", dbSchema);

module.exports = CompanyModel;
