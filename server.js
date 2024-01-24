

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createPool({
  host: "sql6.freemysqlhosting.net",
  port: 3306,
  user: "sql6679486",
  password: "cPIhAlzZpb",
  database: "sql6679486",
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
  const { username, password } = req.body;
  //res.send(username);
  let user_email_or_name = username;
  try {
    const [results] = await db.execute(
      "SELECT * FROM employees WHERE username = ?",
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
            username: user.username,
            role: user.role,
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

app.get("/login/greet",(req,res) => {
  res.send("working")
})

app.get("/login/welcome",(req,res) => {
  res.send("welcome")
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
