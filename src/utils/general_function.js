var nodemailer = require('nodemailer');

const db = require("../configs/db");
const user = db.users;

const getUserFromUserToken = async (userToken) => {
    const userData =
    await user.findOne({
        where: {
          user_token: userToken,
        }
    });

    if (userData) {
      return userData;
    } else {
        return null;
    }

}

const getUserFromAuthToken = async (authToken) => {
  const userData =
  await user.findOne({
      where: {
        auth_token: authToken,
      }
  });

  if (userData) {
    return userData;
  } else {
      return null;
  }
}


const sendEmailUsingGmail = async (email,subject,content,callback) => {

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ravicodonnier2204@gmail.com',
        pass: 'axtjiriophszqgii'
      }
    });
    
    var mailOptions = {
      from: 'ravicodonnier2204@gmail.com',
      to: email,
      subject: subject,
      text: content
    };
    
    transporter.sendMail(mailOptions,callback);
}

module.exports = {
    sendEmailUsingGmail,
    getUserFromUserToken,
    getUserFromAuthToken
}