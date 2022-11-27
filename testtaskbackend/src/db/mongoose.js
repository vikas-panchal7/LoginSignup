const mongoose = require("mongoose");
const url = process.env.MONGODB;
mongoose.connect(url, {
  useNewUrlParser: true,
});
