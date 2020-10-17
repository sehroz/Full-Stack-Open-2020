import React from "react";
import "./message.css";

const Msg = ({ msg }) => {
  if (msg === null) {
    return null;
  }
  if (msg.type === "success") {
    return <div className="msg success">{msg.msg}</div>;
  }
  if (msg.type === "fail") {
    return <div className="msg fail">{msg.msg}</div>;
  }
  return null;
};

export default Msg;
