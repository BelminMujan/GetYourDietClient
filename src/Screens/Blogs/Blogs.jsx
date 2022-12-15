import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogItem from "../../Components/BlogItem/BlogItem";
import Navbar from "../../Components/Navbar/Navbar";
import { getAllBlogs } from "../../redux/blogsSlice";

const Blogs =()=>{
    const dispatch = useDispatch()
    let { blogs, loading } = useSelector((state) => state.blogs);
    useEffect(() => {
        if (!blogs) {
            dispatch(getAllBlogs());
        }
    }, []);
    return <div className="blog-wrapper">
        <Navbar/>
        {blogs && blogs.map(blog=>{
            return <BlogItem blog={blog}/>
        })}
    </div>
}

export default Blogs