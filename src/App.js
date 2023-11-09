
import './App.css';
import { Routes , Route, BrowserRouter } from 'react-router-dom';
import {HomePage , CoursePage , SingleCoursePage} from './pages';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import StudentDetails from './pages/StudentCourses';
import { CloseList, OpenList, ProgressList } from './components/SearchBar';

function App() {
  return (
    <BrowserRouter>
   <Navbar />
   <Sidebar />
   <Routes>
    <Route  path='/'  element={< SignIn/>}/>
    <Route  path='/home'  element={< HomePage/>}/>
    <Route  path='/courses/:id'  element={< SingleCoursePage/>}/>
    <Route  path='/category/:category'  element={< CoursePage/>}/>
    <Route path="/student/:studentId"  element={<StudentDetails/>} />
    <Route path="/status/:enrollmentStatus"  element={<CloseList/>} />
    <Route path="/matter/:enrollmentStatus"  element={<ProgressList/>} />
    <Route path="/enroll/:enrollmentStatus"  element={<OpenList/>} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
