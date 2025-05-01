import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/get/allblogs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setBlogs(res.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error.message);
      }
    };
    fetchAllBlogs();
  }, []);

  return (
    <>
      <main className="my-10 px-4">
        <div className="max-w-6xl mx-auto">
          <section className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-6">Latest Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs && blogs.length > 0 ? (
                blogs.map((item) => (
                  <div key={item._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="relative group">
                      <img
                        src={`http://localhost:8000/${item.thumbnail}`}
                        alt="Post"
                        className="w-full h-48 object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h5 className="text-xl font-semibold mb-2">{item.title}</h5>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <Link
                        to={`/blog/${item._id}`}
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-3 text-gray-500">No blogs found.</p>
              )}
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-blue-700 text-white py-4 mt-20">
        <div className="text-center">
          <p>&copy; 2025 | <span className="font-semibold">Muskan</span></p>
        </div>
      </footer>
    </>
  );
};

export default Home;
