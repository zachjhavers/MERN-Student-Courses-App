import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Course = (props) => (
  <tr>
    <td>{props.course.courseCode}</td>
    <td>{props.course.courseName}</td>
    <td>{props.course.section}</td>
    <td>{props.course.semester}</td>
    <td>
      {props.course.students.map((student) => student.firstName).join(", ")}
    </td>
    <td>
      <Link className="btn btn-link" to={`/editCourse/${props.course._id}`}>
        Edit
      </Link>{" "}
      |
      <Link className="btn btn-link" to={`/addStudent/${props.course._id}`}>
        Add Student
      </Link>{" "}
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteCourse(props.course._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function getCourses() {
      const response = await fetch(`http://localhost:5000/course/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const courses = await response.json();
      setCourses(courses);
    }
    getCourses();
  }, []);

  async function deleteCourse(id) {
    await fetch(`http://localhost:5000/course/${id}`, {
      method: "DELETE",
    });
    const newCourses = courses.filter((el) => el._id !== id);
    setCourses(newCourses);
  }

  return (
    <div>
      <h3>Course List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Section</th>
            <th>Semester</th>
            <th>Students</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <Course
              course={course}
              deleteCourse={() => deleteCourse(course._id)}
              key={course._id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
