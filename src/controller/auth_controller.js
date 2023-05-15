const db = require("../configs/db");
const user = db.users;
const validation = require('../validation/auth_validation')
const commonValidation = require('../validation/common_validation')
const commonfunction = require("../utils/general_function")
const CONFIG = require('../configs/config')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function handleUserSingUp(
    request,
    response,
) {
    const requestData = request.body;
    try{
        const password = await bcrypt.hash(requestData.user_password, 10);
        if (requestData.user_email) {
            const email = await commonValidation.isUserExistWithEmail(requestData.user_email);
            if (email) {} else {
                return response.status(200).send({ status: 0, msg: "Email already exist" });
            }

        } else {
            return response.status(200).send({ status: 0, msg: "Please enter email" });
        }


        const users = await user.create({
            user_name: requestData.user_name,
            user_email: requestData.user_email,
            user_password: password,
            created_date: Date.now(),
            updated_date: Date.now()

        })

        const unique_id = users.user_id;
        const u_tokens = jwt.sign(unique_id, CONFIG.secret_key)
        

        await user.update({
            user_token: u_tokens

        }, {
            where: {
                user_id: users.user_id
            }
        })

        var isUpdated = await updateAuthToken(unique_id); 

        if(!isUpdated){
            return response.status(200).send({ status: 0, msg: "Fail to update auth token" });
        }


        const userdata = await commonfunction.getUserFromUserToken(u_tokens);

        if(userdata){
            return response.status(200).send({ status: 1, msg: "Register successfull", data: userdata });
        }else{
            return response.status(200).send({ status: 0, msg: "Fail to register user.", data: userdata });
        }
        
    
    }catch(err){
        console.log(err);
        return response.status(200).send({ status: 0, msg: err.toString()});
    }

      
}

async function handleUserSingIn(
    request,
    response,
) {
    const requestData = request.body;

    try{
        const finduser = await user.findOne({
            where: {
                useR_email: requestData.user_email
            }
        })
        if (!finduser){
            return response.status(200).send({ status: 0, msg: "User not exist with this email." });
        }

        if (finduser.is_deleted == 0) {
            const password = await bcrypt.compare(requestData.user_password, finduser.user_password);
            if (!password) {
                return response.status(200).send({ status: 0, msg: "Wrong password" });
            }


            var isUpdated = await updateAuthToken(finduser.user_id); 

            if(!isUpdated){
                return response.status(200).send({ status: 0, msg: "Fail to update auth token" });
            }
            
            const userdata = await commonfunction.getUserFromUserToken(finduser.user_token);
            
            if(userdata){
                return  response.status(200).send({ status: 1, msg: "Login successfull", data: userdata });
            }else{
                return response.status(200).send({ status: 0, msg: "Fail to login.", data: userdata });
            }

        } else {
            return response.status(200).send({ status: 0, msg: "User not exist" });

        }
    }catch(err){
        console.log(err);
        return response.status(200).send({ status: 0, msg: err.toString()});
    }
}

async function forgotPassword(
    request,
    response,
) {
    try{
        const requestData = request.body;

        const finduser = await user.findOne({
            where: {
                useR_email: requestData.user_email
            }
        })
        if (!finduser){
            return response.status(200).send({ status: 0, msg: "User not exist with this email." });
        }

        var code = Math.floor(1000 + Math.random() * 9000);;
        
        var updatedData = await user.update({
            verify_password_code: code

        }, {
            where: {
                useR_email: requestData.user_email
            }
        });

        if(updatedData != 1){
            return response.status(200).send({ status: 0, msg: "Fail to generate verification code." });
        }
        
        require("../utils/general_function").sendEmailUsingGmail(requestData.user_email,"Forgot Password", `Here is code:- \n${code}`,
        function(error, info){
            if (error) {
              console.log('Email error: ' + error);
              return response.status(200).send({ status: 0, msg: "We are unable to send email right now."});
            } else {
              console.log('Email sent: ' + info.response);
              response.status(200).send({ status: 1, msg: "Forgot password code sent to your email.", code : code});
            }
          });
        
    }catch(err){
        console.log(err);
        return response.status(200).send({ status: 0, msg: err.toString()});
    }
}

async function changePasswordWithVerificationCode(
    request,
    response,
) {
    try{
        const requestData = request.body;

        const finduser = await user.findOne({
            where: {
                useR_email: requestData.user_email
            }
        })
        
        if (!finduser){
            return response.status(200).send({ status: 0, msg: "User not exist with this email." });
        }

        if(finduser.verify_password_code != requestData.verify_code){
            return response.status(200).send({ status: 0, msg: "Verification code is not valid." });
        }

        const password = await bcrypt.hash(requestData.user_password, 10);

       var updatedData = await user.update({
            user_password: password,
            updated_date: Date.now()

        }, {
            where: {
                useR_email: requestData.user_email
            }
        });
        
        if(updatedData == 1){
            return response.status(200).send({ status: 1, msg: "Password changed." });
        }else{
            return response.status(200).send({ status: 0, msg: "Fail to change Password." });
        }

    }catch(err){
        console.log(err);
        return response.status(200).send({ status: 0, msg: err.toString()});
    }
}


const updateAuthToken = async(id) => {
    try{
        const auth_token = id + [...(CONFIG.auth_string + CONFIG.auth_string)].sort(()=>Math.random()-.5).join('') + id; 

        await user.update({
            auth_token: auth_token

        }, {
            where: {
                user_id: id
            }
        })
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
    
}

module.exports = { handleUserSingUp, handleUserSingIn ,forgotPassword,changePasswordWithVerificationCode};