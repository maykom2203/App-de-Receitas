import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import * as EmailValidator from 'email-validator';
import { useDispatch } from 'react-redux';
import { saveUser } from '../redux/reducer/user';
import '../Css/Login.css';

const minLength = 6;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(saveUser(email));

    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);

    history.push('/foods');
  };

  return (
    <div className="login">
      <input
        type="email"
        data-testid="email-input"
        value={ email }
        onChange={ ({ target }) => setEmail(target.value) }
        placeholder="Email"
      />
      <input
        type="text"
        data-testid="password-input"
        value={ password }
        onChange={ ({ target }) => setPassword(target.value) }
        placeholder="Password"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        onClick={ handleClick }
        disabled={ !(password.length > minLength && EmailValidator.validate(email)) }
      >
        Enter
      </button>
    </div>
  );
}

export default withRouter(Login);
