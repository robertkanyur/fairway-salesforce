require('dotenv').config()
const path = require('path');
const fs = require('fs');

const MAILGUN_API = process.env.MAILGUN_API;
const domain = 'mg.fairway321.com';

for (i = 2; i < (process.argv.length); i++) {

  let emailFilename = process.argv[i];

  templatePath = path.join(__dirname, 'dist', emailFilename + '.html');
  const emailContent = fs.readFileSync(templatePath).toString();

  const mailgun = require('mailgun-js')({apiKey: MAILGUN_API, domain: domain});

  function generateData(){
    return({
      from: 'Robert Kanyur <robert@fairway321.com>',
      to: '9rx33xgd@gmail.com',
      subject: emailFilename + ' ' + Date.now(),
      html: emailContent
    })
  };

  let data = generateData();

  mailgun.messages().send(data, function(error, body){
    console.log(body);
  })
};
