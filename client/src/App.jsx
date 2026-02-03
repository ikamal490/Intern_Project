import { useState } from "react";
import Login from "./pages/Login";
import Otp from "./pages/Otp";
import Dashboard from "./pages/Dashboard";
  
function App() {
  const [screen, setScreen] = useState("login");
  const [page, setPage] = useState("home");

  return (
    <>
      {screen === "login" && <Login onLogin={() => setScreen("otp")} />}
      {screen === "otp" && (
        <Otp onSuccess={() => setScreen("dashboard")} />
      )}
      {screen === "dashboard" && (
        <Dashboard page={page} setPage={setPage} />
      )}
    </>
  );
}

export default App;
