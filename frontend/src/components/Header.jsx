import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const handleLogout =() =>{
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  }
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold">Blog App</Link>

        <ul className="flex items-center gap-6">
          <li>
            <Link to="/add/blog" className="hover:text-gray-300">Add Blog</Link>
          </li>
          <li>
            <Link to="/add/categories" className="hover:text-gray-300">Add Category</Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          {token !== null ? (
            <>
              <button className="bg-white text-blue-600 font-semibold px-4 py-1 rounded hover:bg-gray-100">
                Welcome: {username}
              </button>
              <button
                className="bg-white text-blue-600 font-semibold px-4 py-1 rounded hover:bg-gray-100"
                onClick= {handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-white text-blue-600 font-semibold px-4 py-1 rounded hover:bg-gray-100">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-white text-blue-600 font-semibold px-4 py-1 rounded hover:bg-gray-100">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;