import React from "react";
import "./profile.css";
const Profile = ({ user }) => {
  console.log(user);
  return (
    <div className="profile-page">
      <nav class="profile-page-nav">Hello {user.displayName}</nav>
      <div className="row credits">
        <div className="col-md-6 col-sm-12 col-lg-6 bg-primary p-2 text-white">
          Active Credits: {user.activeCredits}
        </div>
        <div className="col-md-6 col-sm-12 col-lg-6 bg-warning p-2 text-white">
          Pending Credits: {user.pendingCredits}
        </div>
      </div>
    </div>
  );
};

export default Profile;
