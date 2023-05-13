const express = require("express");
const bodyparser = require("body-parser");
const app = express();
app.use(express.json());
app.use(bodyparser.json());
var cors = require('cors');
// const server = require('http').Server(app);
const CONFIG = require('./configs/config');
require("./configs/db");
app.use(cors({
    origin: '*'
 }));


app.get("/home", (req, res) => {
    res.status(200).send({ status: 1, msg: "welcome to home page chat app"});
});

app.use("/api", require("./routes/routes").allRoutes)

app.listen(CONFIG.port, () => {
    console.log(`server start on localhost:${CONFIG.port}`)
});