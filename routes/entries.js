const express = require('express');
const mongoose = require('mongoose');
const entries = require('./models/entriesmodels'); // Đường dẫn đến file model

const app = express();
const PORT = 3000;

// Kết nối MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/yourDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Câu 1
app.get('/list', async (req, res) => {
  const { nationality, date } = req.query;
  try {
    const people = await entries.find({
      nationality: nationality,
      entryCount: { $gte: parseInt(date) }, 
    });
    res.status(200).json({
      success: true,
      data: people,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
});