const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://nhutmai00:nhutmai002@cluster0.pvg1gcb.mongodb.net/vinmei?retryWrites=true&w=majority"
);
const Schema = mongoose.Schema;
const productSchemna = new Schema(
  {
    name: String,
    image: String,
    description: String,
    price: Number,
    unit: String,
    id: Number,
  },
  { collection: "product" }
);

const productmodel = mongoose.model("product", productSchemna);

module.exports = productmodel;
