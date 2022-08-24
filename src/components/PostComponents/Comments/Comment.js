import React from "react";
export default function Comment(props) {
  return <div>{props.id + " " + props.comment}</div>;
}
