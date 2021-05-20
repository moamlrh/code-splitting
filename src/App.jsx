import React from "react";
import { Route, Switch } from "react-router";

const About = React.lazy(() => import("./components/about"));

const Home = React.lazy(() => import("./components/home"));

const Profile = React.lazy(() => import("./components/profile"));

function App() {
  return (
    <div>
      <Switch>
        <React.Suspense fallback={() => <h1>Loading ...</h1>}>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/profile" exact component={Profile} />
        </React.Suspense>
      </Switch>
    </div>
  );
}

export default App;
