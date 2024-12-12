// Packages
const mysql = require("mysql2");
const multer = require("multer");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

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

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});

app.get("/products", (req, res) => {
  const query = "SELECT * FROM product";

  db.query(query, (err, result) => {
    if (err) {
      console.error({ error: "Error getting all products:" + err });
      return res
        .status(500)
        .send({ error: "Error getting all products: " + err });
    }
    return res.status(200).send(result);
  });
});

app.get("/product/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM product WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error({ error: "Error getting product:" + err });
      return res.status(500).send({ error: "Error getting product: " + err });
    }

    if (results.length === 0) {
      return res
        .status(400)
        .send({ error: "Failed to find product with id " + id });
    }

    return res.status(200).send(results[0]);
  });
});

app.get("/user/products", (req, res) => {
  try {
    if (req.cookies["user"]) {
      const query = "SELECT * from product WHERE user_id = ?";

      const { id } = req.cookies["user"];

      db.query(query, [id], (err, results) => {
        if (err) {
          console.log("Error in GET /user/products", err);
          return res
            .status(500)
            .send({ error: "Error when getting user products " + err });
        }

        return res.status(200).send(results);
      });
    } else {
      return res.status(401).send({ error: "User not logged in." });
    }
  } catch (err) {
    console.log("Error in GET /user/products", err);
    return res.status(500).send({
      error:
        "An unexpected error occurred when getting user products: " +
        err.message,
    });
  }
});

app.get("/user/product/:id", (req, res) => {
  try {
    if (req.cookies["user"]) {
      const productId = req.params.id;
      const query = "SELECT * from product WHERE id = ? AND user_id = ?";

      const { id } = req.cookies["user"];

      db.query(query, [productId, id], (err, results) => {
        if (err) {
          console.log("Error in GET /user/products/" + productId, err);
          return res.status(500).send({
            error:
              "Error when getting user product with id " +
              productId +
              " " +
              err,
          });
        }

        if (results.length === 0) {
          return res.status(400).send({
            error: "Failed to find user product with id " + productId,
          });
        }

        return res.status(200).send(results[0]);
      });
    } else {
      return res.status(401).send({ error: "User not logged in." });
    }
  } catch (err) {
    console.log("Error in GET /user/products/:userId", err);
    return res.status(500).send({
      error:
        "An unexpected error occurred when getting user product: " +
        err.message,
    });
  }
});

/**
 * Adds a product given the user adding it
 */
app.put("/user/product/:id", upload.single("image"), (req, res) => {
  try {
    if (req.cookies["user"]) {
      const { name, description, price } = req.body;
      const image_url = req.file ? `/uploads/${req.file.filename}` : null;
      const { id } = req.cookies["user"];
      const productId = req.params.id;

      let query = `UPDATE product
        SET name = ?, description = ?, price = ?, image_url = ?
        WHERE id = ? AND user_id = ?`;
      let queryParams = [name, description, price, image_url, productId, id];

      if (image_url === null) {
        query = `UPDATE product
        SET name = ?, description = ?, price = ?
        WHERE id = ? AND user_id = ?`;

        queryParams = [name, description, price, productId, id];
      }

      console.log([name, description, price, image_url, productId, id]);

      db.query(query, queryParams, (err, results) => {
        if (err) {
          console.log("Error in PUT /user/products/" + productId, err);
          return res.status(500).send({
            error:
              "Error when updating user product with id " +
              productId +
              " " +
              err,
          });
        }

        if (results.length === 0) {
          return res.status(400).send({
            error: "Failed to update user product with id " + productId,
          });
        }

        return res.status(200).send("Sucessfully updated user product.");
      });
    } else {
      return res.status(401).send({ error: "User not logged in." });
    }
  } catch (err) {
    console.log("Error in GET /user/products/:userId", err);
    return res.status(500).send({
      error:
        "An unexpected error occurred when getting user product: " +
        err.message,
    });
  }
});

/**
 * Adds a product given the user adding it
 */
app.post("/user/product", upload.single("image"), (req, res) => {
  try {
    if (req.cookies["user"]) {
      const { name, description, price } = req.body;
      const image_url = req.file ? `/uploads/${req.file.filename}` : null;

      const query = `INSERT INTO product (name, description, price, image_url, user_id)
        VALUES (?, ?, ?, ?, ?);`;

      const { id } = req.cookies["user"];

      db.query(
        query,
        [name, description, price, image_url, id],
        (err, results) => {
          if (err) {
            console.log("Error in POST /user/products", err);
            return res.status(500).send({
              error: "Error when adding user product " + err,
            });
          }

          return res.status(200).send("User product successfully added.");
        }
      );
    } else {
      return res.status(401).send({ error: "User not logged in." });
    }
  } catch (err) {
    console.log("Error in POST /user/products", err);
    return res.status(500).send({
      error:
        "An unexpected error occurred when adding user product: " + err.message,
    });
  }
});

/**
 * Deletes a product given its id and the user deleting it
 */
app.delete("/user/product/:id", (req, res) => {
  try {
    if (req.cookies["user"]) {
      const productId = req.params.id;
      const selectQuery =
        "SELECT image_url FROM product WHERE id = ? AND user_id = ?";
      const deleteQuery = "DELETE FROM product WHERE id = ? AND user_id = ?";

      let url = null;

      const { id } = req.cookies["user"];

      db.query(selectQuery, [productId, id], (err, results) => {
        if (err) {
          console.log("Error in DELETE /user/products/" + userId, err);
          return res.status(500).send({
            error:
              "Error when deleting user product with id " +
              productId +
              " " +
              err,
          });
        }

        url = "." + results[0].image_url;

        db.query(deleteQuery, [productId, id], (err, results) => {
          if (err) {
            console.log("Error in DELETE /user/products/" + userId, err);
            return res.status(500).send({
              error:
                "Error when deleting user product with id " +
                productId +
                " " +
                err,
            });
          }

          fs.unlink(url, (err) => {
            if (err) {
              return res
                .status(200)
                .send(
                  "Sucessfully deleted product, failed to delete image from storage"
                );
            } else {
              return res.status(200).send("Sucessfully deleted product");
            }
          });
        });
      });
    } else {
      return res.status(401).send({ error: "User not logged in." });
    }
  } catch (err) {
    console.log("Error in GET /user/products/:userId", err);
    return res.status(500).send({
      error:
        "An unexpected error occurred when getting user products: " +
        err.message,
    });
  }
});

/**
 * Checks if a given email and password are valid
 *
 * Creates a cookie on success
 */
app.post("/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const query = "SELECT id, email FROM user where email = ? AND password = ?";

    db.query(query, [email, password], (err, results) => {
      if (err) {
        console.log("Error in POST /login", err);
        return res
          .status(500)
          .send({ error: "Error when getting user " + err });
      }

      // Check if user with given credentials was found
      if (results.length === 0) {
        return res.status(401).send({ error: "Invalid username or password." });
      }

      // Send cookie to
      res.cookie("user", results[0], {
        maxAge: 1000 * 60 * 30,
        secure: true,
        sameSite: "none",
      });

      res.status(200);
      res.send("Sucessfully set user cookie");
    });
  } catch (err) {
    console.log("Error in POST /login", err);
    return res.status(500).send({
      error: "An unexpected error occurred when logging in: " + err.message,
    });
  }
});

/**
 * Adds a user to the database
 */
app.post("/user/register", (req, res) => {
  try {
    const { email, password } = req.body;
    const query = "INSERT INTO user (email, password) VALUES (?, ?)";

    db.query(query, [email, password], (err, result) => {
      if (err) {
        console.log("Error in /register", err);

        if (err.code == "ER_DUP_ENTRY") {
          return res.status(400).send({ error: "Email already exists." });
        }

        return res.status(400).send({ error: "Error in adding user " + err });
      }

      return res.status(201).send("User added successfully.");
    });
  } catch (err) {
    console.log("Error in POST /register", err);
    return res.status(500).send({
      error:
        "An unexpected error occurred when attempting to register " +
        err.message,
    });
  }
});
