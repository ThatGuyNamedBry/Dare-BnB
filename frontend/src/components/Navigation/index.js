// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul id="navigation-ul">
      <li id='HomeButton'>
        <NavLink exact to="/">
          <img src="/images/DareBnB.jpg" alt="Dare BnB" />
          <h1>DareBnB</h1>
        </NavLink>
      </li>
      {isLoaded && sessionUser ? (
        <>
          <li>
            <NavLink exact to="/spots/new" className="nav-link-create-spot">
              Create a New Spot
            </NavLink>
            <ProfileButton user={sessionUser} />
          </li>
        </>
      ) : (
        <li>
          <ProfileButton />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
