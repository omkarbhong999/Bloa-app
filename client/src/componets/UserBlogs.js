/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { makeStyles } from "@mui/styles";
import config from "../config";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px auto",
    width: "80%",
  },

  blogContainer: {
    width: "100%",
    position: "relative",
    marginBottom: "20px",
  },
}));

const UserBlogs = () => {
  const classes = useStyles();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  const fetchUserBlogs = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${config.BASE_URL}/api/blogs`
      );

      console.log("All Blogs Response:", res.data);
      console.log("Logged-in User ID:", userId);

      const allBlogs = res.data?.data?.blogs || [];

      console.log("Total Blogs:", allBlogs.length);

      const myBlogs = allBlogs.filter((blog) => {
        const blogUserId =
          typeof blog.user === "object"
            ? blog.user?._id
            : blog.user;

        return (
          blogUserId?.toString() === userId?.toString()
        );
      });

      console.log("My Blogs:", myBlogs);

      setBlogs(myBlogs);
    } catch (err) {
      console.error(
        "User Blogs Error:",
        err?.response?.data || err.message
      );

      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBlogs();
  }, []);

  if (loading) {
    return <div>Loading your blogs...</div>;
  }

  return (
    <div className={classes.container}>
      <h2>My Blogs</h2>

      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div
            key={blog._id}
            className={classes.blogContainer}
          >
            <Blog
              id={blog._id}
              isUser={true}
              title={blog.title}
              desc={blog.desc}
              img={blog.img}
              user={blog.user?.name}
            />
          </div>
        ))
      ) : (
        <p>You haven't created any blogs yet.</p>
      )}
    </div>
  );
};

export default UserBlogs;