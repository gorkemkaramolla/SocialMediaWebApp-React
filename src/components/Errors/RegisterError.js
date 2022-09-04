import React from "react";

export default function RegisterError(props) {
    const { errorMessage } = props;
    return (
        <div class="alert alert-danger" role="alert">
            <h4 class="alert-heading">Error Recieved!</h4>
            <p>{errorMessage}</p>
            <p class="mb-0"></p>
        </div>
    );
}
