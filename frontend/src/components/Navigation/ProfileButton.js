// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink, useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const ulRef = useRef();
  const { setModalContent, setOnModalClose } = useModal();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/');
  };

  // const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden") + (user ? " logged-in" : " logged-out");

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-bars"></i>
        <span> </span>
        <i className="fa-sharp fa-solid fa-id-card"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="helloUser">
              <li>Hello, {user.firstName}</li>
              <li>{user.email}</li>
            </div>
            <li>
              <div className="manageSpots">
                <NavLink to="/spots/current" className="nav-link-manage-spots"
                  onClick={() => {
                    closeMenu();
                  }}>Manage Spots</NavLink>
              </div>
            </li>
            <li>
              <div className="manageBookings">
                <NavLink to="/manage-bookings" className="nav-link-manage-bookings"
                  onClick={() => {
                    closeMenu();
                  }}>Manage Bookings</NavLink>
              </div>
            </li>
            <li>
              <div className="logoutButton">
                <button onClick={logout}>Log Out</button>
              </div>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="#"
                onClick={() => {
                  closeMenu();
                  setModalContent(<SignupFormModal />);
                }}
              > Sign up
              </NavLink>
            </li>
            <li>
              <NavLink
                to="#"
                onClick={() => {
                  closeMenu();
                  setModalContent(<LoginFormModal />);
                }}
              > Log in
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;

/*
<i class="fa-sharp fa-solid fa-id-card"></i>
<i className="fa-sharp fa-solid fa-id-card"></i>
<i className="fas fa-user-circle" />

          <>
            <li>
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </li>
          </>
*/
