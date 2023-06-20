const express = require("express");
router = express.Router();

const Product = require("../models/Product");

router.post("/", async (req, res) => {
    try {
        let operation = req.query.operation;
        let product = await Product.findById(req.query.id);
        if (operation === "plus") {
            product.quantity += 1;
            product.total = product.quantity * product.price;
        }
        if (operation === "minus") {
            if (product.quantity !== 0) {
                product.quantity -= 1;
                product.total = product.quantity * product.price;
            }
        }
        Product.findByIdAndUpdate(req.query.id, { quantity: product.quantity, total: product.total }).then((result) => {
            res.send(JSON.stringify({ status: "success", data: result }));
        })
    }
    catch (err) {
        res.send(JSON.stringify({ status: "failed", data: err }));
    }
});

module.exports = router;