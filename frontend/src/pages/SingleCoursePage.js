import React, {useEffect, useState} from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import styled from "styled-components";
import { useCoursesContext } from '../context/coursesContext';
import {MdInfo} from "react-icons/md";
import {TbWorld} from "react-icons/tb";
import {FaShoppingCart} from "react-icons/fa";
import {RiClosedCaptioningFill} from "react-icons/ri";
import {BiCheck} from "react-icons/bi";
import {Link} from "react-router-dom";
import { useCartContext } from '../context/cartContext';
import axios from 'axios';

const SingleCoursePage = () => {
  const {id} = useParams();

  const [course, setCourse] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:3001/courses/${id}`)
      .then(response => {
        console.log( "data" , response )
        setCourse(response.data);
      })
      .catch(error => {
        console.error('Error fetching course data:', error);
      });
  }, [id]);


  return (
    <SingleCourseWrapper>
      <div className='course-intro mx-auto grid'>
        <div className='course-img'>
        {course.image && <img src={course.image} alt="Course Image" />}
        </div>
        <div className='course-details'>
          <div className='course-category bg-white text-dark text-capitalize fw-6 fs-12 d-inline-block'>{course.category}</div>
          <div className='course-head'>
            <h5>{course.course_name}</h5>
          </div>
          <div className='course-body'>
            <p className='course-para fs-18'>{course.description}</p>
            <div className='course-rating flex'>
              <span className='students-count fs-14'>Duration : {course.duration}</span>
              <span className='students-count fs-14'> Enrollment-Status : {course.enrollmentStatus}</span>
            </div>

            <ul className='course-info'>
              <li>
                <span className='fs-14'>Instructor <span className='fw-6 opacity-08'>{course.creator}</span></span>
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
              <span className='new-price fs-26 fw-8'>${course.discounted_price}</span>
              
            </div>
          </div>

          <div className='course-btn'>
            <Link to = "/cart" className='add-to-cart-btn d-inline-block fw-7 bg-purple' 
            // onClick={() => addToCart( image, course_name, creator, discounted_price, category)}
            >
              <FaShoppingCart /> Enrolled 
            </Link>
          </div>
        </div>
      </div>

      <div className='course-full bg-white text-dark'>
        <div className='course-learn mx-auto'>
          <div className='course-sc-title'>What you'll learn</div>
          <ul className='course-learn-list grid'>
          {course.what_you_will_learn && course.what_you_will_learn.map((learnItem, idx) => (
  <li key={idx}>
    <span><BiCheck /></span>
    <span className='fs-14 fw-5 opacity-09'>{learnItem}</span>
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
    </SingleCourseWrapper>
  )
}

const SingleCourseWrapper = styled.div`
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

export default SingleCoursePage