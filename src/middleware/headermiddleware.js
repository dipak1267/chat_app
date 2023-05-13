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



module.exports = {
    headers
}