const CategoryModel = require("../models/categoryModel");
const CategoryController = ()=>{
  const getAllCategories = async (req, res) => {
    try {
      const categories = await CategoryModel.find({});
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  
  const addNewCategories = async (req, res) => {
    const { title } = req.body;
    try {
      if (title) {
        const newCategory = new CategoryModel({ title });
         await newCategory.save();
        return res.status(200).json({ message: "Category added successfully" });
      } else {
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  return {
    addNewCategories,
    getAllCategories
  }
}


module.exports = CategoryController;