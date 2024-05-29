import React from "react";

function Error({ message }) {
  console.log("error component message", message);
  return (
    <div>
      <div>This is General error modal</div>

      <div>{message}</div>
    </div>
  );
}

export default Error;
