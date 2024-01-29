import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './styles/Reset.css';
import './styles/App.css';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  return (
    <>
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </Router>
    </>
  );
}

export default App;


// fetchData = () => {
//   axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
//   .then((response) => {
//     // handle success
//     console.log(response.data) // The entire response from the Rails API

//     console.log(response.data.message) // Just the message
//     this.setState({
//       message: response.data.message
//     });
//   }) 
// }