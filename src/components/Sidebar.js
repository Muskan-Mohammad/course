import React, { useState } from 'react';
import styled from "styled-components";
import {MdClose} from "react-icons/md";
import {Link} from "react-router-dom";
import { useSidebarContext } from '../context/sideBarContext';
import { useCoursesContext } from '../context/coursesContext';
import axios from 'axios';

const Sidebar = () => {
  const {categories} = useCoursesContext();
  const {closeSidebar, isSidebarOpen} = useSidebarContext();
  const [menu , setMenu]=  useState();
// const category = "python"

//   axios.get(`http://localhost:3001/courses/categories/${category}`)
//   .then((res) => {
//     console.log("res for categories" , res)
//     setMenu(res.data)
//   }).catch(console.log("error for data"))

  return (
    <SidebarWrapper className={`bg-white ${isSidebarOpen ? "show-sidebar" : ""}`}>
    <button type = "button" className='sidebar-close-btn' onClick={() => closeSidebar()}>
      <MdClose />
    </button>
    <div className='sidebar-content'>
      <h6 className='fs-18'>Top Categories</h6>
      <ul className='sidebar-category'>
    
         
              <li className='sidebar-link-item fw-5' >
                <Link 
                // to = {`category/${category}`}
                >PYTHON</Link>
          </li>
          <li className='sidebar-link-item fw-5' >
                <Link
                //  to = {`category/${category}`}
                 >WEB DEVELOPMENT</Link>
          </li>
          <li className='sidebar-link-item fw-5' >
                <Link 
                // to = {`category/${category}`}
                >DATA SCIENCE</Link>
          </li>
          <li className='sidebar-link-item fw-5' >
                <Link 
                // to = {`category/${category}`}
                >AWS CERTIFICATION</Link>
          </li>
      </ul>
    </div>
  </SidebarWrapper>
  )
}

const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  z-index: 10;
  height: 100%;
  padding: 30px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 8px;
  transform: translateX(100%);
  transition: var(--transition);

  &.show-sidebar{
    transform: translateX(0);
  }

  .sidebar-close-btn{
    position: absolute;
    right: 20px;
    top: 20px;
    border: 2px solid var(--clr-black);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    transition: all 300ms ease-in-out;
  }
  .sidebar-close-btn:hover{
    background-color: var(--clr-black);
    color: var(--clr-white);
  }
  .sidebar-content{
    margin-top: 50px;
    h6{
      margin-bottom: 16px;
    }
    .sidebar-link-item{
      font-size: 15px;
      margin-bottom: 12px;
      transition: var(--transition);

      &:hover{
        transform: translateX(6px);
        text-decoration: underline;
      }
    }
  }
`;

export default Sidebar