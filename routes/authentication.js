const express = require("express");
let jwt = require("jsonwebtoken");

const User = require("../models/User");

const app = express();

app.post("/login", (req, res) => {

    try {
        let body = req.body;
        User.find({ username: req.body.username, password: req.body.password }).then(result => {
            if (result.length > 0) {

                let token = jwt.sign({
                    token: result[0]
                }, 'SECRETKEY', { expiresIn: "365d" });
                return res.end(JSON.stringify({ status: "success", token: token, data: result[0] }));
            } else {
                return res.end(JSON.stringify({ status: "failed" }));
            }
        });
    } catch (err) {
        res.end(JSON.stringify({ status: "failed", message: err.message }));
    }
});


module.exports = app;
