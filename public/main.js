const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentModel = require('./database');
// const Users = require('../src/utils/data');

const app = express();
app.use(express.json());
app.use(cors());

// console.log("users" , Users);

mongoose.connect("mongodb://localhost:27017/students" , { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


app.post('/courses', async (req, res) => {
    try {
      const data = req.body; 
      const course = new studentModel(data);
      await course.save();
      res.status(201).json({ message: 'Course data saved successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error saving course data', error });
    }
  });

  app.get('/courses', async (req, res) => {
    try {
      const allProducts = await studentModel.find(); 
      res.status(200).json(allProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Error fetching products' });
    }
  });

  // app.get('/courses/:id', async (req, res) => {
  //   const { id } = req.params; 
  //   studentModel.findOne({ id: id })
  //     .then(course => {
  //       if (course) {
  //         res.json(course); 
  //         // console.log(course , "details")
  //       } else {
  //         res.status(404).json({ message: "No such course" });
  //       }
  //     })
  //     .catch(error => {
  //       res.status(500).json({ message: "Internal server error" });
  //     });
  // });
  app.get('/courses/categories/:category', async (req, res) => {
    const { category } = req.params;
  
    studentModel.find({ category: category })
      .then(courses => {
        if (courses.length > 0) {
          res.json(courses);
        } else {
          res.status(404).json({ message: `No courses found in the ${category} category` });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ message: "Internal server error" });
      });
  });
  
  
  
  

  app.get('/student/:studentId', async (req, res) => {
    const studentIdToDisplay = parseInt(req.params.studentId);
  
    try {
      const courses = await studentModel.find().exec();
  
      // Step 1: Extract Student IDs, Emails, and Count
      const studentData = {};
      courses.forEach((course) => {
        course.students.forEach((student) => {
          const studentId = student.id;
          const studentEmail = student.email;
          if (!studentData[studentId]) {
            studentData[studentId] = {
              email: studentEmail,
              count: 0,
            };
          }
          studentData[studentId].count++;
        });
      });
  
      // Step 2: Display Data of a Specific Student
      const studentInfo = studentData[studentIdToDisplay];
      if (studentInfo) {
        const coursesWithStudent = courses.filter((course) =>
          course.students.some((student) => student.id === studentIdToDisplay)
        );
  
        const studentData = {
          studentId: studentIdToDisplay,
          studentEmail: studentInfo.email,
          enrollmentCount: studentInfo.count,
          enrolledCourses: coursesWithStudent.map((course) => ({
            courseName: course.course_name,
            id:course.id,
            creator: course.creator,
            category: course.category,
            description: course.description,
            image: course.image,
            duration: course.duration,
            location: course.location,
            enrollmentStatus: course.enrollmentStatus,
            schedule: course.schedule,
            prerequisites: course.prerequisites,
            update: course.updated_date,
            price: course.discounted_price,
            content: course.content,
            learn: course.what_you_will_learn
          })),
          
        };
  
        res.json(studentData);
      } else {
        res.status(404).json({ message: 'Student not found in any courses' });
      }
    } catch (error) {
      console.error('Error handling student data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.post("/student/:studentId" , (req , res) => {
    const {email , id} = req.body;
    studentModel.findOne({email:email})
    .then(users => {
        if(users){
            if(users.id === id){
                res.json("Success")
            } else {
                res.json("User  Incorrect ")
            }
        } else {
            res.json("No Such User Found ")
        }
    })
})

 

app.get('/home/search', async (req, res) => {
  const { q } = req.query;
  const keys = ["category", "course_name", "duration", "creator", "description", "content"];

  const search = async () => {
    try {
      const data = await studentModel.find().exec();
      return data.filter((item) => {
        return keys.some((key) => item[key] && item[key].toLowerCase().includes(q.toLowerCase()));
      });
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  try {
    const searchResults = await search();
    res.json(searchResults.slice(0, 10));
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});


  app.get('/status/:enrollmentStatus', async (req, res) => {
    studentModel.find({ enrollmentStatus: "Close" })
      .then(course => {
        if (course) {
          res.json(course); 
          // console.log(course , "details")
        } else {
          res.status(404).json({ message: "No such status" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Internal server error" });
      });
  });
  
  app.get('/enroll/:enrollmentStatus', async (req, res) => {
    studentModel.find({ enrollmentStatus: "Open" })
      .then(course => {
        if (course) {
          res.json(course); 
          // console.log(course , "details")
        } else {
          res.status(404).json({ message: "No such status" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Internal server error" });
      });
  });

  app.get('/matter/:enrollmentStatus', async (req, res) => {
    studentModel.find({ enrollmentStatus: "In Progress" })
      .then(course => {
        if (course) {
          res.json(course); 
          // console.log(course , "details")
        } else {
          res.status(404).json({ message: "No such status" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Internal server error" });
      });
  });
  
  
  


app.listen(3001 , () => {
    console.log("Server is running on port ")
});
