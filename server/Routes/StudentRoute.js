const express = require("express");
const studentRoutes = express.Router();
const studentController = require("../Controllers/StudentController");

studentRoutes.route("/student").get(studentController.getStudents);
studentRoutes.route("/student/:id").get(studentController.getStudentById);
studentRoutes.route("/student/add").post(studentController.addStudent);
studentRoutes
  .route("/student/update/:id")
  .post(studentController.updateStudent);
studentRoutes.route("/student/:id").delete(studentController.deleteStudent);

module.exports = studentRoutes;
