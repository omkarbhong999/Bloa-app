import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate, useLocation } from "react-router-dom";
import config from "../config";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSignupButtonPressed } = location.state || {};

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSignup, setIsSignup] = useState(
    isSignupButtonPressed || false
  );

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isSignupButtonPressed !== undefined) {
      setIsSignup(isSignupButtonPressed);
    }
  }, [isSignupButtonPressed]);

  const sendRequest = async (type = "login") => {
  try {
    console.log(
      "Sending request to:",
      `${config.BASE_URL}/api/users/${type}`
    );

    const res = await axios.post(
      `${config.BASE_URL}/api/users/${type}`,
      {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      }
    );

    console.log("API Response:", res.data);

    return res.data;
  } catch (err) {
    console.error("API Request Failed");

    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Response:", err.response.data);
    } else if (err.request) {
      console.error("No response received from server:", err.request);
    } else {
      console.error("Request error:", err.message);
    }

    return null;
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted:", inputs);

    const type = isSignup ? "signup" : "login";

    const data = await sendRequest(type);

    if (!data) {
      return;
    }

    /*
      Backend response:

      {
        statusCode: 200,
        data: {
          user: {
            _id: "..."
          }
        },
        message: "Login successful",
        success: true
      }
    */

    const userId = data.data?.user?._id;

    if (userId) {
      console.log("User ID:", userId);

      localStorage.setItem("userId", userId);

      dispatch(authActions.login());

      navigate("/blogs");
    } else {
      console.error(
        "User ID not found in response data:",
        data
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography
            variant="h2"
            padding={3}
            textAlign="center"
          >
            {isSignup ? "Signup" : "Login"}
          </Typography>

          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Name"
              margin="normal"
            />
          )}

          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type="email"
            placeholder="Email"
            margin="normal"
          />

          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type="password"
            placeholder="Password"
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: 3,
              marginTop: 3,
            }}
            color="warning"
          >
            Submit
          </Button>

          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{
              borderRadius: 3,
              marginTop: 3,
            }}
          >
            Change To {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;