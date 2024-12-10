const mongoose = require('mongoose');
const schema = mongoose.Schema;

const entriesSchema = new schema({
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

const entries = mongoose.model('entries', entriesSchema);

module.exports = entries;
