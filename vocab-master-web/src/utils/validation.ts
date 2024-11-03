export default {
  email: {
    required: "Please enter a valid email",
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Please enter a valid email",
    },
  },
  password: {
    required: "Please enter your password!",
  },
  name: {
    required: "Please enter your name!",
  },
  verificationCode: {
    required: "Please enter the valid code!",
    pattern: { value: /\b\d{5}\b/, message: "Please enter the valid code!" },
  },
};
