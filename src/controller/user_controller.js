const db = require("../configs/db");
const user = db.users;
const commonfunction = require("../utils/general_function")
const bcrypt = require("bcryptjs");
const fileUploadfunctions = require("../utils/file_upload_function");
async function getUserDetail(
    request,
    response,
) {
    const requestData = request.body;
    // console.log(requestData)
    try{
        return response.status(200).send({ status: 1, msg: "Sucsess.", data: requestData["user_detail"] });
    
    }catch(err){
        console.log(err);
        return response.status(200).send({ status: 0, msg: err.toString()});
    }
}

async function updateUserProfile(
    request,
    response,
) {
    try{

        const requestData = request.body;
        const currentUserDetail = requestData.user_detail;

        // console.log(requestData);
        
        const userdata = await commonfunction.getUserFromUserToken(currentUserDetail.user_token);

        if(userdata){
            // fileUploadfunctions.uploadProfilePicture();

            response.status(200).send({ status: 1, msg: "Login successfull", data: userdata });
        }else{
            response.status(200).send({ status: 0, msg: "Fail to update user data.", data: userdata });
        }

    }catch(err){
        console.log(err);
        return response.status(200).send({ status: 0, msg: err.toString()});
    }
}

async function changePassword(
    request,
    response,
) {
    try{
        const requestData = request.body;
        const currentUserDetail = requestData.user_detail;

        const passwordCompare = await bcrypt.compare(requestData.old_password, currentUserDetail.user_password);
        if (!passwordCompare) {
            return response.status(200).send({ status: 0, msg: "old_password is wrong." });
        }

        const password = await bcrypt.hash(requestData.user_password, 10);

       var updatedData = await user.update({
            user_password: password,
            updated_date: Date.now()

        }, {
            where: {
                useR_email: currentUserDetail.user_email
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


module.exports = {
    updateUserProfile,
    getUserDetail,
    changePassword
}