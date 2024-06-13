import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import {userAuthorLoginThunk} from '../../redux/slices/userAuthorSlice';
import { useNavigate } from "react-router-dom";
function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  let {currentUser,loginUserStatus,errorOccurred,errMsg}=useSelector(state=>state.userAuthorLoginReducer)
  let navigate=useNavigate()
  let dispatch=useDispatch()


  function onLoginFormSubmit(userCred) {
    console.log(userCred);
    
    dispatch(userAuthorLoginThunk(userCred))
  }
  useEffect(() => {
    if (loginUserStatus) {
      if (currentUser.userType === "user") {
        navigate("/user-profile");
      }
      if (currentUser.userType === "author") {
        navigate("/author-profile");
      }
    }
  }, [loginUserStatus]);


  return (
    <div className="container">
      <form
        className="w-50 mx-auto bg-light p-4 rounded shadow mt-5 mb-5"
        onSubmit={handleSubmit(onLoginFormSubmit)}
      >
        {/* User Type label and radio buttons at the top */}
        <div className="mb-3 row align-items-center">
          <label className="col-sm-3 col-form-label">User Type</label>
          <div className="col-sm-9">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                {...register("userType")}
                id="user"
                value="user"
                className="form-check-input"
              />
              <label htmlFor="user" className="form-check-label">User</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                {...register("userType")}
                id="author"
                value="author"
                className="form-check-input"
              />
              <label htmlFor="author" className="form-check-label">Author</label>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            {...register("username")}
            id="username"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            id="password"
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-success w-30% mx-auto d-block">
          Login
        </button>
        
        <p className="lead text-center mt-3">
          New User?{" "}
          <Link to="/register" className="text-success fw-bold">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
