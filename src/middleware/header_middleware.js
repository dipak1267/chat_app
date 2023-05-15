const CONFIG = require('../configs/config');

const headers = (req, res, next) => {
    const requiredHeaders = CONFIG.required_headers.split(",");

    for (let name of requiredHeaders) {
        let value = req.headers[name.toLowerCase()];
        // console.log(`${name}: ${value}`);
        if(req.headers.hasOwnProperty(name.toLowerCase())){
            if((name == "App-Secret" && value != CONFIG.app_secret)){
                res.send({ status: 0, msg: "Invalid App-Secret" });
                break;
            }
        }else{
            res.send({ status: 0, msg: `${name} not found` })
            break;
        }
      }
      next();
}

const checkAuthToken = async (req, res, next) => {
    var token = req.headers["Auth-Token".toLowerCase()];
    if(token){
           const user =  await require("../utils/general_function").getUserFromAuthToken(token);
           if(user){
            req.body["user_detail"] = user;
            next();
           }else{
            res.send({ status: 0, msg: `Auth-Token expired.` });    
           }

    }else{
        res.send({ status: 0, msg: `Auth-Token not found` });
    }
}



module.exports = {
    headers,
    checkAuthToken
}