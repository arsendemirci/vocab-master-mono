const nodemailer = require("nodemailer");

export default class {
  transport = {
    service: "Gmail",
    auth: {
      user: process.env.SMTP_EMAIL_TO,
      pass: "siap emen baql hqtx",
    },
  };
  transporter;
  baseTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>#TITLE#</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .email-container {
      max-width: 600px;
      margin: 30px auto;
      background: #ffffff !important;
      border-radius: 8px;
      overflow: hidden;
      border:1px solid gray;
    }
    .email-header {
      background-color: #116286;
      color: #ffffff !important;
      text-align: center;
      padding: 20px;
      font-size: 24px;
      font-weight: bold;
    }
    .email-body {
      padding: 5px 30px;
      line-height: 1.6;
      
    }
    .email-body h1 {
      font-size: 20px;
      color: #4CAF50;
    }
    .email-body *{
     margin-bottom:35px
     }
    .email-body p{
    color:black !important;
    }
    .email-button {
      display: block;
      width: 200px;
      margin: 20px auto;
      text-align: center;
      padding: 10px 15px;
      background-color: #116286;
      color: #ffffff !important;
      text-decoration: none;
      font-size: 16px;
      border-radius: 5px;
    }
    .email-button:hover {
      background-color: #3f83a0;
    }
    .email-footer {
      text-align: center;
      padding: 8px;
      font-size: 12px;
      color: #777;
      border-top: 1px solid gray;
    }
    .email-footer a {
      color: #4CAF50;
      text-decoration: none;
    }
    .email-container img{
        margin:20px auto;
        width:200px;
        display:block;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      #TITLE#
    </div>
    <img src="https://i.ibb.co/4pztV1G/vm-logo.png" alt="vm-logo" border="0">
    <div class="email-body">
      #BODY#
    </div>
    <div class="email-footer">
      <p>&copy; 2025 Vocab Master. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
  constructor(to, template, params) {
    this.transporter = nodemailer.createTransport(this.transport);
    this.send(to, template, params);
  }
  send(to, template, params) {
    let mailHtml = this.baseTemplate
      .replace(new RegExp(`#BODY#`, "g"), template.html)
      .replace(new RegExp(`#TITLE#`, "g"), template.title);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        mailHtml = mailHtml.replace(new RegExp(`#${key}#`, "g"), String(value));
      });
    }
    const mailOptions = {
      ...template,
      html: mailHtml,
      to,
      from: { name: "Vocab Master", address: process.env.SMTP_EMAIL_TO },
    };
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log("Error:", error);
      }
      console.log("Message sent:", info.messageId);
    });
  }
}
