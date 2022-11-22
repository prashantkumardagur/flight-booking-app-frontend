import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import DataChip from "../ui/Data/DataChip";
import LoadingIcon from "../ui/Loaders/LoadingIcon";

import AuthContext from "../../store/AuthContext";





const AdminLogin = (props) => {

  const { adminLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState(null);



  const loginHandler = async (e) => {
    e.preventDefault();
    setFeedback({text: <span><LoadingIcon /> Logging in...</span>, type: "info"});
    const password = e.target.password.value;
    const res = await adminLogin(password);
    if(!res.success) return setFeedback({ text: res.message, type: "error" });
    navigate("/dashboard");
  }



  return (<div className="login-div">
    <h3>Admin Login</h3>
    {feedback && <DataChip text={feedback.text} type={feedback.type} className="mt-3" />}
    <form className="login-form" onSubmit={loginHandler}>
      <section>
        <label htmlFor="password">Admin Password</label>
        <input type="password" name="password" id="password" required maxLength="32" />
      </section>
      <button className="btn primary mt-3 mr-2 large">Submit</button>
    </form>
  </div>);
}

export default AdminLogin;