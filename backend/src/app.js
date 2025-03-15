const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const db = require('./config/db');

app.use(cors());  // Разрешаем запросы с разных источников
app.use(express.json());  // Для парсинга JSON в теле запросов
app.use('/api/users', authMiddleware, userRoutes);  // Подключаем маршруты и middleware

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
