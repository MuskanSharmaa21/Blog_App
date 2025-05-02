
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (res) {
      console.log("MongoDB connected");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

module.exports = connectDB;
