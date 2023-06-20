const express = require("express");
const OrderPlaced = require("../models/OrderPlaced");
const app = express();

const { authOrderSchema } = require('../user/order_valid_schema');

app.post("/", async (req, res) => {
    try {
        let body = req.body;

        const isvalid = await authOrderSchema.validateAsync(body);

        let orderPlaced = new OrderPlaced(
            {
                name: body.name,
                email: body.email,
                mobileno: body.mobileno,
                address: body.address,
                pincode: body.pincode,
                city: body.city
            }
        );
        orderPlaced.save().then(result => {
            res.send({ status: "success", data: result });
        })
    }
    catch (err) {
        res.send({ status: "failed", message: err.message });
    };
});


app.get("/", (req, res) => {
    try {
        OrderPlaced.find().then((result) => {
            res.send({ status: "success", data: result });
        })
    }
    catch (err) {
        res.send({ status: "failed", message: err.message });
    };
});


app.get("/:id", (req, res) => {
    try {
        OrderPlaced.findById(req.params.id).then((result) => {
            res.send({ status: "success", data: result });
        })
    }
    catch (err) {
        res.send({ status: "failed", message: err.message });
    };
});


app.put("/:id", (req, res) => {
    try {
        let body = req.body;
        OrderPlaced.findByIdAndUpdate(req.params.id, body).then((result) => {
            res.send({ status: "success", data: result });
        })
    }
    catch (err) {
        res.send({ status: "failed", message: err.message });
    };
});


app.delete("/:id", (req, res) => {
    try {

        OrderPlaced.findByIdAndDelete(req.params.id).then((result) => {
            res.send({ status: "success", data: result });
        })
    }
    catch (err) {
        res.send({ status: "failed", message: err.message });
    };
})

module.exports = app;