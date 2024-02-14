const Course = require("../Models/CourseModel");

module.exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).populate("students");
    res.json(courses);
  } catch (error) {
    console.error("Could not get courses", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.json(course);
  } catch (error) {
    console.error("Could not get course", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.addCourse = async (req, res) => {
  try {
    const { courseCode, courseName, section, semester } = req.body;
    const newCourse = await Course.create({
      courseCode,
      courseName,
      section,
      semester,
    });
    res.json(newCourse);
  } catch (error) {
    console.error("Could not add course", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.addStudentToCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const studentId = req.body.studentId;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.students.push(studentId);

    await course.save();

    res.json({ message: "Student added to course", course });
  } catch (error) {
    console.error("Could not add student to course", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.updateCourse = async (req, res) => {
  try {
    const { courseCode, courseName, section, semester } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { courseCode, courseName, section, semester },
      { new: true }
    );
    res.json(updatedCourse);
  } catch (error) {
    console.error("Couyld not update course", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course was deleted" });
  } catch (error) {
    console.error("Could not delete course", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
