const express = require("express");
const User = require("../models/User");
const { authSchema } = require("../user/validator_schema");
const app = express();

app.post("/", async (req, res) => {
    try {
        let body = req.body;

        const isvalid = await authSchema.validateAsync(body);
        
        let user = new User(
            {
                username: body.username,
                password: body.password
            }
        );
        user.save().then(result => {
            res.send(JSON.stringify({ status: "success", data: result }));
        })
    }
    catch (err) {
        res.send(({ status: "failed", data: err.message }));
    }
});


app.get("/", (req, res) => {
    try {
        User.find().then((result) => {
            res.send({ status: "success", data: result });
        })
    }
    catch (err) {
        res.send({ status: "failed", data: err });
    }
});


app.get("/:id", (req, res) => {
    try {
        User.findById(req.params.id).then((result) => {
            res.send({ status: "success", data: result });
        })
    }
    catch (err) {
        res.send({ status: "failed", data: err });
    }
});


app.put("/:id", (req, res) => {
    try {
        let body = req.body;
        User.findByIdAndUpdate(req.params.id, body).then((result) => {
            res.send(JSON.stringify({ status: "success", data: result }));
        })
    }
    catch (err) {
        res.send({ status: "failed", data: err });
    }
});


app.delete("/:id", (req, res) => {
    try {
        User.findByIdAndDelete(req.params.id).then((result) => {
            res.send(JSON.stringify({ status: "success", data: result }));
        })
    }
    catch (err) {
        res.send({ status: "failed", data: err });
    }
})

module.exports = app;