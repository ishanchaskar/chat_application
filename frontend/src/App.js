import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chats from './pages/Chats';
import ChatProvider from "./Context/ChatProvider"
const App = () => {
  return (
    <ChatProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<Chats />} />
      </Routes>
    </BrowserRouter>
    </ChatProvider>
  );
};

export default App;
