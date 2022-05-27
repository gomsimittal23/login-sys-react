import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Signin from './components/Signin/Signin';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/signin' exact element={<Signin/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;