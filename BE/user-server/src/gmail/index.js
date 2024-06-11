const nodemailer = require('nodemailer');
require("dotenv").config();

 
 
const sendMail = (toEmail,data)=>{
    // Create a transporter object using SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_EMAIL
    }
});
    // Email content
 

let mailOptions

if(data){
    mailOptions = {
        from: process.env.EMAIL,
        to: toEmail,
        subject: 'NETTRUYEN',
        html: `
        <h1>Welcome to NETTRUYEN!</h1>
        <p>We're excited to have you on board. Enjoy your reading experience!</p>
        <p><a href="${process.env.API_GATEWAY_HOST}/api/v1/verified?idAccount=${data}">Click here to verify your account</a></p>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTbfHg_0muOFUaLUcX4NM6v8RX9fGM4uV5iw&s" alt="NETTRUYEN Logo">
    `
    };
}else{
    mailOptions = {
        from: 'thuu28052002@gmail.com',
        to: toEmail,
        subject: 'NETTRUYEN',
        html: `
        <h1>Welcome to NETTRUYEN!</h1>
        <p>We're excited to have you on board. Enjoy your reading experience!</p>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTbfHg_0muOFUaLUcX4NM6v8RX9fGM4uV5iw&s" alt="NETTRUYEN Logo">
    `
    };
}
// Send email
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info?.response);
    }
});
}

//  sendMail('thuu28052002@gmail.com',1)
 
module.exports = sendMail