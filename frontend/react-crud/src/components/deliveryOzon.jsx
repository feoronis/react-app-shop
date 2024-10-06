import React, { useState } from 'react';
import apiClient from './../services/apiClient';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import Header from './header';

const DeliveryPage = () => {
    const [track, setTrack] = useState('');
    const [message, setMessage] = useState('');
    const [data, setData] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const api = new apiClient();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true); 
            const response = await api.getOzon(track);
            setData(response.items);
            setSuccess(true); 
        } catch (error) {
            setMessage('Произошла ошибка, попробуйте еще раз');
            console.error('error track ozon', error);
        } finally {
            setLoading(false); 
        }
  };

  return (
    <div>

      <Header />
      <div className="container">
        <h1>Проверка статуса вашей доставки</h1>

        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder='Ваш трек номер'
              value={track}
              onChange={(e) => setTrack(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Отследить
          </button>
        </form>

        <div>
            {loading && <p>Загрузка...</p>}
            {success && (
                <div>
                    {data.map((item) => {
                        <div>
                            <div>
                                <p>{item.status}</p>
                                <p>{moment(item.moment).format('DD.MM.YY, HH:mm')}</p>
                            </div>
                            <p>{item.description}</p>
                        </div>
                        
                        
                    })}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
