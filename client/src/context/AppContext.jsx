import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [currentWriter, setCurrentWriter] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [currentFilter, setCurrentFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState({});
  const writer = sessionStorage.getItem('writer');

  useEffect(() => {
    if (writer && !currentWriter) {
      axios
        .get('/writers/me', { withCredentials: true })
        .then((data) => setCurrentWriter(data))
        .catch((error) => console.log(error));
    }
  }, [currentWriter, writer]);

  return (
    <AppContext.Provider
      value={{
        currentWriter,
        setCurrentWriter,
        loading,
        setLoading,
        blogs,
        setBlogs,
        filteredBlogs,
        setFilteredBlogs,
        search,
        setSearch,
        currentFilter,
        setCurrentFilter,
        postData,
        setPostData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
