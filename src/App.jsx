import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import {AuthProvider} from './Context/AuthContext'
import Header from './components/Header/Header';
import Routes from './Routes/Routes';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Router>
        <Header/>
        <Routes/>
      </Router>
      </AuthProvider>
    </div>
  );
}
export default App;


