import { useEffect, useState } from "react";

export default function Postx() {
  const [error, setError] = useState(null);
  const [isLoaded, setisLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    fetch("/posts", { method: "GET" })
      .then((response) => response.json())
      .then(
        (result) => {
          setisLoaded(true);
          console.log(result);
          setPostList(result);
        },
        (error) => {
          console.log(error);
          setisLoaded(true);
          setError(error);
        }
      );
  }, []);
  if (error) {
    return <div>Error</div>;
  } else {
    return (
      <ul>
        {postList.map(({ title, content }) => (
          <li>{title + "  " + content}</li>
        ))}
      </ul>
    );
  }
}
