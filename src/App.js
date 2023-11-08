
import './App.css';
import { Routes , Route, BrowserRouter } from 'react-router-dom';
import {HomePage , CoursePage , SingleCoursePage, CartPage} from './pages';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
   <Navbar />
   <Sidebar />
   <Routes>
    <Route  path='/'  element={< HomePage/>}/>
    <Route  path='/courses/:id'  element={< SingleCoursePage/>}/>
    <Route  path='/category/:category'  element={< CoursePage/>}/>
    <Route  path='/cart'  element={< CartPage/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
