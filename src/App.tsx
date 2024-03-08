import "./App.css";
import { useEffect, useState } from "react";

import AddReleaseForm from "./Components/AddReleaseForm";

// Note: "interface" generally seems to be recommended over (bog-standard)
// object "type ... { ... }".
// (https://www.executeprogram.com/courses/everyday-typescript/lessons/interfaces)
// Todo: Is there good practice re keeping types appropriately up-to-date
// between front and back end? (Is it actually useful to *not* have this be
// automated in any way?)
interface Release {
  id: number;
  title: string;
  artist: string;
  created_at: string;
}

function App() {
  const [message, setMessage] = useState("Default text");
  const [data, setData] = useState<Array<Release> | null>(null);
  const [dataChanged, setDataChanged] = useState<Boolean>(false);

  useEffect(() => {
    const url = "http://localhost:8000/";

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

        setMessage(response.message);

        // False delay:
        // return setTimeout(() => setMessage(response.message), 1500);
      });
  });

  // Get data about all releases
  useEffect(() => {
    const API_URL = "http://localhost:8000/releases";

    async function fetchData() {
      const api_response = await fetch(API_URL);

      // console.log("api_response", api_response);
      // Todo: try/catch stuff here

      if (api_response.ok == true) {
        const json_response = await api_response.json();
        // console.log("json_response", json_response);

        const fetchedData = await json_response;
        // console.log(fetchedData, fetchedData.length);

        // This test shouldn't be necessary:
        if (fetchedData.length != 0) {
          setData(fetchedData);
        }
        // False delay:
        // setTimeout(async () => setData(await json_response), 1000);

        // Feels wrong to update state that this effect depends on from within
        // the effect, but apparently no infinite loop :¬P
        setDataChanged(false);
      }
    }

    fetchData();
  }, [dataChanged]);

  return (
    <>
      <h1>{message}</h1>
      {data != null && (
        <>
          {data.map((obj) => (
            <pre key={obj.id}>
              ID: {obj.id}
              <br />
              Artist: {obj.artist}
              <br />
              Title: {obj.title}
              <br />
              Created: {obj.created_at}
            </pre>
          ))}
        </>
      )}
      <AddReleaseForm setDataChanged={setDataChanged} />
    </>
  );
}

export default App;
