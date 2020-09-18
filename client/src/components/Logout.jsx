import React from 'react';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Logout = () => {
  const history = useHistory();
  const { setCurrentUser } = AppContext;

  const handleSignOut = () => {
    axios
      .post('/writers/logout', { withCredentials: true })
      .then(() => {
        setCurrentUser(null);
        sessionStorage.removeItem('writer');
        history.push('/home');
      })
      .catch((error) => console.log(error));
  };

  return <Dropdown.Item onClick={handleSignOut}>Logout</Dropdown.Item>;
};

export default Logout;
