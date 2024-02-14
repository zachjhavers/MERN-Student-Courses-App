const Student = require("../Models/StudentModel");

module.exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.json(students);
  } catch (error) {
    console.error("Could not get students", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.json(student);
  } catch (error) {
    console.error("Could not find student", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.addStudent = async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.json(newStudent);
  } catch (error) {
    console.error("Could not add student", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedStudent);
  } catch (error) {
    console.error("Could not update student", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (error) {
    console.error("Could not delete student", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
