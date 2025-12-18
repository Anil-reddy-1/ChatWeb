const express = require("express");
const app = express();
const cors = require("cors");


app.use(express.json());
app.get("/", (req, res) => {
    res.status(200).end("server conected");
})
