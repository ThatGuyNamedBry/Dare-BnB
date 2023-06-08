// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from './components/SpotList';
import SpotDetails from "./components/SpotDetails";
import CreateSpotForm from "./components/CreateSpotForm";
import CurrentUserSpotList from "./components/CurrentUserSpotList";
import UpdateSpotForm from "./components/UpdateSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
      <Switch>
        <Route exact path="/" component={SpotList} />
        <Route exact path="/spots/new" component={CreateSpotForm} />
        <Route exact path="/spots/current" component={CurrentUserSpotList} />
        <Route exact path="/spots/:spotId/edit" component={UpdateSpotForm} />
        <Route exact path="/spots/:spotId" component={SpotDetails} />
      </Switch>
      )}
    </>
  );
}

export default App;
