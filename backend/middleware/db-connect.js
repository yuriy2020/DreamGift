const mongoose = require("mongoose");
mongoose.connect(
  // "mongodb://localhost:27017/dreamgift"
  process.env.DB_USER
  , {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection;