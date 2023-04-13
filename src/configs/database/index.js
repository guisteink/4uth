const mongoose = require("mongoose");

const connectToMongodb = (url) => {
  try {
    mongoose.connect(
      url,
      { useUnifiedTopology: true },
      { useNewUrlParser: true }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to mongodb: ", error);
  }
};
module.exports = { connectToMongodb };
