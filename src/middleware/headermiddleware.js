require('dotenv').config();

const headers = (req, res, next) => {
    const requiredHeaders = process.env.REQUIRED_HEADERS.split(",");

    for (let name of requiredHeaders) {
        let value = req.headers[name.toLowerCase()];
        console.log(`${name}: ${value}`);
        if(req.headers.hasOwnProperty(name.toLowerCase())){
            if((name == "App-Secret" && value != process.env.APP_SECRERT)){
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