const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: [true, "Course code required"],
  },
  courseName: {
    type: String,
    required: [true, "Course name required"],
  },
  section: {
    type: String,
    required: [true, "Section required"],
  },
  semester: {
    type: String,
    required: [true, "Semester required"],
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

module.exports = mongoose.model("Course", courseSchema);
