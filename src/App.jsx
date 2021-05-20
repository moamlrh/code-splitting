import React from "react";
import { Route, Switch } from "react-router";
import Home from "./components/home";

const About = React.lazy(() => import("./components/about"));
// const Profile = React.lazy(() => import("./components/profile"));

// import About from "./components/about";
import Profile from "./components/profile";

function App() {
  return (
    <div>
      <Home />
      <Switch>
        <React.Suspense fallback={<h1>Loading ...</h1>}>
          <Route path="/about" exact component={About} />
        </React.Suspense>
        <Route path="/profile" exact component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
