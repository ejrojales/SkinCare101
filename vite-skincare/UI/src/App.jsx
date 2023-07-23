"use strict";

import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from 'react-router-dom';
import { Browse, dataLoader } from './pages/Browse.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import { ProfilePage } from './pages/Profile.jsx';
import Layout from './pages/Layout.jsx';
import './App.css'
import BuildRoutine from './pages/BuildRoutine.jsx';
import CallbackPage from './pages/Callback.jsx';
import { AuthenticationGuard } from './components/Authentication-Guard.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<BuildRoutine />} />
      <Route path="/browse" element={<Browse />} loader={dataLoader} />
      <Route path="/profile" element={<AuthenticationGuard component={ProfilePage} />} />
      <Route path="/callback" element={<CallbackPage />} />
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