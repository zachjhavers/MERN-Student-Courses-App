import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Student = (props) => (
  <tr>
    <td>{props.student.studentNumber}</td>
    <td>{props.student.password}</td>
    <td>{props.student.firstName}</td>
    <td>{props.student.lastName}</td>
    <td>{props.student.address}</td>
    <td>{props.student.city}</td>
    <td>{props.student.phoneNumber}</td>
    <td>{props.student.email}</td>
    <td>{props.student.program}</td>
    <td>
      <Link className="btn btn-link" to={`/editStudent/${props.student._id}`}>
        Edit
      </Link>{" "}
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteStudent(props.student._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);
export default function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function getStudents() {
      const response = await fetch(`http://localhost:5000/student/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const students = await response.json();
      setStudents(students);
    }
    getStudents();
    return;
  }, [students.length]);

  async function deleteStudent(id) {
    await fetch(`http://localhost:5000/student/${id}`, {
      method: "DELETE",
    });
    const newStudents = students.filter((el) => el._id !== id);
    setStudents(newStudents);
  }

  function studentList() {
    return students.map((student) => {
      return (
        <Student
          student={student}
          deleteStudent={() => deleteStudent(student._id)}
          key={student._id}
        />
      );
    });
  }

  return (
    <div>
      <h3>Student List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Student Number</th>
            <th>Password</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Phone number</th>
            <th>Email</th>
            <th>Program</th>
          </tr>
        </thead>
        <tbody>{studentList()}</tbody>
      </table>
    </div>
  );
}
