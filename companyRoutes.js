const express = require("express");
const router = express.Router();
const data = require("./schema");
const multer = require("multer");
const path = require("path");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

// Routes
router.post("/", upload.single("file"), (req, res) => {
  data
    .create({
      companyName: req.body.companyName,
      companyType: req.body.companyType,
      trendingName: req.body.trendingName,
      cin: req.body.cin,
      number: req.body.contactNumber,
      email: req.body.email,
      website: req.body.website,
      gst: req.body.gst,
      uan: req.body.uan,
      address: req.body.address,
      file: req.file.filename,
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// router.delete("/delete/:id", (req, res) => {
//   const uid = req.params.id;

//   data.deleteOne({ _id: uid }).then((result) => {
//     // Handle response or send status
//     res.json(result);
//   });
// });

router.get("/", (req, res) => {
  data
    .find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

// router.get("/get/:id", (req, res) => {
//   data
//     .findOne({ _id: req.params.id })
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

// router.put("/update/:id", (req, res) => {
//   data
//     .updateMany({
//       companyName: req.body.companyName,
//       number: req.body.contactNumber,
//       email: req.body.email,
//       gst: req.body.gst,
//       uan: req.body.uan,
//       cin: req.body.cin,
//     })
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => res.json(err));
// });

module.exports = router;
