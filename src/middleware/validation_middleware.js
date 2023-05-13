const Joi = require('joi'); 

const validationMiddleware = (validation) => { 
  return (request, res, next) => { 
    
  const { error } = validation.validate(request.body); 
  const valid = error == null; 
  
  if (valid) { 
    next(); 
  } else { 
    const { details } = error; 
    const message = details.map(i => i.message).join(',').replace(/"/g, '');;
    console.log("error", message); 
   res.status(422).json({ status: 0, msg: message }) } 
  } 
} 
module.exports = validationMiddleware;