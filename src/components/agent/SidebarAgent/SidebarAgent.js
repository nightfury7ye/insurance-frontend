import React, { useState } from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';
const SidebarAgent = ({moduleNameSetter}) => {
    return (
        <div style={{ display: 'flex', height: '91.3vh', overflow: 'scroll initial', width: '32.5vh' }}>
          <CDBSidebar textColor="#fff" backgroundColor="#333">
            <CDBSidebarHeader prefix={<i onClick={() => console.log("clicked")} className="fa fa-bars fa-large"></i>}>
              <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                E-Insurance
              </a>
            </CDBSidebarHeader>
    
            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
                <div onClick={() => {moduleNameSetter("view_customers")}}>
                    <CDBSidebarMenuItem icon="columns">View your Customers</CDBSidebarMenuItem>
                </div>
                <div onClick={() => {moduleNameSetter("view_commisions")}}>
                  <CDBSidebarMenuItem icon="table">View Commisions</CDBSidebarMenuItem>
                </div>
                <div onClick={() => {moduleNameSetter("view_profile")}}>
                  <CDBSidebarMenuItem icon="table">View Profile</CDBSidebarMenuItem>
                </div>
              </CDBSidebarMenu>
            </CDBSidebarContent>
    
            <CDBSidebarFooter style={{ textAlign: 'center' }}>
              <div
                style={{
                  padding: '20px 5px',
                }}
              >
                Made with love by Monocept
              </div>
            </CDBSidebarFooter>
          </CDBSidebar>
        </div>
      );
}

export default SidebarAgent