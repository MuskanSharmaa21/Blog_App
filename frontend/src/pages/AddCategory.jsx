import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"; 
import URL from "../services/AppConfig";

const AddCategory = () => {
  const navigate = useNavigate();

  
  const [formData, setFormData] = useState({ title: "" });

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  const handleCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${URL}/api/v1/add/categories`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(res.data.message);
      navigate("/"); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add category");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 shadow-xl rounded-2xl bg-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">Add Category</h2>

      <form onSubmit={handleCategory} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category Name</label>
          <input
            type="text"
            name="title" 
            value={formData.title} 
            onChange={handleChange}
            placeholder="Enter a new Category"
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
