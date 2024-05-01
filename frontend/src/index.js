import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import Home from './pages/Home';
import Chats from './pages/Chats';

const router = createBrowserRouter([
  {
    path:"/",
    children:[
      {index:true , element : <Home/>},
      {path:"/chats" , element : <Chats/>},
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <ChakraProvider>
    <App />
    </ChakraProvider>
  </React.StrictMode>
);
