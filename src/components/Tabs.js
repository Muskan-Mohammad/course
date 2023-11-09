import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Course from './Course';
import courses from '../utils/data';
import { PYTHON, WEB_DEVELOPMENT, DATA_SCIENCE, AWS } from '../utils/constants'
import courseReducers from '../reducers/courseReducers';
import { useCoursesContext } from '../context/coursesContext';
import axios from 'axios';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(PYTHON);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/courses')
      .then((res) => { setCourses(res.data) }
      )
  }, []);
  const tabHandler = (category) => {
    setActiveTab(category);
  }

  const { enrollCoures = [] } = useCoursesContext()

  return (
    <TabsWrapper>
      <div className='tabs'>
        <ul className='flex flex-wrap'>
          <li className='tabs-head-item'>
            <button type="button" className={`tab-btn ${activeTab === PYTHON}`} onClick={() => tabHandler(PYTHON)}>Python</button>
          </li>
          <li className='tabs-head-item'>
            <button type="button" className={`tab-btn ${activeTab === WEB_DEVELOPMENT}`} onClick={() => tabHandler(WEB_DEVELOPMENT)}>Web Development</button>
          </li>
          <li className='tabs-head-item'>
            <button type="button" className={`tab-btn ${activeTab === DATA_SCIENCE}`} onClick={() => tabHandler(DATA_SCIENCE)}>Data Science</button>
          </li>
          <li className='tabs-head-item'>
            <button type="button" className={`tab-btn ${activeTab === AWS}`} onClick={() => tabHandler(AWS)}>AWS Certification</button>
          </li>
        </ul>

        <div className='tabs-body'>
          {
            courses.filter(course => course.category === activeTab).map((course) => (
              <Course key={course.id} {...course} isAlreadyEnrolled={enrollCoures.includes(course.id)} />
            ))
          }
        </div>
      </div>
    </TabsWrapper>

  )
}

const TabsWrapper = styled.div`
    .tabs{
      margin-top: 16px;
      .tabs-head-item button{
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
  
      .tabs-body{
        margin-top: 32px;
      }
  
      @media screen and (min-width: 600px){
        .tabs-body{
          display: grid;
          gap: 26px;
          grid-template-columns: repeat(2, 1fr);
        }
      }
  
      @media screen and (min-width: 992px){
        .tabs-body{
          grid-template-columns: repeat(3, 1fr);
        }
      }
  
      @media screen and (min-width: 1400px){
        .tabs-body{
          grid-template-columns: repeat(4, 1fr);
        }
      }
    }
  `;


export default Tabs