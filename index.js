var express = require("express");
var mongodb = require("mongodb");

var mongoose = require("mongoose");
const bodyparser = require('body-parser');
let jwt = require("jsonwebtoken");
const auth = require('./middleware/auth')

// Middleware
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


//cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,PATCH,DELETE");
    return res.status(200).json({});
  }

  //Token validation
  if (!req.headers.authorization) {
    let data = {
      status: "exit",
      message: "autherization error",
      statusCode: 408
    };
    // res.end(JSON.stringify(data));
    // res.status(408).json(data);
    res.json(data);
  }
  else if (req.path.includes("/gettoken")) {
    next();
  }
  else {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, 'SECRETKEY');

      next();

      //Check if decoded value is right or wrong
    }
    catch (ex) {
      let data = {
        status: "exit",
        message: "autherization error-decode",
        statusCode: 408
      };
      res.json(data);
    }
  }
  // next();
});


//root api
app.get("/", (req, res) => {
  res.send("hello..!");
});

//token generation
app.post("/gettoken", (req, res) => {
  let body = req.body;
  let token = jwt.sign({
    token: body.token
  }, 'SECRETKEY', { expiresIn: "365d" });
  let data = {
    status: "success",
    token: token
  };
  res.end(JSON.stringify(data));
});


// routes
app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));
app.use("/orderplaced", require("./routes/orderplaced"));
app.use("/authentication", require("./routes/authentication"));
app.use("/updateQty", require("./routes/updateprice"));



// Server
app.listen(8081, () => {

  console.log("API's running on server http://localhost:8081/");

});

