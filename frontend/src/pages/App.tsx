import "../styling/App.css";
import LandingPage from "./LandingPage.tsx";
import text_logo from '/text_logo.png';

function App() {
  return (
    <div className='LandingPage'>
      <img src={text_logo} alt="Image"/>
      <LandingPage />
    </div>
  );
}

export default App;
