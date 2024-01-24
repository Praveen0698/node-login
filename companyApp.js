const app = require("./server");
const upload = require("./multerConfig");
const {
  createCompany,
  deleteCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
} = require("./dataController");

app.post("/organisation/company", upload.single("file"), createCompany);
app.delete("/company/delete/:id", deleteCompany);
app.get("/organisation/company", getAllCompanies);
app.get("/company/get/:id", getCompanyById);
app.put("/company/update/:id", updateCompany);

module.exports = app;
