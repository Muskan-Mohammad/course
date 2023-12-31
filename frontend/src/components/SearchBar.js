import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';



                                                                             
function SearchBar() {
  const [query, setQuery] = useState('');
  const keys = ["category", "course_name", "duration" , "creator" , "description" ,"content" ];
 const search = (data) => {
  return data.filter(
    (item) => keys.some()
  )
 }
return (
    <div>
      <input
        type="text"
        placeholder="Search for courses"
        onChange={(e) => setQuery(e.target.value)}
        style={{marginTop:'2rem' , border:'2px solid black' , padding:'10px' , marginLeft:'5rem'}}
      />
 {/* <Table  data={Users}/>  */}
    </div>
  );
}

export default SearchBar;

function Table ({data}){
  return(
    <table>
      <tbody>
        <tr>
          <th>CourseName</th>  
          <th>Category</th>  
          <th>Duration</th>
          <th>Creator</th>

        </tr>
        {data.map(item => (
        <tr>
        <td>{item.course_name}</td>
          <td>{item.category}</td>
          <td>{item.duration}</td>
          <td>{item.creator}</td>
          </tr>
           ))}
      </tbody>
       </table>
  )
}



 export function CloseList() {
  const [courses, setCourses] = useState([]);
  const [enrollmentStatus, setEnrollmentStatus] = useState('Close'); // Set the default status

  useEffect(() => {
    // Fetch data from the backend when the component mounts or when enrollmentStatus changes
    fetch(`http://localhost:3001/status/${enrollmentStatus}`)
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [enrollmentStatus]); // The effect runs whenever enrollmentStatus changes

  return (
    <div>
      <h2>Courses with Enrollment Status: {enrollmentStatus}</h2>
      <ul>
        {courses.map((course) => (
          <CourseCard>
          <div className='item-img'>
            <img src = {course.image} alt = {course.course_name} />
          </div>
          <div className='item-body'>
            <h5 className='item-name'>{course.course_name}</h5>
            <span className='item-creator'>Instructor : {course.creator}</span>
            
            <div className='item-price'>
              <span className='item-price-new'>${course.discounted_price}</span>  
            </div>
          </div>
          <div className='item-btns flex'>
            <Link to = {`/courses/${course.id}`} className = "item-btn see-details-btn">See details</Link>
          </div>
        </CourseCard>
        ))}
      </ul>
    </div>
  );
}

export function OpenList() {
    const [courses, setCourses] = useState([]);
    const [enrollmentStatus, setEnrollmentStatus] = useState('Open'); // Set the default status
  
    useEffect(() => {
      // Fetch data from the backend when the component mounts or when enrollmentStatus changes
      fetch(`http://localhost:3001/enroll/${enrollmentStatus}`)
        .then((response) => response.json())
        .then((data) => setCourses(data))
        .catch((error) => console.error('Error fetching data:', error));
    }, [enrollmentStatus]); // The effect runs whenever enrollmentStatus changes
  
    return (
      <div>
    
        <h2>Courses with Enrollment Status: {enrollmentStatus}</h2>
        <ul>
          {courses.map((course) => (
          <CourseCard>
          <div className='item-img'>
            <img src = {course.image} alt = {course.course_name} />
          </div>
          <div className='item-body'>
            <h5 className='item-name'>{course.course_name}</h5>
            <span className='item-creator'>Instructor : {course.creator}</span>
            
            <div className='item-price'>
              <span className='item-price-new'>${course.discounted_price}</span>  
            </div>
          </div>
          <div className='item-btns flex'>
            <Link to = {`/courses/${course.id}`} className = "item-btn see-details-btn">See details</Link>
          </div>
        </CourseCard>
          ))}
        </ul>
      </div>
    );
  }

  export function ProgressList() {
    const [courses, setCourses] = useState([]);
    const [enrollmentStatus, setEnrollmentStatus] = useState('In Progress'); // Set the default status
  
    useEffect(() => {
      // Fetch data from the backend when the component mounts or when enrollmentStatus changes
      fetch(`http://localhost:3001/matter/${enrollmentStatus}`)
        .then((response) => response.json())
        .then((data) => setCourses(data))
        .catch((error) => console.error('Error fetching data:', error));
    }, [enrollmentStatus]); // The effect runs whenever enrollmentStatus changes
  
    return (
      <div>
        <h2>Courses with Enrollment Status: {enrollmentStatus}</h2>
        <ul>
          {courses.map((course) => (
           <CourseCard>
           <div className='item-img'>
             <img src = {course.image} alt = {course.course_name} />
           </div>
           <div className='item-body'>
             <h5 className='item-name'>{course.course_name}</h5>
             <span className='item-creator'>Instructor : {course.creator}</span>
             
             <div className='item-price'>
               <span className='item-price-new'>${course.discounted_price}</span>  
             </div>
           </div>
           <div className='item-btns flex'>
             <Link to = {`/courses/${course.id}`} className = "item-btn see-details-btn">See details</Link>
           </div>
         </CourseCard>
          ))}
        </ul>
      </div>
    );
  }



  const CourseCard = styled.div`
  display: inline-block;
  vertical-align: top;
  margin-bottom: 40px;
  margin-right: 30px;
  margin-left: 40px;
  margin-top:40px;
    width:400px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 24px;
    .item-body{
      margin: 14px 0;
      padding: 4px 18px;
  
      .item-name{
        font-size: 15px;
        line-height: 1.4;
        font-weight: 800;
      }
      .item-creator{
        font-size: 12.5px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.6);
      }
      .rating-star-val{
        margin-bottom: 5px;
        font-size: 14px;
        font-weight: 800;
        color: #b4690e;
        margin-right: 6px;
      }
      .rating-count{
        font-size: 12.5px;
        margin-left: 3px;
        font-weight: 500;
        opacity: 0.8;
      }
      .item-price-new{
        font-weight: 700;
        font-size: 15px;
      }
      .item-price-old{
        opacity: 0.8;
        font-weight: 500;
        text-decoration: line-through;
        font-size: 15px;
        margin-left: 8px;
      }
    }
  
    .item-btns{
      justify-self: flex-start;
      padding: 4px 8px 30px 18px;
      margin-top: auto;
      .item-btn{
        font-size: 15px;
        display: inline-block;
        padding: 6px 16px;
        font-weight: 700;
        transition: var(--transition);
        white-space: nowrap;
  
        &.see-details-btn{
          background-color: transparent;
          border: 1px solid var(--clr-black);
          margin-right: 5px;
  
          &:hover{
            background-color: rgba(0, 0, 0, 0.9);
            color: var(--clr-white);
          }
        }
  
        &.add-to-cart-btn{
          background: rgba(0, 0, 0, 0.9);
          color: var(--clr-white);
          border: 1px solid rgba(0, 0, 0, 0.9);
  
          &:hover{
            background-color: transparent;
            color: rgba(0, 0, 0, 0.9);
          }
        }
      }
    }
  `;
