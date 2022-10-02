import React from "react";
import "./RegisterAlert.scss";
export default function RegisterAlert(props) {
    const { infoMessage, type, header, key } = props;
    return (
        <div
            key={key}
            className={`register-alert alert alert-${type}`}
            role="alert"
        >
            <h4 className="alert-heading">{header}</h4>
            <p>{infoMessage}</p>
            <p className="mb-0"></p>
        </div>
    );
}
