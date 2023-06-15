const express = require("express");
const Product = require("../models/Product");
router = express.Router();
multer = require("multer");
uuidv4 = require("uuid/v4");
const DIR = "./public/";
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

router.post("/", upload.single("productImg"), (req, res) => {
  const url = req.protocol + "://" + req.get("host") + "/";
  let body = req.body;
  console.log("-----------", req.file);
  let products = new Product({
    productname: body.productname,
    productImg: url + req.file.filename,
    price: body.price,
    quantity:1,
    description: body.description,
    total:body.price
  });
  products.save().then(
    (result) => {
      res.end(JSON.stringify({ status: "success", data: result }));
    },
    (err) => {
      res.end(JSON.stringify({ status: "failed", data: err }));
    }
  );
});

router.get("/", (req, res) => {
  Product.find().then((result) => {
        res.end(JSON.stringify({ status: "success", data: result }));
      },
      (err) => {
        res.end(JSON.stringify({ status: "failed", data: err }));
      }
    );
});

router.get("/:id", (req, res) => {
  Product.findById(req.params.id).then(
    (result) => {
      res.end(JSON.stringify({ status: "success", data: result }));
    },
    (err) => {
      res.end(JSON.stringify({ status: "failed", data: err }));
    }
  );
});

router.put("/:id", (req, res) => {
  let body = req.body;
  Product.findByIdAndUpdate(req.params.id, {
    productname: body.productname
  }).then(
    (result) => {
      res.end(JSON.stringify({ status: "success", data: result }));
    },
    (err) => {
      res.end(JSON.stringify({ status: "failed", data: err }));
    }
  );
});

router.delete("/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id).then(
    (result) => {
      res.end(JSON.stringify({ status: "success", data: result }));
    },
    (err) => {
      res.end(JSON.stringify({ status: "failed", data: err }));
    }
  );
});
module.exports = router;