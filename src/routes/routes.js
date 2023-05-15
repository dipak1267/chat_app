const express = require("express");
const allRoutes = express.Router();


const middleware = require("../middleware/header_middleware.js");
allRoutes.use(middleware.headers);


// route.post("/auth/register",  (req, res) => {
//     res.status(200).send({ status: 1, msg: "registration page"});
// });

allRoutes.use(
    "/auth",
    require("./auth.routes").authenticationRouter
);

allRoutes.use(
    "/user",
    require("./user.routes").userRouter
);


module.exports = { allRoutes }