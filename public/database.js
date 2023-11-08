const mongoose = require('mongoose');

const studentsSchema  = new mongoose.Schema({
    id:String,
    category:String,
     image:String,
    course_name:String,
     description:[String],
    duration:String,
    location:String,
    enrollmentStatus:String,
    schedule:String,
    prerequisites:[String],
    creator:String,
    updated_date:String,
    lang:String,
    discounted_price:Number,
    what_you_will_learn:[String],
     content:[String],
    students: [
        {
          id: Number,
          name: String,
          email: String,
        },
      ],
    
});

const studentModel = mongoose.model("learner" , studentsSchema);

module.exports = studentModel;
