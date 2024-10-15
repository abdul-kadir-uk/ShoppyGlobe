import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'

const Layout = () => {
  return (
    <>
      {/* display header components  */}
      <Header />
      <main>
        {/* outlet act as placeholder which display active routes , it allows nested routing  */}
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
