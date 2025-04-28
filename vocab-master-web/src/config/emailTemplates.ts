const templates = {
  verification: {
    subject: "Vocab Master Email Verification", // Subject line
    text: "This is a test email sent from Node.js", // Plain text body
    title: "Email Verification",
    html: `
      <h1>Hello! #NAME#</h1>
      <p>Thank you for signing up to Vocab Master account. Please verify your email address by clicking the button below:</p>
      <a href="#LINK#" class="email-button">Verify Email</a>
      <p>If you did not sign up for this account, please ignore this email.</p>
    `,
  },
  forgotPassword: {
    subject: "Vocab Master Reset Password", // Subject line
    text: "This is a test email sent from Node.js", // Plain text body
    title: "Reset Password",
    html: `
      <h1>Hello! #NAME#</h1>
      <p>You recently requested to reset the password for your #BRAND# account. Click the button below to proceed.</p>
      <a href="#LINK#" class="email-button">Reset Password</a>
      <p>If you did not request a password reset, please ignore this email.</p>`,
  },
};

export default templates;
