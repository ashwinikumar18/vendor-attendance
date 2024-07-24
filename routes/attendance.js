const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// Submit attendance
router.post('/submit', async (req, res) => {
  try {
    const { date, department, attendanceData } = req.body;
    const attendanceRecords = attendanceData.map(record => ({
      date: new Date(date),
      department,
      vendorId: record.vendorId,
      present: record.present,
    }));

    await Attendance.insertMany(attendanceRecords);
    res.status(201).json({ message: 'Attendance submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting attendance', error: error.message });
  }
});

// Fetch attendance
router.get('/fetch', async (req, res) => {
  try {
    const { date, department } = req.query;
    const attendance = await Attendance.find({
      date: new Date(date),
      department,
    });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance', error: error.message });
  }
});

module.exports = router;