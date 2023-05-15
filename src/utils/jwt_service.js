const jwt = require('jsonwebtoken');
const jwt_decode  = require('jwt-decode');

const getJwtToken = async (id, email, password) => {

   try {
       if (password) {
           return await jwt.sign({
               id: id,
               email: email,
               password: password
           },
               process.env.SECRET_KEY_JWT || 'my-secret-key');
       } else {
           return await jwt.sign({
               id: id,
               email: email
           },
               process.env.SECRET_KEY_JWT || 'my-secret-key');
       }

   } catch (error) {
       throw (error)
   }

}

const verifyJwtToken = async (token) => {
   return jwt.verify(
       token,
       process.env.SECRET_KEY_JWT || "my-secret-key"
   );
}

const decode = async (token,fields) => {
   const decoded = jwt_decode(token);
   if (fields) {
       const {fields}  = decoded;
       return  fields 
   }
   return decoded;
}

const getTokenFromRequest = (bearerToken) => {
  bearerToken =  String(bearerToken).split(" ")[1];
  return bearerToken
}

module.exports = {
   getJwtToken,
   verifyJwtToken,
   decode,
   getTokenFromRequest
}