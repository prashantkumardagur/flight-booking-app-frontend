import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import DataChip from "../ui/Data/DataChip";
import LoadingIcon from "../ui/Loaders/LoadingIcon";

import AuthContext from "../../store/AuthContext";




const Login = (props) => {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState(null);




  const loginHandler = async (e) => {
    e.preventDefault();
    setFeedback({text: <span><LoadingIcon /> Logging in...</span>, type: "info"});
    const email = e.target.email.value;
    const password = e.target.password.value;
    const res = await login(email, password);
    if(!res.success) return setFeedback({ text: res.message, type: "error" });
    navigate("/");
  }




  return (
  <div className="login-div">
    <h3>Login</h3>
    {feedback && <DataChip text={feedback.text} type={feedback.type} className="mt-3" />}
    <form className="login-form" onSubmit={loginHandler}>
      <section>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required maxLength="32" />
      </section>
      <section>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required maxLength="32" />
      </section>
      <button className="btn primary mt-3 mr-2 large">Submit</button> Or <Link to="/auth/signup" className="a-link">Sign Up</Link> instead.
    </form>
  </div>);
}

export default Login;