import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const isEmailValid = email !== "";
  const isUsernameValid = username.length >= 4;
  const isFirstNameValid = firstName !== "";
  const isLastNameValid = lastName !== "";
  const isPasswordValid = password.length >= 6;
  const isConfirmPasswordValid = confirmPassword.length >= 6 && confirmPassword === password;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (isConfirmPasswordValid) {
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    } else {
      return setErrors({
        confirmPassword: "Password fields must match!"
      });
    }
  };

  return (
    <div id='SignUpForm'>
      <h1 id ='SignUpH1'>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
        </label>
        {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
        <button
          type="submit"
          disabled={
            !isEmailValid ||
            !isUsernameValid ||
            !isFirstNameValid ||
            !isLastNameValid ||
            !isPasswordValid ||
            confirmPassword.length < 6
          }
          className={!isEmailValid || !isUsernameValid || !isFirstNameValid || !isLastNameValid || !isPasswordValid || isConfirmPasswordValid ? "disabled" : ""}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
