import "../styling/App.css";
import text_logo from "/logos/text_logo.png";
import war_plane from "/misc/war_plane.png";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { getUser, logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

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

  const handleAnimation = () => {
    setAnimate(true);
    setTimeout(() => {
      navigate("/createjoingamepage");
    }, 2300);
  };

  //<h4>Email: {userProfileInfo?.email}</h4>
  return (
    <div className="GenericPage">
      <img src={text_logo} alt="Image" className="image" />
      <h2 className="welcome">Welcome {userProfileInfo?.name}</h2>
      <div className="start-content" onClick={handleAnimation}>
        <img
          src={war_plane}
          alt="Image"
          className={`war-plane ${animate ? "animate" : ""}`}
        />
        <button className="start-text">Fly To Germany!</button>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
