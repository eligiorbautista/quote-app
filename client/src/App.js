import './App.css';
// import { useState } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div>
      
      <BrowserRouter>

        <Routes>
          <Route path='/' exact Component={Login}/> 
          <Route path='/register' exact Component={Register}/> 
          <Route path='/dashboard' exact Component={Dashboard}/> 
        </Routes>

      </BrowserRouter>
    
    </div>
  );
}

export default App;
