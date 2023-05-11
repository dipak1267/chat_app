const express = require("express");
const bodyparser = require("body-parser");
const app = express();
app.use(express.json());
app.use(bodyparser.json());
require("dotenv").config();
var cors = require('cors');
const server = require('http').Server(app);
app.use(cors())


app.get("/home", (req, res) => {
    res.status(200).send({ status: 1, msg: "welcome to home page chat app"});
});


app.use("/api", require("./routes/router").allRoutes)

server.listen(process.env.PORT, () => {
    console.log(`server start on localhost:${process.env.PORT}`)
});