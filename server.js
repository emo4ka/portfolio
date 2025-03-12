const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; connect-src 'self' http://localhost:3000");
    res.setHeader("Permissions-Policy", "");
    next();
});

app.use(cors());
app.use(bodyParser.json());

// Подключение к MongoDB (убедись, что MongoDB запущен)
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });


// Создание схемы и модели
const questionSchema = new mongoose.Schema({
    name: String,
    email: String,
    question: String,
    date: { type: Date, default: Date.now }
});

const Question = mongoose.model('Question', questionSchema);

// Маршрут для сохранения вопроса
app.post('/api/questions', async (req, res) => {
    console.log(req.body); // Выведет данные в консоль
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.json({ message: 'Your question has been saved!' });
});
app.use(express.static('public'));
// Запуск сервера
app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
