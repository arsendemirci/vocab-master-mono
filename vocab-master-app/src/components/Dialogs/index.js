import Account from "./Account/Account.jsx";

const dialogComponents = {
  ACCOUNT: Account,
};

const dialog = Object.keys(dialogComponents).reduce(function (previous, key) {
  return { ...previous, [key]: key };
}, {});

export { dialogComponents, dialog };
