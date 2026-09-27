import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStyles } from "./utils";
import config from "../config";

const Blogs = ({
  title,
  desc,
  img,
  user,
  isUser,
  id,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleEdit = () => {
    if (!id) {
      console.error("Blog ID is missing");
      return;
    }

    navigate(`/myBlogs/${id}`);
  };

  const handleDelete = async () => {
    if (!id) {
      console.error("Blog ID is missing");
      return;
    }

    try {
      console.log("Deleting Blog:", id);

      const res = await axios.delete(
        `${config.BASE_URL}/api/blogs/${id}`
      );

      console.log("Delete Response:", res.data);

      // Go back to blogs after successful deletion
      navigate("/blogs");

    } catch (err) {
      console.error(
        "Delete Blog Error:",
        err?.response?.data || err.message
      );
    }
  };

  return (
    <div>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",

          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton
              onClick={handleEdit}
              sx={{ marginLeft: "auto" }}
            >
              <ModeEditOutlineIcon color="warning" />
            </IconButton>

            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}

        <CardHeader
          avatar={
            <Avatar
              className={classes.font}
              sx={{ bgcolor: "red" }}
            >
              {user ? user.charAt(0).toUpperCase() : ""}
            </Avatar>
          }
          title={title}
        />

        <CardMedia
          component="img"
          height="194"
          image={img}
          alt={title}
        />

        <CardContent>
          <hr />
          <br />

          <Typography
            className={classes.font}
            variant="body2"
            color="text.secondary"
          >
            <b>{user}</b> : {desc}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blogs;