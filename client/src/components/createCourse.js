import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [form, setForm] = useState({
    courseCode: "",
    courseName: "",
    section: "",
    semester: "",
  });

  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newCourse = { ...form };
    await fetch("http://localhost:5000/course/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCourse),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    setForm({
      courseCode: "",
      courseName: "",
      section: "",
      semester: "",
    });
    navigate("/");
  }

  return (
    <div>
      <br></br>
      <h3>Create New Course</h3>
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
          <button type="submit" className="btn btn-primary">
            Add Course
          </button>
        </div>
        <br></br>
      </form>
    </div>
  );
}
