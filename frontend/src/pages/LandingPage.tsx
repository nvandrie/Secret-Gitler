import "../styling/App.css";
import text_logo from "/text_logo.png";
import { Link } from "react-router-dom";

const LandingOptions = () => {
  return (
    <div>
      <img src={text_logo} alt="Image" className="image" />
      <div className="LandingButtonContainer">
        <Link to="/login">
          <button className="LandingButton">LogIn</button>
        </Link>
        <Link to="/register">
          <button className="LandingButton">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingOptions;
