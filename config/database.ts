const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/4uth';

mongoose.connect(url,
  { useUnifiedTopology: true },
  { useNewUrlParser: true}
);

module.exports = mongoose;
