import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useCoursesContext } from '../context/coursesContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
       Muskan
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function SignIn() {
  const [id , setId] = React.useState();
  const [email , setEmail] = React.useState();
  const {courses} = useCoursesContext();
    const navigate = useNavigate();
  const handleSubmit = (event) => {
   
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const studentIds = courses.reduce((result, course) => {
      return result.concat(course.students.map(student => student.id));
    }, []);
    const uniqueStudentIds = [...new Set(studentIds)];
    console.log("ids",uniqueStudentIds);
     
    const enteredEmail  =data.get('email');
    const enteredId = data.get('id');
    localStorage.setItem('studentId', enteredId);
    // localStorage.getItem('studentId', enteredId);
    console.log({
      email: data.get('email'),
      id: data.get('id'),
    });
    if (enteredId && uniqueStudentIds.includes(parseInt(enteredId))) {
      setEmail(enteredEmail);
      setId(enteredId);
      navigate(`/student/${enteredId}`);
    } else {
      toast.error("Invalid Student ID")
      console.log("Error: Invalid ID");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="m"  >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 9,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <ToastContainer />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
            
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="id"
              label="ID"
              type="id"
              id="id"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}