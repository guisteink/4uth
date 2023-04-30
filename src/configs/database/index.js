const mongoose = require("mongoose");

const connectToMongodb = (url) => {
  try {
    mongoose.connect(
      url,
      { useUnifiedTopology: true },
      { useNewUrlParser: true }
    );
    console.log(`Connected to MongoDB\nurl: ${url}`);
  } catch (error) {
    console.error("Error connecting to mongodb: ", error);
  }
};

const disconnectToMongodb = async () => {
  try {
    console.log(`Closing connection from MongoDB`);
    await mongoose.connection.close();
  } catch (error) {
    console.error("Error closing connection to mongodb: ", error);
  }
};

module.exports = { connectToMongodb, disconnectToMongodb };
