const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Định nghĩa schema cho Person
const personSchema = new schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

// Tạo model từ schema
const Person = mongoose.model('entries', entriesSchema);

module.exports = entries;
