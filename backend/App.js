// Packages
const mysql = require("mysql2");
const multer = require("multer");
const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");
const path = require("path");

// MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "password123",
  database: "12s1",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const fs = require("fs");
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Server
const host = "localhost";
const port = "8081";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});

app.get("/products", (req, res) => {
  db.query("SELECT * FROM product", (err, result) => {
    if (err) {
      console.error({ error: "Error reading all products:" + err });
      return res
        .status(500)
        .send({ error: "Error reading all products: " + err });
    }
    return res.status(200).send(result);
  });
});
