import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import config from "../config";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const sendRequest = async () => {
    try {
      const res = await axios.get(
        `${config.BASE_URL}/api/blogs`
      );

      console.log("Blogs API Response:", res.data);

      return res.data;
    } catch (err) {
      console.error(
        "Blogs API Error:",
        err?.response?.data || err.message
      );

      return null;
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);

      const data = await sendRequest();

      // IMPORTANT:
      // Backend response = data.data.blogs
      if (data?.data?.blogs) {
        setBlogs(data.data.blogs);
        setError("");
      } else {
        setBlogs([]);
        setError("Unable to load blogs.");
      }

      setLoading(false);
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading blogs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <Blog
            key={blog._id}
            id={blog._id}
            isUser={
              localStorage.getItem("userId") ===
              blog.user?._id
            }
            title={blog.title}
            desc={blog.desc}
            img={blog.img}
            user={blog.user?.name}
            date={
              blog.date
                ? new Date(blog.date).toLocaleDateString()
                : ""
            }
          />
        ))
      ) : (
        <div>No blogs found.</div>
      )}
    </div>
  );
};

export default Blogs;