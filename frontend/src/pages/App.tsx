import "../styling/App.css";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import NotificationBar from "../components/NotificationBar";
import LandingPage from "./LandingPage";
import CreateJoinGamePage from "./CreateJoinGamePage";
import LobbyPage from "./LobbyPage";
import GameplayPage from "./GamePlayPage";
import Home from "./Home";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

function App() {

  return (
    <div>
      <NotificationBar />
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/lobby" element={<LobbyPage />} />
          <Route path="/createjoingamepage" element={<CreateJoinGamePage />} />
          <Route path="/game" element={<GameplayPage />} />
          <Route path="" element={<LandingPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
