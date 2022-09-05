import React from "react";

export default function RegisterAlert(props) {
  const { infoMessage, type, header } = props;
  return (
    <div className={`alert alert-${type}`} role="alert">
      <h4 className="alert-heading">{header}</h4>
      <p>{infoMessage}</p>
      <p className="mb-0"></p>
    </div>
  );
}
