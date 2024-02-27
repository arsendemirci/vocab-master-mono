module.exports = {
  email: {
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
                        margin: 0;
                        padding: 0;
                        background-color: #f9f9f9;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                    }
                    .header h1 {
                        color: #333333;
                        font-size: 24px;
                        margin-bottom: 10px;
                    }
                    .content {
                        margin-bottom: 20px;
                        text-align: center;
                    }
                    .content p {
                        color: #666666;
                        font-size: 16px;
                        line-height: 1.5;
                        margin-bottom: 20px;
                    }
            
                    .footer {
                        text-align: center;
                        color: #999999;
                        font-size: 14px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Vocab Master Email Verification</h1>
                    </div>
                    <div class="content">
                        <p>Dear #NAME#,</p>
                        <p>Thank you for signing up. Please use this verification code to verify your email:</p>
                        <h3><strong>#CODE#</strong></h3>
                    </div>
                    <div class="footer">
                        <p>If you did not sign up for this account, you can ignore this email.</p>
                    </div>
                </div>
            </body>
            </html>`, // HTML body
    },
  },
};
