const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productmodel = require("./productModel");
const accountmodel = require("./accountmodel");
var jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
const port = process.env.port || 8080;

app.use(express.json({ extended: false }));

//midleway bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//kiểm tra token
const isTokenValid = (token) => {
  try {
    jwt.verify(token, "nhut");
    return true;
  } catch (error) {
    return false;
  }
};

//check login fuction
const checklogin = (req, res, next) => {
  const token = req.body.token;
  console.log(token);
  if (!token || !isTokenValid(token)) {
    res.json("Token không hợp lệ");
  } else {
    var decoded = jwt.verify(req.body.token, "nhut");
    accountmodel
      .findById(decoded.userId)
      .then((data) => {
        if (data) {
          res.data = data;
          next();
        } else {
          res.json("vui lòng đăng nhập");
        }
      })
      .catch((err) => console.log("lỗi xác thực token"));
  }
};

//return product
app.get("/product", (req, res) => {
  productmodel
    .find({})
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
    });
});
//user account
app.post("/account", checklogin, (req, res) => {
  res.json(res.data);
});

//checking login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  accountmodel
    .findOne({ name: username, pass: password })
    .then((data) => {
      if (data) {
        const token = jwt.sign({ userId: data._id }, "nhut", {
          expiresIn: "3h",
        });
        return res.json({ token: token });
      } else {
        res.status(401).json({ message: "Tài khoản không tồn tại" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//test
app.get("/", (req, res) => {
  res.json("da chay thnah cong");
});

app.listen(port, () => {
  console.log(port);
});
