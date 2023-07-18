"use strict";


import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from 'react-router-dom';
import Browse from './pages/Browse.jsx';
import Layout from './pages/Layout.jsx';
import './App.css'
import BuildRoutine from './pages/BuildRoutine.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<BuildRoutine />} />
      <Route path="/browse" element={<Browse />} />
    </Route>
  )
);


function App() {

  // A proxy server is setup in the vit.config file so that all calls with a prefix  is sent to the backend server.

  return (
    <div>
      <RouterProvider router={router} />
    </div >

  );
}

export default App