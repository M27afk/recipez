import React, { useContext, useState } from "react";
import "./Modal.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
export default function Modal(params) {
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cred, setCred] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    errors: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });
  const URL = import.meta.env.VITE_BASE_URL;
  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  const usernameRegex = RegExp(/^[a-zA-Z0-9]+$/);
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = cred.errors;
    setCred((prev) => ({ ...prev, [name]: value }));
    switch (name) {
      case "name":
        errors.name =
          value.length < 5
            ? "Full Name must be at least 5 characters long!"
            : "";
        break;
      case "username":
        errors.username = usernameRegex.test(value)
          ? ""
          : "Username is not valid!";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 8
            ? "Password must be at least 8 characters long!"
            : "";
        break;
      default:
        break;
    }

    setCred((prev) => ({ ...prev, errors }));
  };
  const handleSign = async () => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${URL}/user/create`, {
        name: cred.name,
        username: cred.username,
        email: cred.email,
        password: cred.password,
      });
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          id: res.data,
          name: cred.name,
        },
      });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILED", payload: err.response.data });
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm(cred.errors)) {
      let str = "";
      Object.values(cred.errors).forEach((val) => {
        if (val.length > 0) {
          str += "\n " + val;
        }
      });
      alert("Invalid Form" + str);
    } else {
      handleSign();
    }
  };
  return (
    <div className="overlay">
      <div className="modal">
        <div className="form">
          <div className="heading">Register!</div>
          <div className="subheading">
            To search for your favourite receipes and access them anytime you
            want!
          </div>
          <div className="inputs">
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
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
            <button onClick={handleSubmit}>Sign Up</button>
          </div>
          <div>
            Already with us?{" "}
            <Link
              onClick={() => {
                params.setSign(true);
                navigate("/");
              }}
              style={{ textDecoration: "underline" }}
            >
              Login Now!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
