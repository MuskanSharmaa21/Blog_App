import React from "react"; 
import Register from "./pages/Register";
import {Route , Routes} from "react-router-dom"
import Home from "./components/Home";
import Header from "./components/Header";
import AddBlog from "./pages/AddBlog";
import Login from "./pages/Login";
import ProtectedRoute from "./services/ProtectedRoutes";
import AddCategory from "./pages/AddCategory";
import SingleBlog from "./pages/SingleBlog";
const App = () => {
  return (
    <>
     <Header />
     <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/" element={<ProtectedRoute/>}> 
        <Route path="/" element={<Home />} />
        <Route path="/add/blog" element={<AddBlog/>} />
        <Route path="/add/categories" element={<AddCategory/>} />
        <Route path="/blog/:id" element={<SingleBlog/>} />
      </Route>
     </Routes>
    </>
  );
};

export default App;
