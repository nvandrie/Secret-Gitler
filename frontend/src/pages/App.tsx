import "../styling/App.css";
import LandingPage from "./LandingPage";
import CreateJoinGamePage from "./CreateJoinGamePage";
import LobbyPage from "./LobbyPage";
import GameplayPage from "./GamePlayPage";
import Home from "./Home";
import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../styling/App.css";
import DefaultLayout from "../layouts/DefaultLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import NotificationBar from "../components/NotificationBar";


function App() {
  return (
      <div className="GenericPage">
        <NotificationBar />
        <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<SignUp />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/lobby" element={<LobbyPage />} />
          <Route path="/createjoingamepage" element={<CreateJoinGamePage />} />
          <Route path="/game" element={<GameplayPage />} />
          <Route path="/" element={<LandingPage/>} />
        </Route>
        </Routes>
      </div>
  );
}

export default App;
