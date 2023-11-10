import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import {MdInfo} from "react-icons/md";
import {TbWorld} from "react-icons/tb";
import {RiClosedCaptioningFill} from "react-icons/ri";
import {BiCheck} from "react-icons/bi";
import { useNavigate, useParams } from 'react-router-dom';
import { styled as styles } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Button } from '@mui/material';
import { useCoursesContext } from '../context/coursesContext';
import { Modal, TextField } from '@mui/material';

const BorderLinearProgress = styles(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));


const StudentDetails = () => {
  const [studentData, setStudentData] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [courseId, setCourseId] = useState('');
  const [studentIds, setStudentId] = useState('');
  const { studentId } = useParams();
  const [message, setMessage] = useState('');
  const { setStudentCourses , studentCourses} = useCoursesContext();
  const [courseStatus, setCourseStatus] = useState('In Complete');
  console.log("enroled courses", studentCourses)
  useEffect(() => {
    // Make an HTTP GET request to fetch student data from your backend API
    axios.get(`http://localhost:3001/student/${studentId}`)
    .then((response) => {
        console.log("student res", response.data);
        setStudentData(response.data);
        setStudentCourses(response.data?.enrolledCourses || [])
      })
      
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });
  }, [studentId]);
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/home');
  }
  const handleUpdateStatus = async () => {
    try {
      const response = await axios.patch(`http://localhost:3001/courses/updateStatus/${studentId}`, {
        courseId,
        courseDone: 'Completed',
      });

      if (response.status === 200) {
        setMessage(response.data.message);
      } else {
        setMessage(response.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
  <Button onClick={onClick}>Go To Home</Button>     

        {studentData && studentData.enrolledCourses.map((course) => (
          <>
          <h2 style={{ marginLeft:'500px' , marginBottom:'50px' , marginTop:'30px'}}>Enrollment Count: {studentData.enrollmentCount}</h2>
          {console.log(localStorage.setItem("enroll" , studentData.enrollmentCount))}
       <StudentCourseWrapper>
      <div className='course-intro mx-auto grid'>
        <div className='course-img'>
        {course.image && <img src={course.image} alt="Course Image" />}
        </div>
        <div className='course-details'>
          <div className='course-category bg-white text-dark text-capitalize fw-6 fs-12 d-inline-block'>{course.category}</div>
          <CourseUpdate  course={course.courseDone}/>
        

          <div className='course-head'>
            <h5>{course.courseName}</h5>
          </div>
          <div className='course-body'>
            <p className='course-para fs-18'>{course.description}</p>
            <div className='course-rating flex'>
              <span className='students-count fs-14'>Duration : {course.duration}</span>
              <span className='students-count fs-14'> Enrollment-Status : {course.enrollmentStatus}</span>
            </div>
            <h2>Progrees Bar</h2>
            <BorderLinearProgress variant="determinate" value={50} />
            <ul className='course-info'>
              <li>
                <h4 className='fs-14'>Instructor <span className='fw-6 opacity-08'>{course.creator}</span></h4>
              </li>
              <li className='flex'>
                <span><MdInfo /></span>
                <span className='fs-14 course-info-txt fw-5'>Pre-Requisites : {course.prerequisites}</span>
              </li>
              <li className='flex'>
                <span><TbWorld /></span>
                <span className='fs-14 course-info-txt fw-5'>Mode : {course.location}</span>
              </li>
              <li className='flex'>
                <span><RiClosedCaptioningFill /></span>
                <span className='fs-14 course-info-txt fw-5'> Schedule : {course.schedule}</span>
              </li>
            </ul>
          </div>

          <div className='course-foot'>
            <div className='course-price'>
              <span className='new-price fs-26 fw-8'>${course.price}</span>
          
            </div>
          </div>
        </div>
      </div>

      <div className='course-full bg-white text-dark'>
        <div className='course-learn mx-auto'>
          <div className='course-sc-title'>What you'll learn</div>
          <ul className='course-learn-list grid'>
          {course.learn && course.learn.map((learning, idx) => (
  <li key={idx}>
    <span><BiCheck /></span>
    <span className='fs-14 fw-5 opacity-09'>{learning}</span>
  </li>
))}
          </ul>
        </div>

        <div className='course-content mx-auto'>
          <div className='course-sc-title'>Course content</div>
          <ul className='course-content-list'>
            {
              course.content && course.content.map((contentItem, idx) => {
                return (
                  <li key = {idx}>
                    <span>{contentItem}</span>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </StudentCourseWrapper>
    </>
     ))}
   </>
  );
};

const StudentCourseWrapper = styled.div`

background: var(--clr-dark);
  color: var(--clr-white);

 
  .course-intro{
    padding: 40px 16px;
    max-width: 992px;

    .course-details{
      padding-top: 20px;
    }

    .course-category{
      padding: 0px 8px;
      border-radius: 6px;
    }

    .course-head{
      font-size: 38px;
      line-height: 1.2;
      padding: 12px 0 0 0;
    }
    .course-para{
      padding: 12px 0;
    }
    .rating-star-val{
      margin-right: 7px;
      padding-bottom: 5px;
      color: var(--clr-orange);
    }
    .students-count{
      margin-left: 8px;
    }
    .rating-count{
      margin-left: 6px;
      color: #d097f6;
    }
    .course-info{
      li{
        margin-bottom: 2px;
        &:nth-child(2){
          margin-top: 10px;
        }
      }
      .course-info-txt{
        text-transform: capitalize;
        margin-left: 8px;
        margin-bottom: 4px;
      }
    }
    .course-price{
      margin-top: 12px;
      .old-price{
        color: #eceb98;
        text-decoration: line-through;
        margin-left: 10px;
      }
    }
    .course-btn{
      margin-top: 16px;
      .add-to-cart-btn{
        padding: 12px 28px;
        span{
          margin-left: 12px;
        }
      }
    }


    @media screen and (min-width: 880px){
      grid-template-columns: repeat(2, 1fr);
      column-gap: 40px;
      .course-details{
        padding-top: 0;
      }
      .course-img{
        order: 2;
      }
    }

    @media screen and (min-width: 1400px){
      grid-template-columns: 60% 40%;
    }
  }

  .course-full{
    padding: 40px 16px;
    .course-sc-title{
      font-size: 22px;
      font-weight: 700;
      margin: 12px 0;
    }
    .course-learn{
      max-width: 992px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 12px 28px 22px 28px;

      .course-learn-list{
        li{
          margin: 5px 0;
          display: flex;
          span{
            &:nth-child(1){
              opacity: 0.95;
              margin-right: 12px;
            }
          }
        }

        @media screen and (min-width: 992px){
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }

    .course-content{
      max-width: 992px;
      margin-top: 30px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 12px 28px 22px 28px;

      .course-content-list{
        li{
          background-color: #f7f9fa;
          padding: 12px 18px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          margin-bottom: 10px;
          font-weight: 800;
          font-size: 15px;
        }
      }
    }
  }

`;





function CourseUpdate({course}) {
  const [studentId, setStudentId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [message, setMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleUpdateStatus = async () => {
    try {
      const response = await axios.patch(`http://localhost:3001/courses/updateStatus/${studentId}`, {
        studentId,
        courseId,
        courseStatus: 'Completed',
      });

      if (response.status === 200) {
        setMessage(response.data.message);
        handleCloseModal(); // Close the modal after successful update
      } else {
        setMessage(response.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (studentId && courseId) {
      handleUpdateStatus();
    }
  }, [studentId, courseId]);

  return (
    <div>
      <h1>Update Course Status</h1>
      <div
        className='course-category bg-white text-dark text-capitalize fw-6 fs-12 d-inline-block'
        onClick={handleOpenModal}
      >
        {course}
      </div>

      {/* Modal for inputting student ID and course ID */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' , backgroundColor:'white' , padding:'20px' }}>
          <TextField
            label="Student ID"
            variant="outlined"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <TextField
            label="Course ID"
            variant="outlined"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleUpdateStatus}>
            Submit
          </Button>
        </div>
      </Modal>

      {message && <p>{message}</p>}
    </div>
  );
}


export default StudentDetails;
