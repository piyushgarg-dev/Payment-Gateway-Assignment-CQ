import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Pages
import Login from "./pages/Loginpage/Login";
import Register from "./pages/Registerpage/Register";
import Profile from "./pages/Profilepage/Profile";

function App() {
  const [user, setUser] = useState();

  const apiOptions = {
    method: "GET"
  };

  useEffect(() => {
    fetch("/api/auth/user", apiOptions)
      .then(res => res.json())
      .then(response => {
        if (response.user) {
          setUser(response.user);
        } else {
          setUser(null);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {user ? (
              <Profile user={user} />
            ) : (
              <Login onSuccessLogin={user => setUser(user)} />
            )}
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
