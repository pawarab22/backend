var express = require("express");
var mongodb = require("mongodb");

var mongoose = require("mongoose");
const bodyparser = require('body-parser');

var app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/eccomsite");
let db = mongoose.connection;

db.on("error", (error) => {
    console.log("Connection Error ...!" + error);
});

db.on("open", () => {
    console.log(" DB Connection success");
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method == "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT,POST,GET,PATCH,DELETE");
      return res.status(200).json({});
  }
  next();
});

app.get("/", (req, res) => {
  res.send("hello..!");
});

// routes
app.use("/users",require("./routes/users"));
app.use("/products",require("./routes/products"));
app.use("/orderplaced",require("./routes/orderplaced"));
app.use("/authentication",require("./routes/authentication"));
app.use("/updateQty",require("./routes/updateprice"));




app.listen(8081, () => {

  console.log("API's running on server http://localhost:8081/");

});