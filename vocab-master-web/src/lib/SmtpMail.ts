const nodemailer = require("nodemailer");

export default class {
  options: { any };
  transport = {
    service: "Gmail",
    auth: {
      user: process.env.SMTP_EMAIL_TO,
      pass: "siap emen baql hqtx",
    },
  };
  transporter;
  constructor(to, template, params) {
    this.transporter = nodemailer.createTransport(this.transport);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        template.html = template.html.replace(
          new RegExp(`#${key}#`, "g"),
          value
        );
      });
    }
    this.options = {
      ...template,
      to,
      from: { name: "Vocab Master", address: process.env.SMTP_EMAIL_TO },
    };
  }
  send() {
    this.transporter.sendMail(this.options, (error, info) => {
      if (error) {
        return console.log("Error:", error);
      }
      console.log("Message sent:", info.messageId);
    });
  }
}
