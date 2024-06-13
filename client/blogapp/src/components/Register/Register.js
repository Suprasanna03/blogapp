import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

function Register() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();
  const [err, setErr] = useState('');
  const [checkedRadioValue, setCheckedRadioValue] = useState("");
  const [state, setState] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  async function onRegisterFormSubmit(userObj) {
    try {
      console.log(userObj);
      let res = await axios.post(`http://localhost:4000/${userObj.userType}-api/user`, userObj);
      console.log(res);
      if (res.status === 201) {
        setState(true);
        setSignupSuccess(true);
        setErr("");
        navigate("/login"); // Redirect to the login page on successful registration
      } else if (res.status === 200 && res.data.message === 'User exists') {
        setErr('User exists'); // Set the error message to 'User exists'
      } else {
        setErr(res.data.message || "Registration failed");
      }
    } catch (error) {
      setErr(error.response?.data?.message || "Registration failed");
    }
  }

  const handleRadioChange = (event) => {
    setCheckedRadioValue(event.target.value);
    setValue("userType", event.target.value);
  };

  return (
    <div className="container">
      <form
        className="w-50 mx-auto bg-light p-4 rounded shadow mt-5 mb-5"
        onSubmit={handleSubmit(onRegisterFormSubmit)}
      >
        {err && <p className='text-danger fs-3'>{err}</p>}

        <div className="mb-3 ">
          <label className="m-2">User Type:  </label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="userType"
              id="registerAsUser"
              value="user"
              onChange={handleRadioChange}
              checked={checkedRadioValue === "user"}
            />
            <label className="form-check-label" htmlFor="registerAsUser">
              User
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="userType"
              id="registerAsAuthor"
              value="author"
              onChange={handleRadioChange}
              checked={checkedRadioValue === "author"}
            />
            <label className="form-check-label" htmlFor="registerAsAuthor">
              Author
            </label>
          </div>
        </div>

        <input
          type="hidden"
          {...register("userType", { required: true })}
        />

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            {...register("username", { required: true })}
            id="username"
            className="form-control"
          />
          {errors.username && <p className="text-danger">Username is required</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            {...register("password", { required: true })}
            id="password"
            className="form-control"
          />
          {errors.password && <p className="text-danger">Password is required</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            id="email"
            className="form-control"
          />
          {errors.email && <p className="text-danger">Email is required</p>}
        </div>

        <button type="submit" className="btn btn-success w-40 mx-auto d-block">
          Register
        </button>

        <p className="lead text-center mt-3">
          Already registered?{" "}
          <Link to="/login" className="text-success fw-bold">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
