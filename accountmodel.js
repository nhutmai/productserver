const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://nhutmai00:nhutmai002@cluster0.pvg1gcb.mongodb.net/vinmei?retryWrites=true&w=majority"
);
const Schema = mongoose.Schema;
const accountSchemna = new Schema(
  {
    name: String,
    pass: String,
    role: Number,
  },
  { collection: "account" }
);

const accountmodel = mongoose.model("account", accountSchemna);

module.exports = accountmodel;
