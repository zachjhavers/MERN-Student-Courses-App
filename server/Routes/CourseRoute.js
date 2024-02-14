const {
  getCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
  addStudentToCourse,
} = require("../Controllers/CourseController");

const router = require("express").Router();

router.get("/course", getCourses);
router.post("/course/add", addCourse);
router.delete("/course/:id", deleteCourse);
router.post("/course/update/:id", updateCourse);
router.get("/course/:id", getCourseById);
router.post("/course/:id/addStudent", addStudentToCourse);

module.exports = router;
