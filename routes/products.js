const express = require("express");
const Product = require("../models/Product");
router = express.Router();
multer = require("multer");
uuidv4 = require("uuid/v4");
const DIR = "./public/";

const { authProdSchema } = require('../user/prod_valid_schema');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, + "-" + fileName);
  }
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  }
});

router.post("/", upload.single("productImg"), async (req, res) => {
  try {
    const url = req.protocol + "://" + req.get("host") + "/";
    let body = req.body;
    
    console.log("-----------", req.file);

    const isvalid = await authProdSchema.validateAsync(body);
    
    let products = new Product({
      productname: body.productname,
      productImg: url + req.file.filename,
      price: body.price,
      quantity: 1,
      description: body.description,
      total: body.price
    });
    products.save().then(
      (result) => {
        res.send(JSON.stringify({ status: "success", data: result }));
      })
  }
  catch (err) {
    res.send(JSON.stringify({ status: "failed", message: err.message }));
  }

});

router.get("/", (req, res) => {
  try {
    Product.find().then((result) => {
      res.send({ status: "success", data: result });
    })
  }
  catch (err) {
    res.send({ status: "failed", message: err.message });
  }

});

router.get("/:id", (req, res) => {
  try {
    Product.findById(req.params.id).then(
      (result) => {
        res.send({ status: "success", data: result });
      })
  }
  catch (err) {
    res.send({ status: "failed", message: err.message });
  }

});

router.put("/:id", (req, res) => {
  try {
    let body = req.body;
    Product.findByIdAndUpdate(req.params.id, {
      productname: body.productname
    }).then(
      (result) => {
        res.send({ status: "success", data: result });
      })
  }
  catch (err) {
    res.send({ status: "failed", message: err.message });
  }

});

router.delete("/:id", (req, res) => {
  try {
    Product.findByIdAndDelete(req.params.id).then(
      (result) => {
        res.send({ status: "success", data: result });
      })
  }
  catch (err) {
    res.send({ status: "failed", message: err.message });
  }

});
module.exports = router;