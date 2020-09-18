import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [Writer, setWriter] = useState(null);
  const [loading, setLoading] = useState(false);
    const writer = sessionStorage.getItem('writer');

  useEffect(() => {
    if (writer && !Writer) {
      axios
        .get('/writers/me', { withCredentials: true })
        .then((res) => setWriter(res.data))
        .catch((error) => console.log(error));
    }
  }, [Writer, writer]);

  return (
    <AppContext.Provider
      value={{
        Writer,
        setWriter,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
