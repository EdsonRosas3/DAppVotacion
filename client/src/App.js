import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import AuthControl from "./views/AuthCotrol";

import Dashboard from "./pages/dashboard";
import Organization from "./pages/organization";
import Profile from "./pages/profile";
import Logout from "./pages/logout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="signin" />} />
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route path="auth" element={<AuthControl />}>
            <Route index element={<Organization/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="logout" element={<Logout/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
