import React, { useState } from "react";
import axios from 'axios';

function App() {
  const [state, setState] = useState("First");
  const [index, setIndex] = useState("");
  const [nic, setNic] = useState("");
  const [student, setStudent] = useState("");
  const [indexError, setIndexError] = useState("");
  const [nicError, setNicError] = useState("");
  const [serverError, setServerError] = useState("");


  const sendData = (e) => {
    e.preventDefault();

    if (index === "") {
      setState("Error");
      setIndexError("Please enter the index number!");
      setNicError("");
      setServerError("");
      return;
    }

    if (nic === "") {
      setState("Error");
      setNicError("Please enter the NIC number!");
      setIndexError("");
      setServerError("");
      return;
    }
    
    axios.post("https://sap-b19-api.vercel.app/api/student/", { index, nic })
      .then((response) => {
        if (response.data.code === 200) {
          setState("Normal");
          setStudent(response.data.student);
        } else if (response.data.code === 404) {
          setState("Error");
          setIndexError("Invalid INDEX! Please enter a valid index number!");
          setNicError("");
          setServerError("");
        } else if (response.data.code === 401) {
          setState("Error");
          setNicError("Incorrect NIC! Please enter the correct NIC!");
          setIndexError("");
        } else {
          setState("Error");
          setServerError("Oops! Something went wrong!");
          setIndexError("");
          setNicError("");
        }
      })
      .catch((err) => {
        setState("Error");
        setServerError("Oops! Something went wrong!");
        setIndexError("");
        setNicError("");
      });
  };

  

  return (
    <>
      <div>
        {state === "First" && (
          <div>
            <div className="container" >
              <div className="row align-items-center" style={{ height: '100vh' }}>
                <div className="col-12">
                  <div className="alert alert-light" role="alert">
                    {/* <div style={{ textAlign: 'center' }}>
                      <img src="ucsc.png" style={{ width: '150px' }} alt="UCSC logo" />
                    </div> */}
                    <br />
                    <h2 className="alert-heading" style={{ textAlign: 'center' }}>Student Academic Performance-Batch 19</h2>
                    <br />
                    <main className="form-signin m-auto col-lg-4">
                      <form onSubmit={sendData}>
                        <div className="form-floating">
                          <input className="form-control" type="text" value={index} onChange={(e) => setIndex(e.target.value)} id="no" name="no" />
                          <label htmlFor="no">Index No</label>
                        </div>
                        <div className="form-floating" style={{ marginTop: '2vh' }}>
                          <input className="form-control" type="password" value={nic} onChange={(e) => setNic(e.target.value)} id="pw" name="pw" />
                          <label htmlFor="pw">NIC</label>
                        </div>
                        <button className="btn btn-primary w-100 py-2" type="submit" style={{ marginTop: '2vh' }}>Check Results</button>
                      </form>
                    </main>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {state === "Normal" && (
          <div className="container">
            <div className="row" style={{ marginTop: '3vh' }}>
              <div className="col-12">
                <h2 className="text-center">Student Academic Performance-Batch 19</h2>
              </div>
            </div>

            <p className="text-center">
              <strong>MC</strong> - Medical | <strong>EC</strong> - Exceptional Circumstances | <strong>CM</strong> - Completed | <strong>NC</strong> - Not Completed | <strong>F</strong> - Absent | <strong>CN</strong> - Cancelled | <strong>WH</strong> - Withheld
            </p>

            <div className="row">
              <div className="col-md-6">
                <h6><strong>Name:</strong> {student.name}</h6>
                <h6><strong>Index No.: </strong> {student.index}</h6>
                <h6><strong>Degree Program: </strong> {student.degreeProgram}</h6>
              </div>
              <div className="col-md-6">
                <h6><strong>Current GPA: </strong> {student.gpa}</h6>
                <h6><strong>Current Rank: </strong> {student.rank}</h6>
                <h6><strong>Total Credits: </strong> {student.totalCredit}</h6>
              </div>
            </div>

            <div className="row" style={{ marginTop: '3vh' }}>
              <div className="col-12">
                <h2 className="text-left">Results</h2>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table table-bordered table-sm">
                    <thead >
                      <tr>
                        <th style={{ background: "beige" }}>Subject Code</th>
                        <th style={{ background: "beige" }}>Subject Name</th>
                        <th style={{ background: "beige" }}>Grade</th>
                        <th style={{ background: "beige" }}>Credit</th>
                        <th style={{ background: "beige" }}>Credit x Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.result.map((result, index) => (
                        <tr key={index}>
                          <td>{result.subCode}</td>
                          <td>{result.subName}</td>
                          <td>{result.subGrade}</td>
                          <td>{result.subCredit}</td>
                          <td>{result.subCreditXGrade}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="3"></td>
                        <td><strong>Total Credits:{student.totalCredit} </strong></td>
                        <td><strong>Total: {student.totalCreditXGrade}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={{ marginLeft: '2vw' }}>
                  <strong>GPA = &#931; (Grade x Credit ) / Total Credit</strong><br />
                  &nbsp; &nbsp; &nbsp; &nbsp; = {student.totalCreditXGrade} / {student.totalCredit}<br />
                  &nbsp; &nbsp; &nbsp; &nbsp; = {student.gpa}
                </p>
              </div>
            </div>
          </div>
        )}

        {state === "Error" && (
          // need to change again
          <div>
            <div className="container" >
              <div className="row align-items-center" style={{ height: '100vh' }}>
                <div className="col-12">
                  <div className="alert alert-light" role="alert">
                    <p className="text-danger">{serverError}</p>
                    {/* <div style={{ textAlign: 'center' }}>
                      <img src="ucsc.png" style={{ width: '150px' }} alt="UCSC logo" />
                    </div> */}
                    <br />
                    <h2 className="alert-heading" style={{ textAlign: 'center' }}>Student Academic Performance-Batch 19</h2>
                    <br />
                    <main className="form-signin m-auto col-lg-4">
                      <form onSubmit={sendData}>
                        <div className="form-floating">
                          <input className="form-control" type="text" value={index} onChange={(e) => setIndex(e.target.value)} id="no" name="no" />
                          <label htmlFor="no">Index No</label>
                          <p className="text-danger">{indexError}</p>
                        </div>
                        <div className="form-floating">
                          <input className="form-control" type="password" value={nic} onChange={(e) => setNic(e.target.value)} id="pw" name="pw" />
                          <label htmlFor="pw">NIC</label>
                          <p className="text-danger">{nicError}</p>
                        </div>
                        <button className="btn btn-primary w-100 py-2" type="submit" style={{ marginTop: '2vh' }}>Check Results</button>
                      </form>
                    </main>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
