const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Модель для вопросов
const QuestionSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Question = mongoose.model('Question', QuestionSchema);

// Middleware
app.use(cors());
app.use(express.json());

// API для сохранения вопроса
app.post('/api/questions', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newQuestion = new Question({ name, email, message });
        await newQuestion.save();
        res.status(201).json({ message: 'Question submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

