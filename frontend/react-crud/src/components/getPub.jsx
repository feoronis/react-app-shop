import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from './../services/apiClient';
import Header from './header';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null); 
  const [message, setMessage] = useState(''); 

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const api = new apiClient();
  const fetchProduct = async () => {
    try {
      
      const response = await api.getById(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(id);
      setMessage('Товар удален!');

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('Error deleting product', error);
      setMessage('Произошла ошибка, попробуйте еще раз');
    }
  };

  if (!product) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Детали</h1>
        
        {message && <div className="alert alert-info">{message}</div>}

        <div className="card mb-4">
          <img src={`http://localhost:3000/storage/${product.pathP}`} className="card-img-top" alt={product.name} />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">Price: ${product.price}</p>
            <p className="card-text">{product.description}</p>
            <button className="btn btn-danger" onClick={handleDelete}>
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
