const express = require("express");

const User = require("../models/User");
const app = express();

app.post("/login", async (req, res) => {
    try {
        var body = req.body;
        let user = await User.find({ username: body.username, password: body.password });
        if (user.length > 0) {
            res.end(JSON.stringify({ status: "success", data: user[0] }));
        }
        else {
            res.end(JSON.stringify({ status: "failed", data: "Invalid credentials" }));
        }
    } catch (ex) {
        res.end(JSON.stringify({ status: "failed", data: ex }));
    }
});


module.exports = app;
