require('dotenv').config()
const path = require('path');
const fs = require('fs');

const emailFilename = process.argv[2];
const MAILGUN_API = process.env.MAILGUN_API;
const domain = 'mg.fairway321.com';

templatePath = path.join(__dirname, 'dist', emailFilename + '.html');
const emailContent = fs.readFileSync(templatePath).toString();

const mailgun = require('mailgun-js')({apiKey: MAILGUN_API, domain: domain});

let data = {
  from: 'Robert Kanyur <robert@fairway321.com>',
  to: '9rx33xgd@gmail.com',
  subject: 'mailgun test v1',
  html: emailContent
}

mailgun.messages().send(data, function(error, body){
  console.log(body);
});
