import React , {useState} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCartContext } from '../context/cartContext';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const Course = (props) => {
  const { id, image, course_name, creator, discounted_price, category, isAlreadyEnrolled } = props;
  const { addToCart } = useCartContext();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleEnrollClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleEnrollSubmit = (data) => {
    console.log('Enrollment data:', data);
  };

  return (
    <CourseCard>
      <div className='item-img'>
        <img src={image} alt={course_name} />
      </div>
      <div className='item-body'>
        <h5 className='item-name'>{course_name}</h5>
        <span className='item-creator'>Instructor : {creator}</span>

        <div className='item-price'>
          <span className='item-price-new'>${discounted_price}</span>
        </div>
      </div>
      <div className='item-btns flex'>
        {/* <Link to={`/courses/${id}`} className="item-btn see-details-btn">See details</Link> */}
        {isAlreadyEnrolled ? <>Already Enrolled</> :
         <button  className='item-btn add-to-cart-btn' onClick={handleEnrollClick}
        >Enroll Now</button>}
          {isDialogOpen && <App onClose={handleCloseDialog} onSubmit={handleEnrollSubmit} />}
      </div>
    </CourseCard>
  )
}







function App() {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleEnrollClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEnrollSubmit = () => {
    // Handle enrollment data here
    console.log('Enrollment data:', { id, name, email });
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleEnrollClick}>
        Enroll Now
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enroll Now</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="id"
            label="ID"
            type="text"
            fullWidth
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="text"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleEnrollSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}






const CourseCard = styled.div`
    margin-bottom: 20px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 24px;
    display: flex;
    flex-direction: column;
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

export default Course;