const mongoose = require("mongoose");

const connectToMongodb = (url) => {
  try {
    mongoose.connect(
      url,
      { useUnifiedTopology: true },
      { useNewUrlParser: true }
    );
  } catch (error) {
    console.error("Error connecting to mongodb: ", error);
  }
};

const disconnectToMongodb = async () => {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.error("Error closing connection to mongodb: ", error);
  }
};

module.exports = { connectToMongodb, disconnectToMongodb };
