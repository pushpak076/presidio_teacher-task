import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card"; // Assuming Card component is located in a file named Card.js

const Home = () => {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    fullName: "",
    age: "",
    dateOfBirth: "",
    numberOfClasses: "",
  });
  const [searchName, setSearchName] = useState(""); // State to store the search query
  const [filterCriteria, setFilterCriteria] = useState("none");
  const [showAverage, setShowAverage] = useState(false); // State to toggle the average display

  // Function to fetch all teachers
  const fetchTeachers = async () => {
    try {
      const response = await axios.get("/teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  // Function to create a new teacher
  const createTeacher = async () => {
    try {
      await axios.post("/teachers", newTeacher);
      setNewTeacher({
        fullName: "",
        age: "",
        dateOfBirth: "",
        numberOfClasses: "",
      });
      fetchTeachers(); // Fetch updated list of teachers after creation
    } catch (error) {
      console.error("Error creating teacher:", error);
    }
  };

  // Function to delete a teacher
  const deleteTeacher = async (id) => {
    try {
      await axios.delete(`/teachers/${id}`);
      fetchTeachers(); // Fetch updated list of teachers after deletion
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  const updateTeacher = async (id) => {
    // @ts-ignore
    window.location = `/update/${id}`;
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Filter teachers by name based on the search query
  const filteredTeachers = searchName
    ? teachers.filter((teacher) =>
        teacher.fullName.toLowerCase().includes(searchName.toLowerCase())
      )
    : teachers;

  // Sort teachers based on the selected filter criteria
  const sortedTeachers = [...filteredTeachers].sort((a, b) => {
    if (filterCriteria === "age") {
      return a.age - b.age;
    } else if (filterCriteria === "numberOfClasses") {
      return a.numberOfClasses - b.numberOfClasses;
    }
    return 0;
  });

  // Calculate the average number of classes for all teachers
  const averageNumberOfClasses =
    teachers.reduce((acc, curr) => acc + parseInt(curr.numberOfClasses), 0) /
    teachers.length;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          backgroundColor: "#91F3E3",
        }}
      >
        <h1 style={{ margin: "10px", display: "inline-block" }}>
          Teacher Management Application
        </h1>

        {/* Search input to filter teachers by name */}
        <input
          style={{
            height: "40px",
            width: "300px",
            fontSize: "20px",
            margin: "auto 2px",
          }}
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Search by name"
        />
      </div>

      <div
        style={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Button to toggle the display of the average number of classes */}
        <div style={{ display: "inline-block" }}>
          <button onClick={() => setShowAverage(!showAverage)}>
            {showAverage
              ? "Hide Average Number of Classes"
              : "Show Average Number of Classes"}
          </button>
          {showAverage && (
            <div style={{ display: "inline-flex", marginLeft: "10px" }}>
              Average Number of Classes: <b>{averageNumberOfClasses}</b>
            </div>
          )}
        </div>
        <div style={{ display: "inline-block" }}>
          Filter By:
          <select
            value={filterCriteria}
            onChange={(e) => setFilterCriteria(e.target.value)}
          >
            <option value="none">None</option>
            <option value="age">Age</option>
            <option value="numberOfClasses">Number of Classes</option>
          </select>
        </div>
      </div>
      <div style={{ padding: "15px" }}>
        {/* Form to create a new teacher */}
        <input
          type="text"
          style={{
            height: "30px",
            width: "200px",
            margin: "5px",
            fontSize: "18px",
          }}
          value={newTeacher.fullName}
          onChange={(e) =>
            setNewTeacher({ ...newTeacher, fullName: e.target.value })
          }
          placeholder="Name"
        />
        <input
          type="text"
          style={{
            height: "30px",
            width: "80px",
            margin: "5px",
            fontSize: "18px",
          }}
          value={newTeacher.age}
          onChange={(e) =>
            setNewTeacher({ ...newTeacher, age: e.target.value })
          }
          placeholder="Age"
        />
        <input
          type="date"
          style={{
            height: "30px",
            width: "250px",
            margin: "5px",
            fontSize: "18px",
          }}
          value={newTeacher.dateOfBirth}
          onChange={(e) =>
            setNewTeacher({ ...newTeacher, dateOfBirth: e.target.value })
          }
          placeholder="Enter teacher date of birth"
        />
        <input
          type="text"
          style={{
            height: "30px",
            width: "250px",
            margin: "5px",
            fontSize: "18px",
          }}
          value={newTeacher.numberOfClasses}
          onChange={(e) =>
            setNewTeacher({ ...newTeacher, numberOfClasses: e.target.value })
          }
          placeholder="Enter number of classes"
        />
        <button
          style={{
            height: "35px",
            width: "200px",
            margin: "5px",
            backgroundColor: "#91F394",
            border: "1px solid #91F394",
          }}
          onClick={createTeacher}
        >
          Add Teacher
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          width: "100%",
          textAlign: "center",
          margin: "10px",
        }}
      >
        <table style={{ border: "2px solid black", width: "98%" }}>
          <thead style={{ fontSize: "25px", fontWeight: "bold" }}>
            <tr
              style={{
                outline: "2px solid",
                height: "50px",
              }}
            >
              <td>Name</td>
              <td>Age</td>
              <td>Date of Birth</td>
              <td>Number of Classes</td>
              <td>Operation</td>
            </tr>
          </thead>
          <tbody>
            {sortedTeachers.map((teacher) => (
              <Card
                key={teacher.id}
                teacher={teacher}
                updateTeacher={updateTeacher}
                deleteTeacher={deleteTeacher}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
