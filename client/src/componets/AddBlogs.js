import {
  Box,
  Button,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import config from "../config";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./utils";
import placeholderImg from "../../src/placeholder.jpg";

const labelStyles = {
  mb: 1,
  mt: 2,
  fontSize: "24px",
  fontWeight: "bold",
};

const AddBlogs = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post(
        `${config.BASE_URL}/api/blogs/add`,
        {
          title: inputs.title,
          desc: inputs.description,
          img:
            inputs.imageURL.trim() === ""
              ? placeholderImg
              : inputs.imageURL,
          user: localStorage.getItem("userId"),
        }
      );

      console.log("Add Blog Response:", res.data);

      return res.data;
    } catch (err) {
      console.error(
        "Add Blog Error:",
        err?.response?.data || err.message
      );

      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Blog Form Data:", inputs);

    const data = await sendRequest();

    if (data) {
      console.log("Blog created successfully:", data);
      navigate("/blogs");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={3}
          display="flex"
          flexDirection="column"
          width="80%"
        >
          <Typography
            className={classes.font}
            padding={3}
            color="grey"
            variant="h2"
            textAlign="center"
          >
            Post Your Blog
          </Typography>

          <InputLabel
            className={classes.font}
            sx={labelStyles}
          >
            Title
          </InputLabel>

          <TextField
            className={classes.font}
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="normal"
            variant="outlined"
            fullWidth
          />

          <InputLabel
            className={classes.font}
            sx={labelStyles}
          >
            Description
          </InputLabel>

          <TextareaAutosize
            className={classes.font}
            name="description"
            onChange={handleChange}
            minRows={10}
            value={inputs.description}
            placeholder="Write your blog here..."
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "16px",
              fontFamily: "inherit",
              boxSizing: "border-box",
              borderRadius: "4px",
              border: "1px solid #c4c4c4",
              resize: "vertical",
            }}
          />

          <InputLabel
            className={classes.font}
            sx={labelStyles}
          >
            Image URL
          </InputLabel>

          <TextField
            className={classes.font}
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL}
            margin="normal"
            variant="outlined"
            fullWidth
            placeholder="https://example.com/image.jpg"
          />

          <Button
            sx={{
              mt: 2,
              borderRadius: 4,
            }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlogs;