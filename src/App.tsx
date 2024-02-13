import "./App.css";
import { useEffect, useState } from "react";

// Todo: add types where necessary/recommended

function App() {
  const [message, setMessage] = useState("Default text");

  useEffect(() => {
    const url = "http://127.0.0.1:8000/";

    fetch(url)
      .then((response) => {
        // console.log("response, ", response);

        return response.json();

        // Todo: work out why the false delay doesn't work here (probably
        // something to do with returning the setTimeout rather than the
        // resolved promise?)
        // return setTimeout(() => response.json(), 1000);
      })
      .then((response) => {
        // console.log("response, ", response);

        // setMessage(response.message);

        // False delay:
        return setTimeout(() => setMessage(response.message), 1500);
      });
  });

  return (
    <>
      <h1>{message}</h1>
    </>
  );
}

export default App;
