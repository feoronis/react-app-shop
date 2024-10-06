import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductsPage from './components/getPubs';
import ProductDetailPage from './components/getPub';
import AddProduct from './components/addPub';
import Parni from './components/parni';
import Delivery from './components/deliveryOzon';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsPage />} /> 
        <Route path="/publications/:id" element={<ProductDetailPage />} /> 
        <Route path="/create" element={<AddProduct />} />
        <Route path="/parni" element={<Parni />} />
        <Route path="/ozon" element={<Delivery />} />

      </Routes>
    </Router>
  );
}

export default App;