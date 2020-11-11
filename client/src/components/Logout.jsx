import React, { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Logout = () => {
  const { setCurrentWriter } = useContext(AppContext);
   const history = useHistory();

  const handleSignOut = async () => {
    try {
      await axios({
        method: 'POST',
        url: '/writers/logout',
        withCredentials: true
      });
      sessionStorage.removeItem('writer');
      setCurrentWriter(null);
      history.push('/login')
    } catch (error) {
      console.log(error)
    }
  };

  return <Dropdown.Item onClick={handleSignOut}>Logout</Dropdown.Item>;
};

export default Logout;
