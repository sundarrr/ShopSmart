import React, { useState } from 'react';

const SignupLogin = () => {
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    margin: '0 auto',
  };

  const labelStyle = {
    marginBottom: '8px',
    color: 'black', // Set text color to black
  };

  const inputStyle = {
    padding: '8px',
    marginBottom: '16px',
    backgroundColor: 'white', // Set input background to white
    color:'black',
    border: '1px solid #ccc',
  };

  const handleSignupEmailChange = (event) => {
    setSignupEmail(event.target.value);
  };

  const handleSignupPasswordChange = (event) => {
    setSignupPassword(event.target.value);
  };

  const handleLoginEmailChange = (event) => {
    setLoginEmail(event.target.value);
  };

  const handleLoginPasswordChange = (event) => {
    setLoginPassword(event.target.value);
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    // Add signup logic here
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    // Add login logic here
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form style={formStyle} onSubmit={handleSignupSubmit}>
        <label htmlFor="signup-email" style={labelStyle}>Email:</label>
        <input
          type="email"
          id="signup-email"
          name="signup-email"
          style={inputStyle}
          value={signupEmail}
          onChange={handleSignupEmailChange}
          required
        />

        <label htmlFor="signup-password" style={labelStyle}>Password:</label>
        <input
          type="password"
          id="signup-password"
          name="signup-password"
          style={inputStyle}
          value={signupPassword}
          onChange={handleSignupPasswordChange}
          required
        />

        <button type="submit">Sign Up</button>
      </form>

      <h2>Login</h2>
      <form style={formStyle} onSubmit={handleLoginSubmit}>
        <label htmlFor="login-email" style={labelStyle}>Email:</label>
        <input
          type="email"
          id="login-email"
          name="login-email"
          style={inputStyle}
          value={loginEmail}
          onChange={handleLoginEmailChange}
          required
        />

        <label htmlFor="login-password" style={labelStyle}>Password:</label>
        <input
          type="password"
          id="login-password"
          name="login-password"
          style={inputStyle}
          value={loginPassword}
          onChange={handleLoginPasswordChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SignupLogin;
