var express = require('express');
var cors = require('cors'); // Подключаем cors
var router = express.Router();

var app = express();

// Разрешаем запросы с фронтенда (localhost:5173)
app.use(cors({
  origin: 'http://localhost:5173', // Разрешить только фронтенду на 5173
  methods: 'GET,POST', // Разрешить только GET и POST запросы (можно добавить другие методы)
  allowedHeaders: 'Content-Type, Authorization' // Разрешить определённые заголовки
}));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

app.use('/api/users', router); // Подключаем роутер

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
