import React, { useState } from 'react';
import apiClient from './../services/apiClient';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './header';

const AddProductPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image);
    
    const api = new apiClient();
    try {
      
      const response = await api.create(formData);

      setMessage('Товар добавлен!');
      
      setName('');
      setPrice('');
      setDescription('');
      setImage(null);

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      setMessage('Произошла ошибка, попробуйте еще раз');
      console.error('error added product', error);
    }
  };

  return (
    <div>

      <Header />
      <div className="container">
        <h1>Add New Product</h1>

        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Цена</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Описание</label>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Изображение карточки</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Добавить
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
