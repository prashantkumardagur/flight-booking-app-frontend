import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import DataChip from "../ui/Data/DataChip";
import LoadingIcon from "../ui/Loaders/LoadingIcon";

import AuthContext from "../../store/AuthContext";




const Signup = (props) => {

  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState(null);



  const signupHandler = async (e) => {
    e.preventDefault();
    setFeedback({text: <span><LoadingIcon /> Signing up...</span>, type: "info"});

    const fd = new FormData(e.target);

    let data = {
      name: fd.get("fullname"),
      email: fd.get("email"),
      password: fd.get("password"),
      phone: fd.get("phone"),
    }

    if(data.password !== fd.get("password2")) return setFeedback({ text: "Passwords do not match", type: "error" });

    console.log(data);
    const res = await signup(data);
    if(!res.success) return setFeedback({ text: res.message, type: "error" });
    setFeedback({ text: "Signup successful", type: "success" });
    navigate("/auth/login");
  }




  return (
  <div className="login-div" onSubmit={signupHandler}>
    <h3>Sign Up</h3>
    {feedback && <DataChip text={feedback.text} type={feedback.type} className="mt-3" />}
    <form className="login-form">
      <section>
        <label htmlFor="fullname">Full Name</label>
        <input type="text" name="fullname" id="fullname" required maxLength="32" />
      </section>
      <section>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required maxLength="32" />
      </section>
      <section>
        <label htmlFor="phone">Phone</label>
        <input type="tel" name="phone" id="phone" required maxLength="10" />
      </section>
      <section>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required maxLength="32" />
      </section>
      <section>
        <label htmlFor="confirm-password">Confirm Password</label>
        <input type="password" name="password2" id="confirm-password" required maxLength="32" />
      </section>
      <button className="btn primary mt-3 mr-2 large">Submit</button> Or <Link to="/auth/login" className="a-link">Log In</Link> instead.
    </form>
  </div>);
}

export default Signup;