const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();


async function SendEmail (sendto) {

    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : process.env.EMAIL_ID,
            pass : process.env.EMAIL_PW
        }
    });

    const mailOptions = {
        from : process.env.EMAIL_ID,
        to : `${sendto}`,
        subject: 'Thank you for joining the [App Name]!',
        text : 'This message is to notify you that you have successfully registered your account in [App Name] using this email.'
    };

    transporter.sendMail(mailOptions)

    .then((res)=>{
        console.log('Email sent: ' + res.response);
    })
    .catch((err)=> {
        console.log(err);
    })
}

module.exports = SendEmail();