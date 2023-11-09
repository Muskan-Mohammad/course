import React, { useContext, useReducer, useEffect, useState } from "react";
import { GET_CATEGORIES, GET_COURSES, GET_SINGLE_COURSE } from "../actions";
import reducer from "../reducers/courseReducers";
import axios from "axios";
import Users from "../utils/data";



const CoursesContext = React.createContext();

export const CoursesProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [studentCourses, setStudentCourses] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:3001/courses')
            .then((res) => setCourses(res.data));
    }, []);

    const initialState = {
        categories: [],
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchCategories = () => {
        const categories = [...new Set(Users.map(item => item.category))];
        dispatch({ type: GET_CATEGORIES, payload: categories });
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const coursesEnrollById = (studentCourses || []).reduce((prev, curr) => {
        prev[curr.id] = curr;
        return prev;
    }, {});

    const coursesList = (courses || []).map(course => {
        if (coursesEnrollById[course.id]) {
            return {
                ...course,
                coursesEnrollById
            }
        }
        return course;
    })
    console.log(":: COurses Context ::", { courses, coursesEnrollById, studentCourses, courses })
    return (
        <CoursesContext.Provider value={{
            ...state,
            studentCourses,
            setStudentCourses,
            courses: coursesList,
            enrollCoures: Object.keys(coursesEnrollById)
        }}>
            {children}
        </CoursesContext.Provider>
    )
}

export const useCoursesContext = () => {
    return useContext(CoursesContext);
}
