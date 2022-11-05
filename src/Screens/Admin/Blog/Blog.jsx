import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBlog, deleteBlog } from "../../../Api/adminBlog.api";
import Button from "../../../Components/Button/Button";
import RowItem from "../../../Components/RowItem/RowItem";
import { getAllBlogs } from "../../../redux/blogsSlice";

const Blog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { blogs, loading } = useSelector((state) => state.blogs);
    useEffect(() => {
        if (!blogs) {
            dispatch(getAllBlogs());
        }
    }, []);

    const handleNewBlog = async () => {
        createBlog().then((id) => {
            dispatch(getAllBlogs());
            navigate("/admin/blog/" + id);
        });
    };
    return (
        <div className="admin-blog-wrapper">
            <Button onClick={handleNewBlog}>New blog</Button>
            <Button loading={loading} onClick={() => dispatch(getAllBlogs())}>
                Refresh
            </Button>
            <div>
                {blogs &&
                    blogs.map((b) => {
                        return (
                            <RowItem
                                key={"admin-blog-item-" + b.id}
                                {...b}
                                show={["id", "title", "created_at"]}
                                options={[
                                    <Button onClick={() => navigate("/admin/blog/" + b.id)}>View</Button>,
                                    <Button
                                        onClick={() => {
                                            deleteBlog(b.id).then(()=>{
                                                dispatch(getAllBlogs());
                                            })
                                        }}
                                    >
                                        Delete
                                    </Button>,
                                ]}
                            />
                        );
                    })}
            </div>
        </div>
    );
};
export default Blog;
