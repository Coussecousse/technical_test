import { useEffect, useState } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import { Routes, Route } from 'react-router-dom';

import paths from './config/paths';

import Home from './containers/Home/Home';
import GetTicket from './containers/GetTicket/GetTicket';
import SeeParking from './containers/SeeParking/SeeParking';
import LeaveParking from './containers/LeaveParking/LeaveParking';


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
      <Layout>
        <Routes>
          <Route path={paths.HOME} element={<Home></Home>}></Route>
          <Route path={paths.GET_TICKET} element={<GetTicket></GetTicket>}></Route>
          <Route path={paths.SEE_PARKING} element={<SeeParking></SeeParking>}></Route>
          <Route path={paths.LEAVE_PARKING} element={<LeaveParking></LeaveParking>}></Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
