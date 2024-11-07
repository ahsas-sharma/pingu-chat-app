import React from 'react';
import Navbar from './Navbar';
import backgroundVideo from '../../assets/videos/penguins_bg.mp4';

const Layout = ({ children }) => {
  return (
    <div className="">
      <Navbar />
      <video
        autoPlay
        loop
        muted
        className="fixed -z-10 w-full h-full object-cover"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      {children}
    </div>
  );
};

export default Layout;
