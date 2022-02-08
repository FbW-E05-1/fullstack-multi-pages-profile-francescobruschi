const nodemailer = require('nodemailer');
require('dotenv').config();

// create transporter object to contains email host
const transporter = nodemailer.createTransport({
  service: 'gmail',
auth: {
user: process.env.APP_EMAIL,
pass: process.env.APP_EMAIL_PASSWORD
},
tls: {
rejectUnauthorized: false
}
});

function sendMail(emailData){
  return new Promise((resolve, reject)=>{
const mailOptions = {
  from: process.env.APP_EMAIL,
  to: process.env.CONTACT_EMAIL,
  subject: 'Email from your website',
  html:
  `<h1>email from contact page</h1>
  <p><strong>Name:</strong> ${emailData.name} </p>
  <p><strong>email:</strong> ${emailData.email} </p>
  <p><strong>subject:</strong> ${emailData.subject} </p>
  <p>${emailData.message} </p>
  `
}
transporter.sendMail(mailOptions, (err, info)=>{
  console.log(info);
  if(err){
  reject ({result: 'error', error: err});
  }else{
 resolve ({result: 'done', info: info})
  }
  })
})   }
module.exports = {sendMail};