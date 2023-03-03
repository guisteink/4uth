const mongoose = require('mongoose');

const url = 'mongodb+srv://admin:Th3m@mb@@4uth.9fbuvlh.mongodb.net/?retryWrites=true&w=majority';

export async function connect(){
  try {
    await mongoose.connect(url,
      { useUnifiedTopology: true },
      { useNewUrlParser: true}
    );
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error("Error connecting to mongodb");
    console.error(error);
  }
}
