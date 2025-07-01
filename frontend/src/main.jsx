import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Habit from "./pages/Habit.jsx";
import NotFound from "./pages/NotFound.jsx"

import './index.css';
import ComingSoon from "./pages/ComingSoon.jsx";

const isProduction = import.meta.env.VITE_IS_PRODUCTION;

const router = createBrowserRouter([
  {
    path: '/',
    element: <ComingSoon />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: 'habit',
    element: <Habit />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {isProduction ? <RouterProvider router={router} /> : <ComingSoon />}
  </React.StrictMode>
);