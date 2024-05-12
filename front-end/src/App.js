import React, { useState } from "react";
import axios from 'axios';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [state, setState] = useState("First");

  const [index, setIndex] = useState("");
  const [nic, setNic] = useState("");

  const [indexError, setIndexError] = useState("");
  const [nicError, setNicError] = useState("");
  const [serverError, setServerError] = useState("");
  
  const [student, setStudent] = useState("");

  const sendData = (e) => {
    e.preventDefault();

    if (index === "") {
      setState("Error");
      setIndexError("Please enter the index number!");
      setNicError("");
      setServerError("");
      return;
    } else if (nic === "") {
      setState("Error");
      setNicError("Please enter the NIC number!");
      setIndexError("");
      setServerError("");
      return;
    } else {
      axios.post(API_URL + "/api/student/", { index, nic })
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
    }
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
                        <div className="form-floating">
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
          <div>
            <p>ojk</p>
            {/* Create the Detail View Page */}
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
      <SpeedInsights />
    </>
  );
}

export default App;
