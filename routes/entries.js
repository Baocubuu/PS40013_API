const express = require('express');
const router = express.Router();
const entries = require('../models/entriesmodels'); // Đường dẫn model

// Định nghĩa route
router.get('/list', async (req, res) => {
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

module.exports = router;
