import React, { useState } from "react";
import axios from 'axios';

function App() {
  const [state, setState] = useState("First");
  const [index, setIndex] = useState("");
  const [nic, setNic] = useState("");
  const [student, setStudent] = useState("");
  const [error, setError] = useState("");

  const sendData = (e) => {
    e.preventDefault();
    
    axios.post("http://localhost:6021/api/student/", { index, nic })
      .then((response) => {
        if (response.data.code === 200) {
          setState("Normal");
          setStudent(response.data.student);
        } else if (response.data.code === 404) {
          setState("Incorrect Index");
          setError("Invalid INDEX! Please enter a valid index number!");
        } else if (response.data.code === 401) {
          setState("Incorrect NIC");
          setError("Incorrect NIC! Please enter the correct NIC!");
        } else {
          setState("Error");
          setError("Oops! Something went wrong!");
        }
      })
      .catch((err) => {
        setState("Error");
        setError("Oops! Something went wrong!");
      });
  };

  return (
    <div>
      {state === "First" && (
        <div>
          {/* Create the Login Page */}
        </div>
      )}
      {state === "Normal" && (
        <div>
          {/* Create the Detail View Page */}
        </div>
      )}
      {state === "Incorrect Index" && (
        <div>
          {/* The Login Page with Error */}
        </div>
      )}
      {state === "Incorrect NIC" && (
        <div>
          {/* The Login Page with Error */}
        </div>
      )}
      {state === "Error" && (
        <div>
          {/* Create Something Went Wrong Error Page */}
        </div>
      )}
    </div>
  );
}

export default App;
