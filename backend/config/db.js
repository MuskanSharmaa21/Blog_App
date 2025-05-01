const mongoose = require ("mongoose");
const connectDB= async()=>{
  const res = await mongoose.connect(
    "mongodb+srv://Muskan:LhDd4xBp1NJYseqb@cluster0.5kuyb.mongodb.net/blog"
  );
  if (res){
    console.log("MongoDB connected");
  }
};
module.exports =  connectDB;