import React,{useState,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import URL from "../services/AppConfig";


const SingleBlog =() =>{
  const {id} = useParams();
  const [blog,setBlog] = useState({});
  const navigate = useNavigate();
  useEffect (()=>{
    const fetchSingleBlog = async() =>{
      const res = await axios.get (
        `${URL}/api/v1/get/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBlog(res.data);
    }
    fetchSingleBlog();
  },[id]);
  return (
    <>
     <div className="container-shadow my-3">
      <div className="col-md-12 d-flex items-center justify-content-center bg-light">
        <div className="row">
          <h1 className="my3">{blog.title}</h1>
          <img src={`${URL}/${blog.thumbnail}`} className="img img-responsive img-rounded my-3"/>
          <p className="my-3">{blog.description}</p>

        </div>
      </div>
      <button className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" onClick={()=>navigate("/")}>Back To Post</button>
     </div>
    </>
  )
}
export default SingleBlog;