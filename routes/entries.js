const express = require('express');
const router = express.Router();
const entries = require('../models/entriesmodels');

// Câu 1
router.get('/list', async (req, res) => {
  const { nationality, date } = req.query;

  try {
    
    const results = await entries .find({
      nationality: nationality,
      date: { $gte: parseInt(date) }, 
    });

  
    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error(error); // In lỗi ra console
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
});

module.exports = router;
