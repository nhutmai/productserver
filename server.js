const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productmodel = require("./productModel");
const accountmodel = require("./accountmodel");

const app = express();
const port = 4000;
app.use(cors());
//midleway bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//return product
app.get("/product", (req, res) => {
  productmodel
    .find({})
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
    });
});

//checking login
app.post("/account", (req, res) => {
  const { name, pass } = req.body;
  accountmodel
    .findOne({ name: name, pass: pass })
    .then((data) => {
      res.json("kq lad " + data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.listen(port, () => {
  console.log(`App is listening in ${port}`);
});
