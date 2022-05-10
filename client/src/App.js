import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import AuthControl from "./views/AuthCotrol";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="login" />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="auth" element={<AuthControl />}>
            
        </Route>
      </Routes>
    </div>
  );
}

export default App;
