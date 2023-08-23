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
import BookingsPage from "./components/BookingsPage";
import ManageBookingsPage from "./components/ManageBookingsPage";

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
        <Route exact path="/spots/:spotId/bookings" component={BookingsPage} />
        <Route exact path="/manage-bookings" component={ManageBookingsPage} />
      </Switch>
      )}
    </>
  );
}

export default App;
