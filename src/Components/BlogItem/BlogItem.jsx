import React from "react";
import { useNavigate } from "react-router-dom";

const BlogItem=({blog})=>{
    const navigate = useNavigate()
    const handleNavigate=()=>{
        navigate(`/blog/${blog.id}`)
    }
    return <div className="blog-item-wrapper" onClick={handleNavigate}>
        <h3>{blog?.title}</h3>
        <img alt='' src={`${process.env.REACT_APP_STORAGE}/images/blog/cover/${blog?.cover}`}/>
    </div>
}
export default BlogItem