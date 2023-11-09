import React, {useContext, useReducer, useEffect, useState} from "react";
import { GET_CATEGORIES, GET_COURSES, GET_SINGLE_COURSE } from "../actions";
import reducer from "../reducers/courseReducers";
import axios from "axios";



const CoursesContext = React.createContext();

export const CoursesProvider = ({children}) => {
    const [courses , setCourses] = useState([]);


   useEffect(()=>{
    axios.get('http://localhost:3001/courses')
    .then((res)=>{
        setCourses(res.data)   
    }     
    )
   } , []);

 
    const initialState = {
        categories: [],
    };
    const [state, dispatch] = useReducer(reducer, initialState);
     
    const fetchCategories = () => {
        const categories = [...new Set(courses.map(item => item.category))];
        dispatch({type: GET_CATEGORIES, payload: categories});
    }

    useEffect(() => {
         fetchCategories();
    }, []);

    return (
        <CoursesContext.Provider value = {{
            ...state,
            courses
        }}>
            {children}
        </CoursesContext.Provider>
    )
}

export const useCoursesContext = () => {
    return useContext(CoursesContext);
}
