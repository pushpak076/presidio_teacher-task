import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import React from "react";

const UpdateTeacherPage = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState({
    fullName: "",
    age: "",
    dateOfBirth: "",
    numberOfClasses: "",
  });

  useEffect(() => {
    fetchTeacherDetails();
  }, []);

  const fetchTeacherDetails = async () => {
    try {
      const response = await axios.get(`/teachers/${id}`);
      setTeacher(response.data);
    } catch (error) {
      console.error("Error fetching teacher details:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/teachers/${id}`, teacher);
      // Redirect to home page after update
      // @ts-ignore
      window.location = "/";
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center"}}>
      <h1 style={{textAlign: "center"}}>Update Teacher</h1>
      <form style={{display: "flex", flexDirection: "column", margin: "0px auto", width: "40%", border: "2px solid black"}} onSubmit={handleSubmit}>
        <table>
          <tr>
            <td>Name: </td>
            <td>
              <input
                type="text"
                name="fullName"
                value={teacher.fullName}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>Age: </td>
            <td>
              <input
                type="text"
                name="age"
                value={teacher.age}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>Date of Birth:</td>
            <td>
              <input
                type="date"
                name="dateOfBirth"
                value={teacher.dateOfBirth}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>Number of Classes:</td>
            <td>
              <input
                type="text"
                name="numberOfClasses"
                value={teacher.numberOfClasses}
                onChange={handleInputChange}
              />
            </td>
          </tr>
        </table>

        <button style={{width: "50%", padding: "7px", backgroundColor: "#91F394", border: "none", borderRadius: "5px", margin: "10px auto"}} type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateTeacherPage;
