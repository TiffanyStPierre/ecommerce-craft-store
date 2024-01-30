import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import NavBar from './components/Header';
import Footer from './components/Footer';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <>
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/products/:category' element={<ProductList />} />
        <Route path='/admin' element={<AdminDashboard />} />
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