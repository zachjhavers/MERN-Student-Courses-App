const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentNumber: {
    type: String,
    required: [true, "Student number required"],
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
  firstName: {
    type: String,
    required: [true, "First name required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name required"],
  },
  address: String,
  city: String,
  phoneNumber: String,
  email: String,
  program: String,
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});

module.exports = mongoose.model("Student", studentSchema);
