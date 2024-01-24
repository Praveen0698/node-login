// const server = require("express");
// const cors = require("cors");
// const app = server();
// const data = require("./schema");
// const pathData = require("path");
// const multer = require("multer");

// app.use(server.json());
// app.use(cors());
// app.use(server.static("public"));

// const storage = multer.diskStorage({
//   destination: (req, res, cb) => {
//     cb(null, "public/Images");
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + pathData.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({
//   storage: storage,
// });

// app.post("/organisation/company", upload.single("file"), (req, res) => {
//   data
//     .create({
//       companyName: req.body.companyName,
//       companyType: req.body.companyType,
//       trendingName: req.body.trendingName,
//       cin: req.body.cin,
//       number: req.body.contactNumber,
//       email: req.body.email,
//       website: req.body.website,
//       gst: req.body.gst,
//       uan: req.body.uan,
//       address: req.body.address,
//       file: req.file.filename,
//     })
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.delete("/company/delete/:id", (req, res) => {
//   var uid = req.params.id;

//   data.deleteOne({ _id: uid }).then((result) => {});
// });

// app.get("/organisation/company", (req, res) => {
//   data
//     .find({})
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

// app.get("/company/get/:id", (req, res) => {
//   data
//     .findOne({ _id: req.params.id })
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

// app.put("/company/update/:id", (req, res) => {
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

// app.listen(3500, () => {
//   console.log("started");
// });

// const express = require("express");
// const cors = require("cors");
// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use(express.static("public"));

// module.exports = app;

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Kpking@900",
  database: "orivehrm",
});

const JWT_SECRET = process.env.JWT_SECRET || "default-secret-key";

app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [results] = await db.execute(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      [username, hashedPassword, role]
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  res.send("working)
  const { username, password } = req.body;
  console.log(username, password);
  let user_email_or_name = username;
  try {
    const [results] = await db.execute(
      "SELECT * FROM employees WHERE user_email_or_name = ?",
      [user_email_or_name]
    );

    console.log(results);
    if (results.length > 0) {
      const user = results[0];
      //   const bcryptResult = await bcrypt.compare(password, user.password);
      const bcryptResult = true;

      console.log(bcryptResult);
      if (bcryptResult) {
        const token = jwt.sign(
          {
            id: user.id,
            username: user.employee_name,
            role: user.designation_name,
          },
          JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.json({ token });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
