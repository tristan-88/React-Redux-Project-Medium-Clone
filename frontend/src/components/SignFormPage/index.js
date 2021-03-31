import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to='/mainpage' />;

    const handleSubmit = (e) => {
			e.preventDefault();
			if (password === confirmPassword) {
				setErrors([]);
				return dispatch(
					sessionActions.signup({ email, username, password })
				).catch(async (res) => {
					const data = await res.json();
					if (data && data.errors) setErrors(data.errors);
				});
			}
			return setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
    };
    return (
    <section className='sign_up_form'>
          <h2 className='sign_up_header'>Sign-Up Form</h2>  
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, index) => <li key={index}>{error}</li>)}
      </ul>
      <label>
                Email
        <input
                    className="email_text"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
      </label>
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          />
      </label>
      <button type="submit">Sign Up</button>
    </form>
          </section>
  );
};


export default SignupFormPage;