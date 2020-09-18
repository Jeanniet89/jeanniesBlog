import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import WritersBlog from './components/WritersBlog';
import PostList from './components/PostList';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import AppNavbar from './components/AppNavbar';
import Footer from './components/footer';
import Logout from './components/Logout';
import DeletedBlog from './components/DeletedBlog'
import Readers from './components/Readers';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import { AppContextProvider } from './context/AppContext';
import Blog from './components/Blog';

const App = () => {
  return (
    <div className="App">
      <AppNavbar />
      <AppContextProvider>
        <BrowserRouter>
          <Container>
            <Switch>
              <HomePage />
              <Route exact path="/" components={HomePage} />
              <Route exact path="/writers/new" component={Register} />
              <Route exact path="/posts" component={PostList} />
              <Route exact path="/posts/new" component={WritersBlog} />
              <Route exact path="/posts/delete/:id" component={DeletedBlog} />
              <PrivateRoute exact path="/writers/login" component={Login} />
              <Route exact path="/readers/comments" component={Readers} />
              <Route exact path="/readers" component={PostList} />
              <Route exact path="/writers/logout" component={Logout} />
              <Route exact path="/posts" component={Blog} />
            </Switch>
          </Container>
        </BrowserRouter>
        <Footer />
      </AppContextProvider>
    </div>
  );
};

export default App;

