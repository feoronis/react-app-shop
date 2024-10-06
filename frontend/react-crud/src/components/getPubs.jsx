import React, { useState, useEffect } from 'react';
import apiClient from './../services/apiClient';
import { Link } from 'react-router-dom';
import Header from './header';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const api = new apiClient();

  const fetchProducts = async () => {
    try {
      const response = await api.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(id);

      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  return (
    <div>

      <Header />
      <div className="container">
        <h1>Products</h1>
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4" key={product._id}>
              
                <div className="card mb-4">
                  <Link to={`/publications/${product._id}`}>
                    
                    <img src={`http://localhost:3000/storage/${product.pathP}`} className="card-img-top" alt={product.name} />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">${product.price}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(product._id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
