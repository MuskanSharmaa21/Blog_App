require('dotenv').config();
const express = require ("express");
const connectDB = require ("./config/db.js");
const authRoutes = require ("./routes/authRoutes.js");
const blogRoutes = require ("./routes/blog.js");

const app = express();
const cors = require("cors");
app.use(cors());
const PORT = 8000;

connectDB();


app.use(express.json());
app.use(express.static("public/upload"))

app.use("/api/v1", authRoutes);
app.use("/api/v1", blogRoutes);



app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
