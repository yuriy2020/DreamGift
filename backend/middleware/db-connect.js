const mongoose = require("mongoose");
mongoose.connect(
  // "mongodb://localhost:27017/dreamgift"
  "mongodb+srv://dreamgift:dreamgift@cluster0-9ukrl.azure.mongodb.net/DreamGift?retryWrites=true&w=majority"
  , {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection;