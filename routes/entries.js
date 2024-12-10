const express = require('express');
const router = express.Router();
const Entry = require('../models/entriesmodels'); // Import model

// API Bài 1: Lấy danh sách thông tin người nhập cảnh
router.get('/list', async (req, res) => {
  const { nationality, date } = req.query;

  try {
    // Kiểm tra đầu vào
    if (!nationality || !date) {
      return res.status(400).json({
        success: false,
        message: 'Missing query parameters: nationality or date',
      });
    }

    // Tìm kiếm danh sách theo điều kiện
    const results = await Entry.find({
      nationality: nationality,
      date: { $gte: parseInt(date) },
    });

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error('Error in /list:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
});

// API Bài 2 và Bài 3: Cập nhật số lần nhập cảnh
router.post('/update', async (req, res) => {
  const { id, date } = req.body;

  try {
    // Kiểm tra dữ liệu đầu vào
    if (!id || !date) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: id or date',
      });
    }

    // Kiểm tra giá trị `date` phải là số dương
    if (date <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Date must be a positive number',
      });
    }

    // Kiểm tra xem bản ghi tồn tại hay không
    const existingEntry = await Entry.findById(id);

    if (!existingEntry) {
      return res.status(404).json({
        success: false,
        message: 'Entry not found',
      });
    }

    // Kiểm tra nếu `date` nhỏ hơn hoặc bằng giá trị hiện tại
    if (date <= existingEntry.date) {
      return res.status(400).json({
        success: false,
        message: 'New date must be greater than the current date',
      });
    }

    // Cập nhật số lần nhập cảnh
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { date: date },
      { new: true } // Trả về dữ liệu sau khi cập nhật
    );

    res.status(200).json({
      success: true,
      message: 'Entry updated successfully',
      data: updatedEntry,
    });
  } catch (error) {
    console.error('Error in /update:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
});

module.exports = router;
