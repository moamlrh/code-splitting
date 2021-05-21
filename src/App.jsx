import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router";
import Home from "./components/home";

// import Profile from "./components/profile";
const Profile = React.lazy(() => import("./components/profile"));
// const { default: Profile } = await import(
//   /* webpackChunkName: "profile" */ "./components/profile"
// );

// import About from "./components/about";
const About = React.lazy(() => import("./components/about"));

export default function App() {
  return (
    <div>
      <Home />
      <Switch>
        <React.Suspense fallback={<h1>Loading ...</h1>}>
          <Route exact path="/about" component={About} />
          <Route exact path="/profile" component={Profile} />
        </React.Suspense>
      </Switch>
    </div>
  );
}

// export default function MainComponent() {
//   const [ModalComponent, setModalComponent] = useState(null);
//   const loadModalComponent = async () => {
//     const loadResult = await import("./components/about");
//     setModalComponent(() => loadResult.default);
//   };
//   return (
//     <>
//       {ModalComponent ? <ModalComponent /> : null}
//       <button
//         onClick={() => {
//           loadModalComponent();
//         }}
//       >
//         load component
//       </button>
//     </>
//   );
// }

// export default App;
