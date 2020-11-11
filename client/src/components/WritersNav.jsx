import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Dropdown, Image } from 'react-bootstrap';
import { AppContext } from '../context/AppContext'
import Logout from './Logout'

const Navigation = () => {

	const {currentWriter} = useContext(AppContext)

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
 Home
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item className="mr-2">Write New Blog</Nav.Item>
          <Nav.Item>Current Blogs</Nav.Item>
        </Nav>
        <Nav>
          <Nav.Item>
            <Dropdown drop="down" className="mr-1">
              <Dropdown.Toggle variant="">
                <Image
                  src={
                    currentWriter?.avatar
                      ? currentWriter.avatar
                      : 'https://res.cloudinary.com/jeanniet89/image/upload/v1600025028/favicon_zmmxhs.png'
                  }
                  height={50}
                  width={50}
                  roundedCircle
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/writers/profile">
                  Profile
                </Dropdown.Item>
                <Logout />
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;

