const authModel = require("../models/authModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthController = () =>{
  const userRegistration = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      if (username && email && password) {
        const isUser = await authModel.findOne({ email });
        if (!isUser) {
          const salt = await bcryptjs.genSalt(10);
          const hashedPassword = await bcryptjs.hash(password, salt);
   
          const newUser = new authModel({
            username,
            email,
            password: hashedPassword,
          });
  
          await newUser.save();
          return res.status(200).json({ message: "User registered successfully" });
        } else {
          return res.status(400).json({ message: "Email already exists" });
        }
      } else {
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const user = await authModel.findOne({ email });
        if (user) {
          const isMatch = await bcryptjs.compare(password, user.password);
          if (isMatch) {
            const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
              expiresIn: "2d",
            });
            return res.status(200).json({
              message: "Login Successfully",
              token,
              name: user.username,
            });
          } else {
            return res.status(400).json({ message: "Wrong credentials" });
          }
        } else {
          return res.status(400).json({ message: "Email not registered" });
        }
      } else {
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
 return  {
  userLogin,
  userRegistration
 }
}

module.exports = AuthController;