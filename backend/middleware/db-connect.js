const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://dreamgift:dreamgift@cluster0-9ukrl.azure.mongodb.net/<dbname>?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection;
