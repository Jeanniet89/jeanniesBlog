import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Container} from 'react-bootstrap'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
// import AppNavbar from './components/AppNavbar';
import Footer from './components/footer';
import Logout from './components/Logout';
import DeletedBlog from './components/DeletedBlog'
import Readers from './components/Readers';
import PrivateRoute from './components/PrivateRoute';
import { AppContextProvider } from './context/AppContext';
import Blog from './components/Blog';
import WritersHomePg from './pages/WritersHomePg';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';

function App() {
  return (
    <div className="App">
      {/* <AppNavbar /> */}
      <AppContextProvider>
        <Container>
          <Router>
            <Switch>
              <HomePage />
              <Route exact path="/" component={HomePage} />
              <PrivateRoute exact path="/writers" components={WritersHomePg} />
              <Route exact path="/writers/login" component={Login} />
              <Route exact path="/writers/register" component={Register} />
              <PrivateRoute exact path="/writers/logout" component={Logout} />
              <PrivateRoute exact path="/posts/:id" component={Blog} />
              <PrivateRoute exact path="/posts/new" component={BlogForm} />
              <PrivateRoute exact path="/posts/delete/:id" component={DeletedBlog} />
              <PrivateRoute exact path="/posts" component={BlogList} />
              <Route exact path="/readers/comments" component={Readers} />
            </Switch>
          </Router>
        </Container>
        <Footer />
      </AppContextProvider>
    </div>
  );
};

export default App;

