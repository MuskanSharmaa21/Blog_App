const express = require ("express");
const checkIUserAuthenticated = require ("../middleware/authMiddleware");
const CategoryController = require( "../controllers/categoryController");
const AuthController= require ("../controllers/authControllers");
const BlogController= require ("../controllers/blogController");
const router = express.Router();
const multer = require ("multer");
const Storage = multer.diskStorage ({
  destination :function (req, file,cb){
    cb(null, `public/upload`)
  },
   filename: function(req , file, cb) {
    cb(null , `${Date.now()} - ${file.originalname}`)
  }
 });
const upload = multer({ storage:Storage });


const authController = AuthController();
const blogController = BlogController();
const categoryController = CategoryController();

router.post("/user/register", authController.userRegistration);
router.post("/user/login", authController.userLogin);

router.get("/get/allblogs", checkIUserAuthenticated, blogController.getAllBlogs);
router.post("/add/blog", checkIUserAuthenticated, upload.single("thumbnail"), blogController.addNewBlog);
router.get("/get/blog/:id", checkIUserAuthenticated, blogController.getSingleBlog);

router.get("/get/categories", checkIUserAuthenticated, categoryController.getAllCategories);
router.post("/add/categories", checkIUserAuthenticated, categoryController.addNewCategories);

module.exports =  router;