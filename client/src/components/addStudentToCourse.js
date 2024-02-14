import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    courseCode: "",
    courseName: "",
    section: "",
    semester: "",
    students: [],
    selectedStudent: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const courseId = params.id.toString();

      const courseResponse = await fetch(
        `http://localhost:5000/course/${courseId}`
      );

      if (!courseResponse.ok) {
        const message = `An error has occurred: ${courseResponse.statusText}`;
        window.alert(message);
        return;
      }

      const course = await courseResponse.json();

      if (!course) {
        window.alert(`Course with id ${courseId} not found`);
        navigate("/");
        return;
      }

      const studentsResponse = await fetch("http://localhost:5000/student");
      const students = await studentsResponse.json();

      setForm({
        ...course,
        students,
        selectedStudent: "",
      });
    }

    fetchData();
  }, [params.id, navigate]);

  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!form.selectedStudent) {
      window.alert("Please select a student.");
      return;
    }

    const studentId = form.selectedStudent;

    const editedCourse = {
      studentId: studentId,
    };

    await fetch(`http://localhost:5000/course/${params.id}/addStudent`, {
      method: "POST",
      body: JSON.stringify(editedCourse),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }

  return (
    <div>
      <br></br>
      <h3>Add Student To Course</h3>
      <br></br>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="selectedStudent">Select Student</label>
          <select
            className="form-control"
            id="selectedStudent"
            value={form.selectedStudent}
            onChange={(e) => updateForm({ selectedStudent: e.target.value })}
          >
            <option value="">Select a student</option>
            {form.students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.firstName} {student.lastName}
              </option>
            ))}
          </select>
        </div>

        <br></br>
        <div className="form-group">
          <input
            type="submit"
            value="Update Course"
            className="btn btn-primary"
          />
        </div>
        <br></br>
      </form>
    </div>
  );
}
