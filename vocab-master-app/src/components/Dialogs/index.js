import Account from "./Account/Account.jsx";
import Error from "./Error/Error.jsx";

const dialogComponents = {
  ACCOUNT: Account,
  ERROR: Error,
};

const dialog = Object.keys(dialogComponents).reduce(function (previous, key) {
  return { ...previous, [key]: key };
}, {});
console.log("dialogs", dialog, dialogComponents);
export { dialogComponents, dialog };
