import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoadingIcon from "../components/ui/Loaders/LoadingIcon";
import Icon from "../components/ui/Icon/Icon";

import AuthContext from "../store/AuthContext";

import "./css/profilepage.css";




const ProfilePage = (props) => {

  const navigate = useNavigate();
  const { changePassword, user, isLoggedIn, isAdmin } = useContext(AuthContext);

  const [feedback, setFeedback] = useState(null);

  
  useEffect(() => {
    if(!isLoggedIn) {
      navigate("/auth/login");
    }
  }, [isLoggedIn, navigate]);
  



  const changePasswordHandler = async (e) => {
    e.preventDefault();
    setFeedback(<span><LoadingIcon /> Please wait...</span>);
    let fd = new FormData(e.target);
    let data = {
      oldPassword: fd.get("oldPassword"),
      newPassword: fd.get("newPassword")
    }

    let res = await changePassword(data);
    if(!res.success) return setFeedback(res.message);
    setFeedback(<span className="d-inflex align-center"><Icon icon="check" color="green" /> Successfully changed.</span>);
  }




  return (
  <div className="profile-page container py-6">
    <h3>Your upcoming journeys</h3>
    <div className="placeholder mt-2"></div>
    <h3 className="mt-6">Your past journeys</h3>
    <div className="placeholder mt-2"></div>
    { !isAdmin &&
      <>
      <h3 className="mt-7">Your account</h3>
      <div className="profile">
        <form className="p-4 bg-accent-light rounded-10 d-grid-2" onSubmit={changePasswordHandler}>
          <section>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={user ? user.name : "Logout"} disabled />
          </section>
          <section>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={user ? user.email : "Logout"} disabled />
          </section>
          <h5 className="pt-5">Change Password</h5><div></div>
          <section>
            <label htmlFor="oldPassword">Old Password</label>
            <input type="password" name="oldPassword" id="oldPassword" placeholder="Your old password" required />
          </section>
          <section>
            <label htmlFor="new-password">New Password</label>
            <input type="password" name="newPassword" id="newPassword" placeholder="Your new password" required />
          </section>
          <button className="btn primary mt-3 pwd-change-btn">Change password</button>
          <div className="feedback">
            {feedback && <p>{feedback}</p>}
          </div>
        </form>
      </div>
      </>
    }
  </div>);
}

export default ProfilePage;