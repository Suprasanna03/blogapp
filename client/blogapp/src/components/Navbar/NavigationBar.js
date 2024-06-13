import React from "react";
import { NavLink } from 'react-router-dom';
import './NavigationBar.css'; 
import { useSelector ,useDispatch} from 'react-redux'
import { resetState } from "../../redux/slices/userAuthorSlice";
function NavigationBar() {
  let dispatch=useDispatch()
  let { loginUserStatus,errorOccured,errMsg,currentUser } = useSelector(state => state.userAuthorLoginReducer);
  function signOut()
  {
    //remove token from local storage
    localStorage.removeItem("token")
    dispatch(resetState())
  }









  return (
    <ul className="nav justify-content-end bg-success p-3 fs-5">
      {loginUserStatus === false ? (
        // Home link
        <>
          <li className="nav-item">
            <NavLink className="nav-link text-light" exact to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          {/* Register link */}
          <li className="nav-item">
            <NavLink className="nav-link text-light" to="/register" activeClassName="active">
              Register
            </NavLink>
          </li>
          {/* Login link */}
          <li className="nav-item">
            <NavLink className="nav-link text-light" to="/login" activeClassName="active">
              Login
            </NavLink>
          </li>
        </>
      ) : (
        // Sign out link
        <li className="nav-item">
          <NavLink className="nav-link text-light" to="/login" onClick={signOut}>
            <p className="fs-3">Welcome , {currentUser.username}</p>
            SignOut
          </NavLink>
        </li>
      )}
    </ul>
  );
}

export default NavigationBar;
