import React from "react";
import "./profile.css";
import StripeCheckout from "react-stripe-checkout";

const Profile = ({ user }) => {
  console.log(user);
  const handelToken = (token, price) => {
    if (token) {
      const apiOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token, price })
      };
      fetch("/api/checkout", apiOptions)
        .then(res => res.json())
        .then(response => {
          console.log(response);
          // handel Response
          if (response.user) {
            window.location.href = "/";
          }
        })
        .catch(err => console.log(err));
    }
  };
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
      <div className="profile-page-offers">
        <div className="offer-card">
          <h1 className="text-center bg-dark text-white p-4">BASIC</h1>
          <h1 className="text-dark text-center">$9</h1>
          <p className="list-group-item mx-2 text-center">
            Avail and get 10 Credits
          </p>
          <div className="profile-page-stripe-button">
            <StripeCheckout
              stripeKey="pk_test_SOGdFBY36PNRIks2JUQ2Cwlv"
              amount={9 * 100}
              token={token => handelToken(token, 9)}
              name="PRO"
            />
          </div>
        </div>
        <div className="offer-card">
          <h1 className="text-center bg-dark text-white p-4">PRO</h1>
          <h1 className="text-dark text-center">$19</h1>
          <p className="list-group-item mx-2 text-center">
            Avail and get 20 Credits
          </p>
          <div className="profile-page-stripe-button">
            <StripeCheckout
              stripeKey="pk_test_SOGdFBY36PNRIks2JUQ2Cwlv"
              amount={19 * 100}
              token={token => handelToken(token, 19)}
              name="PRO"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
