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

  // app.get('/courses/:id', async (req, res) => {
  //   const { id } = req.params; 
  //   studentModel.findOne({ id: id })
  //     .then(course => {
  //       if (course) {
  //         res.json(course); 
  //       } else {
  //         res.status(404).json({ message: "No such course" });
  //       }
  //     })
  //     .catch(error => {
  //       res.status(500).json({ message: "Internal server error" });
  //     });
  // });
  



app.listen(3001 , () => {
    console.log("Server is running on port ")
});
