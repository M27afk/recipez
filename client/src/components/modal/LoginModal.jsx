import React, { useContext, useState } from "react";
import "./Modal.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
export default function LoginModal() {
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cred, setCred] = useState({
    username: "",
    password: "",
  });
  const URL = import.meta.env.VITE_BASE_URL;

  const handleChange = (event) => {
    setCred((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    console.log(cred);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${URL}/user/login`, {
        username: cred.username,
        password: cred.password,
      });
      console.log(res);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          id: res.data._id,
          name: res.data.name,
        },
      });
      navigate("/");
    } catch (err) {
      console.log(err.response);
      alert(err.response.data);
      dispatch({ type: "LOGIN_FAILED", payload: err.response.data });
    }
  };
  return (
    <div className="overlay">
      <div className="modal">
        <div className="form">
          <div className="heading">Log in!</div>
          <div className="subheading">Welcome back, you've been missed!</div>
          <div className="inputs">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup">
            <button onClick={handleSubmit}>Log In</button>
          </div>
          {/* <div>
            Already with us?{" "}
            <Link to="/recipe" style={{ textDecoration: "underline" }}>
              Login Now!
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}
