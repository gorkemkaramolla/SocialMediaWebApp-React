import React from "react";
import { useParams } from "react-router-dom";
export default function Writer() {
    const { writerId } = useParams();
    return <div>Writer id : {writerId}</div>;
}
