import React from 'react';
import ReactDOM from 'react-dom/client'; // Обновленный импорт
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Создание корневого элемента
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);