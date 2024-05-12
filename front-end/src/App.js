import React, { useState } from "react";
import axios from "axios";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [state, setState] = useState("IDLE");

  const [index, setIndex] = useState("");
  const [nic, setNic] = useState("");

  const [indexError, setIndexError] = useState("");
  const [nicError, setNicError] = useState("");

  const [student, setStudent] = useState("");

  const sendData = (e) => {
    e.preventDefault();

    if (index === "") {
      setState("ERROR");
      setIndexError("Please enter the index number!");
      setNicError("");
      return;
    } else if (nic === "") {
      setState("ERROR");
      setNicError("Please enter the NIC number!");
      setIndexError("");
      return;
    } else {
      axios
        .post(API_URL + "/api/student/", { index, nic })
        .then((response) => {
          if (response.data.code === 200) {
            setState("SUCCESS");
            setStudent(response.data.student);
          } else if (response.data.code === 404) {
            setState("ERROR");
            setIndexError("Invalid INDEX! Please enter a valid index number!");
            setNicError("");
          } else if (response.data.code === 401) {
            setState("ERROR");
            setNicError("Incorrect NIC! Please enter the correct NIC!");
            setIndexError("");
          } else {
            setState("IDLE");
            toast.error("Oops! Something went wrong!");
          }
        })
        .catch((err) => {
          setState("IDLE");
          toast.error("Oops! Something went wrong!");
        });
    }
  };

  return (
    <>
      <ToastContainer />
      <div>
        {state === "IDLE" && (
          <div>
            <div className="container">
              <div
                className="row align-items-center"
                style={{ height: "100vh" }}
              >
                <div className="col-12">
                  <div className="alert alert-light" role="alert">
                    <div style={{ textAlign: "center" }}>
                      <img
                        src="ucsc.png"
                        style={{ width: "150px" }}
                        alt="UCSC logo"
                      />
                    </div>
                    <br />
                    <h2
                      className="alert-heading"
                      style={{ textAlign: "center" }}
                    >
                      Student Academic Performance - Batch 19
                    </h2>
                    <br />
                    <main className="form-signin m-auto col-lg-4">
                      <form onSubmit={sendData}>
                        <div className="form-floating">
                          <input
                            className="form-control"
                            type="text"
                            value={index}
                            onChange={(e) => setIndex(e.target.value)}
                            id="no"
                            name="no"
                          />
                          <label htmlFor="no">Index No</label>
                        </div>
                        <div
                          className="form-floating"
                          style={{ marginTop: "2vh" }}
                        >
                          <input
                            className="form-control"
                            type="password"
                            value={nic}
                            onChange={(e) => setNic(e.target.value)}
                            id="pw"
                            name="pw"
                          />
                          <label htmlFor="pw">NIC</label>
                        </div>
                        <button
                          className="btn btn-primary w-100 py-2"
                          type="submit"
                          style={{ marginTop: "2vh" }}
                        >
                          Check Results
                        </button>
                      </form>
                    </main>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {state === "SUCCESS" && (
          <div className="container">
            <div className="row" style={{ marginTop: "5vh" }}>
              <div className="col-12">
                <h1 className="text-center">
                  Student Academic Performance - Batch 19
                </h1>
              </div>
            </div>
            <div className="row" style={{ margin: "3vh 0vh -1vh 2vh" }}>
              <h6>
                <strong>Name :</strong> {student.name}
              </h6>
              <h6>
                <strong>NIC :</strong> {student.nic}{" "}
              </h6>
              <h6>
                <strong>Index No : </strong> {student.index}
              </h6>
              <h6>
                <strong>Degree Program : </strong> {student.degreeProgram}
              </h6>
              <h6>
                <strong>Current GPA : </strong> {student.gpa}
              </h6>
              <h6>
                <strong>Current Rank : </strong> {student.rank}
              </h6>
            </div>
            <br />
           <div className="row" style={{ marginBottom: '2vh' }}>
                <div className="col-md-6">

                  <p className="text-lg-end text-center" style={{paddingRight:'0'}}>
                    <strong>MC</strong> - Medical | <strong>CM</strong> - Completed | <strong>NC</strong> - Not Completed |</p>
                </div>
                <div className="col-md-6" style={{  paddingLeft: '0' }}>
                  <p className="text-lg-start text-center"><strong>F</strong> - Absent | <strong>CN</strong> - Cancelled | <strong>WH</strong> - Withheld
                  </p>
                </div>
              </div>
            <div className="row">
              <div className="col-12">
                <div className="table-responsive">
                  <table
                    className="table table-bordered table-sm"
                    style={{ border: 1 }}
                  >
                    <thead>
                      <tr>
                        <th style={{ background: "beige" }}>
                          <center>Subject Code</center>
                        </th>
                        <th style={{ background: "beige" }}>
                          <center>Subject Title</center>
                        </th>
                        <th style={{ background: "beige" }}>
                          <center>Subject Credit</center>
                        </th>
                        <th style={{ background: "beige" }}>
                          <center>Grade</center>
                        </th>
                        <th style={{ background: "beige" }}>
                          <center>Credit x Grade</center>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.result.map((result, index) => (
                        <tr key={index}>
                          <td>
                            <center>{result.subCode}</center>
                          </td>
                          <td>
                            <center>{result.subName}</center>
                          </td>
                          <td>
                            <center>{result.subCredit}</center>
                          </td>
                          <td>
                            <center>{result.subGrade}</center>
                          </td>
                          <td>
                            <center>
                              {result.subCredit} X{" "}
                              {result.subCredit == "0"
                                ? "0.0"
                                : (
                                    result.subCreditXGrade / result.subCredit
                                  ).toFixed(1)}{" "}
                              = {result.subCreditXGrade.toFixed(1)}
                            </center>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="2" class="table-secondary"></td>
                        <td>
                          <center>
                            <strong>
                              &#931; (Credit) = {student.totalCredit}{" "}
                            </strong>
                          </center>
                        </td>
                        <td colSpan="1" class="table-secondary"></td>
                        <td>
                          <center>
                            <strong>
                              &#931; (Grade x Credit) ={" "}
                              {student.totalCreditXGrade}
                            </strong>
                          </center>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={{ margin: "2vh 0 3vh 0"}}>
                  <div className="text-center">
                    <strong>GPA</strong> = &#931; (Grade x Credit) &#247; &#931; (Credit) = {student.totalCreditXGrade} &#247; {student.totalCredit} = {student.gpa}
                    <br />
                  </div>
                </p>
              </div>
            </div>
            <div style={{ backgroundColor: "blue" }}>
              <p className="text-center" style={{ color: "white" }}>
                <b>All Rights Reserved &#169; 2024 </b>
              </p>
            </div>
          </div>
        )}
        {state === "ERROR" && (
          <div>
            <div className="container">
              <div
                className="row align-items-center"
                style={{ height: "100vh" }}
              >
                <div className="col-12">
                  <div className="alert alert-light" role="alert">
                    <div style={{ textAlign: "center" }}>
                      <img
                        src="ucsc.png"
                        style={{ width: "150px" }}
                        alt="UCSC logo"
                      />
                    </div>
                    <br />
                    <h2
                      className="alert-heading"
                      style={{ textAlign: "center" }}
                    >
                      Student Academic Performance - Batch 19
                    </h2>
                    <br />
                    <main className="form-signin m-auto col-lg-4">
                      <form onSubmit={sendData}>
                        <div className="form-floating">
                          <input
                            className="form-control"
                            type="text"
                            value={index}
                            onChange={(e) => setIndex(e.target.value)}
                            id="no"
                            name="no"
                          />
                          <label htmlFor="no">Index No</label>
                          <p className="text-danger">{indexError}</p>
                        </div>
                        <div className="form-floating">
                          <input
                            className="form-control"
                            type="password"
                            value={nic}
                            onChange={(e) => setNic(e.target.value)}
                            id="pw"
                            name="pw"
                          />
                          <label htmlFor="pw">NIC</label>
                          <p className="text-danger">{nicError}</p>
                        </div>
                        <button
                          className="btn btn-primary w-100 py-2"
                          type="submit"
                          style={{ marginTop: "2vh" }}
                        >
                          Check Results
                        </button>
                      </form>
                    </main>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <SpeedInsights />
      </div>
    </>
  );
}

export default App;
