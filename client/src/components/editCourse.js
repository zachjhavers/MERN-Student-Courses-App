import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
export default function Edit() {
  const [form, setForm] = useState({
    courseCode: "",
    courseName: "",
    section: "",
    semester: "",
    courses: [],
  });
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5000/course/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const course = await response.json();
      if (!course) {
        window.alert(`Course with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(course);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  async function onSubmit(e) {
    e.preventDefault();
    const editedCourse = {
      courseCode: form.courseCode,
      courseName: form.courseName,
      section: form.section,
      semester: form.semester,
    };

    await fetch(`http://localhost:5000/course/update/${params.id}`, {
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
      <h3>Update Course</h3>
      <br></br>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="courseCode">Course Code</label>
          <input
            type="text"
            className="form-control"
            id="courseCode"
            value={form.courseCode}
            onChange={(e) => updateForm({ courseCode: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseName">Course Name</label>
          <input
            type="text"
            className="form-control"
            id="courseName"
            value={form.courseName}
            onChange={(e) => updateForm({ courseName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="section">Section</label>
          <input
            type="text"
            className="form-control"
            id="section"
            value={form.section}
            onChange={(e) => updateForm({ section: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="semester">Semester</label>
          <input
            type="text"
            className="form-control"
            id="semester"
            value={form.semester}
            onChange={(e) => updateForm({ semester: e.target.value })}
          />
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
