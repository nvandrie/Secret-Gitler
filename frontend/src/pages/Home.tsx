import "../styling/App.css";
import text_logo from "/text_logo.png";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { getUser, logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);

  useEffect(() => {
    if (basicUserInfo) {
      dispatch(getUser(basicUserInfo.id));
    }
  }, [basicUserInfo]);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="GenericPage">
      <img src={text_logo} alt="Image" className="image" />
      <div className="LandingButtonContainer">
        <Link to="/createjoingamepage">
          <button className="LandingButton">Start!</button>
        </Link>
        <h1>Home</h1>
        <h4>Name: {userProfileInfo?.name}</h4>
        <h4>Email: {userProfileInfo?.email}</h4>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
