const templates = {
  verification: {
    subject: "Vocab Master Email Verification", // Subject line
    text: "This is a test email sent from Node.js", // Plain text body
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      color: #333;
      text-align:center;
    }
    .email-container {
      max-width: 600px;
      margin: 30px auto;
      background: #ffffff !important;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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
      padding: 40px;
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
      padding: 20px;
      font-size: 12px;
      color: #777;
    }
    .email-footer a {
      color: #4CAF50;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      Verify Your Email
    </div>
    <div class="email-body">
      <h1>Hello! #NAME#</h1>
      <p>Thank you for signing up to Vocab Master account. Please verify your email address by clicking the button below:</p>
      <a href="#LINK#" class="email-button">Verify Email</a>
      <p>If you did not sign up for this account, please ignore this email.</p>
    </div>
    <div class="email-footer">
      <p>&copy; 2025 Vocab Master. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`,
  },
};

export default templates;
