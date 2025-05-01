import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/get/categories", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCategories(res.data);
      } catch (error) {
        toast.error("Failed to fetch categories");
      }
    };
    fetchAllCategories();
  }, []);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("category", input.category);
    formData.append("description", input.description);
    formData.append("thumbnail", file);

    try {
      const res = await axios.post("http://localhost:8000/api/v1/add/blog", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(res.data.message);
      navigate("/"); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add blog");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 shadow-xl rounded-2xl bg-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">Add Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={input.title}
            onChange={handleChange}
            placeholder="Enter Title"
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={input.category}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={input.description}
            onChange={handleChange}
            placeholder="Blog Description"
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            rows="4"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;