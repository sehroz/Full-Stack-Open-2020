import React from "react";
import "./message.css";

const Msg = ({ msg }) => {
  if (msg === null) {
    return null;
  }

  return <div className="msg success">{msg}</div>;
};

export default Msg;
