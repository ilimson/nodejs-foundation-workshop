import React, { useState, useEffect } from 'react';
import socketIoClient from 'socket.io-client';
import DataTable from './DataTable';

const ENDPOINT = 'http://localhost:3000';

function App() {
    const [datasets, setDatasets] = useState([]);

    useEffect(() => {
      const socket = socketIoClient(ENDPOINT);
  
      socket.on('newData', (data) => {
          setDatasets(data);
      });
  
      return () => socket.disconnect();
  }, []);

    return (
        <div>
            <DataTable data={datasets} />
        </div>
    );
}

export default App;
