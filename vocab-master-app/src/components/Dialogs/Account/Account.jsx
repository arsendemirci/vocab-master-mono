import React, { useEffect, useState } from "react";
import Sign from "./Sign/Sign.jsx";
import VerifyCode from "./VerifyCode/VerifyCode.jsx";
import { useSelector, useDispatch } from "react-redux";

function Account() {
  const account = useSelector((state) => state.accountStore);

  return (
    <div>
      {account.activePanel === "verify" ? (
        <VerifyCode userId={account.registeredUserId} />
      ) : (
        <Sign />
      )}
    </div>
  );
}

export default Account;
