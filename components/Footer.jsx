import React from 'react';
import { Logo } from './Logo';
const Footer = () => (
  <footer className="bg-light p-3 text-center" data-testid="footer">
    {/* <div className="logo" data-testid="footer-logo" /> */}

    <Logo testId={"footer"} />
    <p data-testid="footer-text">
      Giselle By <a href="https://auth0.com">Team Giselle</a>
    </p>
  </footer>
);

export default Footer;
