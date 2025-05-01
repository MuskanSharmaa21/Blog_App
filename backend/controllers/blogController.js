const blogModel = require ("../models/blogModel");

const BlogController= ()=>{
  const getAllBlogs = async(req , res) =>{
    try {
      const fetchAllBlogs = await  blogModel.find({user : req.user._id});
      return res.status(200).json(fetchAllBlogs);
    }
    catch(error) {
      return res.status(400).json({message:error.message});
    }
  }
  const addNewBlog = async(req , res) =>{
    const { title,category,description } = req.body;
    try {
     if ( title && description && category ){
      const addBlog = new blogModel ({
        title : title,
        description : description,
        category : category,
        thumbnail : req.file.filename,
        user : req.user._id
      });
      const savedBlog = await addBlog.save();
      if (savedBlog) {
        return res.status(200).json({message : "Blog added Successfully"});
      } 
     } else {
      return res.status(400).json({message:"All fields are required"});
     }
    } catch (error) {
      return res.status(400).json({ message : error.message})
    }
  }
  const getSingleBlog = async(req, res) =>{
    const { id } = req.params;
    try {
      if (id) {
        const fetchBlogsById = await blogModel.findById(id);
        return res.status(200).json(fetchBlogsById);
      } else {
        return res.status(400).json({message:"Invalid URL"});
      }
    } catch (error) {
      return res.status(400).json({ message : error.message})
    }
  }
  return {
    getAllBlogs,
    getSingleBlog,
    addNewBlog
  }
}

  

module.exports =  BlogController;