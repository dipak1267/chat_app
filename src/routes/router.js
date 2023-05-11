const express = require("express");
const allRoutes = express.Router();


const middleware = require("../middleware/headermiddleware");
allRoutes.use(middleware.headers);


// route.post("/auth/register",  (req, res) => {
//     res.status(200).send({ status: 1, msg: "registration page"});
// });

allRoutes.use(
    "/auth",
    require("./auth_router").authenticationRouter
);

module.exports = { allRoutes }