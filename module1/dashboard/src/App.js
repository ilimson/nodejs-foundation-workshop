import React, { useState, useEffect } from "react";
import socketIoClient from "socket.io-client";
import axios from "axios";
import DataTable from "./DataTable";

const ENDPOINT = "http://localhost:8000";

function App() {
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    // Axios GET request to fetch data from the /metrics endpoint
    axios
      .get(`${ENDPOINT}/metrics`)
      .then(({ data }) => {
        setDatasets(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // create web sockets connection and watch for data-update in realtime
    const socket = socketIoClient(ENDPOINT);
    socket.on("data-update", ({ data }) => {
      console.log("data-update", data);
      setDatasets(data);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      {console.log("datasets", datasets)}
      <DataTable data={datasets} />
    </div>
  );
}

export default App;
