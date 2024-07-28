// Layout.jsx
import React from 'react';
import Sidebar from '../components/leftSidebar';
import Header from '../components/header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="w-full flex flex-row justify-start relative rounded-boundvariablesdata bg-white overflow-hidden text-left text-[0.875rem] text-black-100 font-semibold">
      <Sidebar />
      <div className='w-full ml-64 flex flex-col'>
      <Header
        // propWidth="full"
        // propRight="2.5rem"
        button={false}
        button1={false}
        button2={false}
        text={false}
      />
      
        <Outlet />
      
      </div>
    </div>
  );
};

export default Layout;
