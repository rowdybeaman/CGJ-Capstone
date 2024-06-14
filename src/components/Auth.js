import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../store/authContext.js";
import './Auth.css';

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    let body = { username, password };
    console.log('test')
    axios
      .post(register ? "http://localhost:4005/register" : "http://localhost:4005/login", body)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.data });
        setWelcomeMessage(true);
        setTimeout(() => setWelcomeMessage(false), 3000); // Hide the welcome message after 3 seconds
      })
      .catch((err) => {
        if (err.response.data) {
          alert(err.response.data)
        }
        console.error(err);
      });
    console.log("submitHandler called");
  };

  return (
    <div className="auth-container">
      {welcomeMessage && <div className="welcome-message">Welcome!</div>}
      <div className="auth-box">
        <h1>Welcome!</h1>
        <form className="form auth-form" onSubmit={submitHandler}>
          <input className="form-input" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <input className="form-input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
        </form>
        <button className="form-btn" onClick={() => setRegister(!register)}>
          {register ? "Login" : "Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
