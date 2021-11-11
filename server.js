// https://www.npmjs.com/package/dotenv
const dotenv = require('dotenv');
// https://expressjs.com/ru/
const express = require('express');
// https://www.npmjs.com/package/morgan
const morgan = require('morgan');
// https://www.npmjs.com/package/cors
const cors = require('cors');

// Функция подключения к БД
const connectDB = require('./config/db.js');

// Загрузка переменный окружения
dotenv.config({ path: './config/config.env' });

// подключаемся к бд
connectDB();

// route files
const users = require('./routes/users.js');

const app = express();

// Получаем возможность брать данные из body
app.use(express.json());

//Включаем логгер в случае dev
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Enable CORS
app.use(cors());

// mount routes
app.use('/api/users', users);

const PORT = process.env.PORT || 3000;

// Запускаем сервер на порту
const server = app.listen(
  PORT,
  console.log(
    `Сервер запущен в режиме ${process.env.NODE_ENV} на порту ${PORT}`
  )
);
