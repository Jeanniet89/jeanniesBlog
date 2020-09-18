import React from 'react';
import { Navbar } from 'react-bootstrap';

const Footer = () => {
  return (
    <div>
      <Navbar className="footer mt-4">
        <Navbar.Brand href="/about" target="_blank" rel="noopener noreferrer">
          About Me:
        </Navbar.Brand>
        <div className="fticons">
          <a
            href="https://github.com/Jeanniet89"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i
              className="fas fa-envelope black-text ml-2"
              style={{ size: '3rem', color: 'black', width: '50px' }}
            ></i>
          </a>
          
        </div>
        <Navbar.Collapse className="justify-content-center"></Navbar.Collapse>
        <div className="fticons">
          &copy;{new Date().getFullYear()} Copyright:
          <a href="/" style={{ color: 'black' }}>
            {' '}
            J's Blog
          </a>
        </div>
      </Navbar>
    </div>
  );
};

export default Footer;
