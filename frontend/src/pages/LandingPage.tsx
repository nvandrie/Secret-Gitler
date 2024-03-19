import "../styling/App.css";
import text_logo from "/text_logo.png";
import { Link } from "react-router-dom";


const LandingOptions = () => {

  return (
    <div>
      <img src={text_logo} alt="Image" className="image" />
      <div className="ButtonContainer">
        <Link to="/login">
          <button className="Button">Log In</button>
        </Link>
        <Link to="/signup">
          <button className="Button">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingOptions;
