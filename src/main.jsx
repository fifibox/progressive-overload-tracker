import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import WorkoutForm from './components/WorkoutForm.jsx';

import './styles/index.css';
import { RouterProvider } from 'react-router';
import router from './router.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
  );