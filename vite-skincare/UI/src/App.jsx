"use strict";


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Browse from './pages/Browse.jsx';
import Layout from './pages/Layout.jsx';
import './App.css'
import BuildRoutine from './pages/BuildRoutine.jsx';




function App() {

  // A proxy server is setup in the vit.config file so that all calls with a prefix  is sent to the backend server.

  return (
    <div>
      <h1>Skin Care</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<BuildRoutine />} />
            <Route path='/browse' element={<Browse />} />
          </Route>
        </Routes>
      </Router >

    </div >

  );
}

export default App