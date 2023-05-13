var nodemailer = require('nodemailer');

const sendEmailUsingGmail = (email,subject,content) => {

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
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}

module.exports = {
    sendEmailUsingGmail
}