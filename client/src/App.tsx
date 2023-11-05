import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface TestData {
  message: string
}

function App() {

  const [ data, setData ] = useState< string | undefined>(undefined)

  useEffect(() => {
    fetch('/test')
    .then(res => res.json())
    .then((data : TestData) => setData(data.message))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {data ? data : "No data"}
        </p>
      </header>
    </div>
  );
}

export default App;
