// config/db.js
const mongoose = require('mongoose');

// MongoDB connection function
const connectDB = async () => {
  try {
    // Update the URI to connect to the local MongoDB instance
    await mongoose.connect('mongodb+srv://Demo_db:HrJ9fHIP5PtKtHIc@cluster0.wu8eb.mongodb.net/collage?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);  // Exit process with failure
  }
};

module.exports = connectDB;
