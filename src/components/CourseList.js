import React from 'react';
import styled from 'styled-components';
import Tabs from './Tabs';
import { useCoursesContext } from '../context/coursesContext';
import { OpenList } from './SearchBar';
import { useNavigate } from 'react-router-dom';

const CourseList = () =>{
    const {courses} = useCoursesContext();
    const navigate = useNavigate();
    const handleOpen = () =>{
      navigate('/enroll/:enrollmentStatus')
    }
    const handleClose = () =>{
      navigate('/status/:enrollmentStatus')
    }
    const handleProgress = () =>{
      navigate('/matter/:enrollmentStatus')
    }
  return (
    <CoursesListWrapper>
    <div className='container'>
      <div>
        <h3>Browse by enrollment Status</h3>
        <div className="tabs">
        <StyledButton onClick={handleOpen} >Open</StyledButton>
        <StyledButton onClick={handleClose} >Close</StyledButton>
        <StyledButton onClick={handleProgress}>In Progress</StyledButton>
        </div>
      </div>
        <div className='courses-list-top'>
          <h2>A broad selection of courses</h2>
          <p>Choose from 4,000 online video courses with new additions publihsed every month</p>
        </div>

        <Tabs courses = {courses} />
      </div>
    </CoursesListWrapper>
  )
}

const CoursesListWrapper = styled.div`
  padding: 40px 0;
  .courses-list-top p{
    font-size: 1.8rem;
  }
  .tabs button{
    border: 1px solid rgba(0, 0, 0, 0.7);
    padding: 10px 13px;
    margin-right: 6px;
    transition: var(--transition);
    font-weight: 500;
    font-size: 15px;
    margin-bottom: 10px;

    &:hover{
      background-color: var(--clr-black);
      color: var(--clr-white);
    }
  }
`;

const StyledButton = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.7);
  padding: 10px 13px;
  margin-right: 6px;
  transition: var(--transition);
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 10px;

  &:hover {
    background-color: var(--clr-black);
    color: var(--clr-white);
  }
`;
export default CourseList; 