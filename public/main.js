const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentModel = require('./database');

const app = express();
app.use(express.json());
app.use(cors());


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

  app.get('/courses/:id', async (req, res) => {
    const { id } = req.params; 
    studentModel.findOne({ id: id })
      .then(course => {
        if (course) {
          res.json(course); 
          // console.log(course , "details")
        } else {
          res.status(404).json({ message: "No such course" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Internal server error" });
      });
  });


  app.get('/student/:studentId', async (req, res) => {
    const studentIdToDisplay = parseInt(req.params.studentId);

    try {
      const courses = await studentModel.find().exec();
  
      // Step 1: Extract Student IDs and Count
      const studentCounts = {};
      courses.forEach((course) => {
        course.students.forEach((student) => {
          const studentId = student.id;
          if (studentCounts[studentId]) {
            studentCounts[studentId]++;
          } else {
            studentCounts[studentId] = 1;
          }
        });
      });
      // Step 2: Display Data of a Specific Student
      const coursesWithStudent = courses.filter((course) =>
        course.students.some((student) => student.id === studentIdToDisplay)
      );
  
      if (coursesWithStudent.length > 0) {
        const studentData = {
          studentId: studentIdToDisplay,
          enrolledCourses: coursesWithStudent.map((course) => ({
            courseName: course.course_name,
            creator:course.creator,
            category:course.category,
            description:course.description,
            image:course.image,
            duration:course.duration,
            location:course.location,
            enrollmentStatus:course.enrollmentStatus,
            schedule:course.schedule,
            prerequisites:course.prerequisites,
            update:course.updated_date,
            price:course.discounted_price,
            content:course.content,
            learn:course.what_you_will_learn

          })),
          enrollmentCount: studentCounts[studentIdToDisplay] || 0,
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
  
  // app.get('/search', (req, res) => {
  //   const query = req.query.query.toLowerCase(); 
  //   const results = studentModel.filter((course) => {
  //     return (
  //       course.duration.toLowerCase().includes(query) ||
  //       course.description.toLowerCase().includes(query) ||
  //       course.enrollmentStatus.toLowerCase().includes(query) ||
  //       course.content.join(' ').toLowerCase().includes(query) ||
  //       course.category.toLowerCase().includes(query) ||
  //       course.creator.toLowerCase().includes(query) ||
  //       course.enrollmentStatus.toLowerCase().includes(query) ||
  //       course.course_name.toLowerCase().includes(query)       
  //     );
  //   });
  //   res.json(results);
  // });
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
