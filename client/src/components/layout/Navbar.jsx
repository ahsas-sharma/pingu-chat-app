import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
const Navbar = () => {
  return (
    <header>
      <div className="container mx-auto">
        <div className="relative mx-4 sm:mx-8 my-4 flex items-center justify-between">
          <Link to="/">
            <h1 className="font-pingu text-3xl sm:text-5xl">🐧 Pingu Chat</h1>
          </Link>
          <Link to="/login">
            <Button title="Login" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
