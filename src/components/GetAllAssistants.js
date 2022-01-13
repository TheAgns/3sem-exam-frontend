import React, { useState, useEffect } from "react";
import facade from "../apiFacade"
//import { Modal } from "react-bootstrap";


const GetAllAssistants = (props) => {



  const [assistants, setAssistants] = useState(null);

  useEffect(() => {
    facade.getAssistants().then((res) => {
      setAssistants(res);
     console.log(res);
    }).catch((err) => {
      console.log(err);
      if (err.status) {
        err.fullError.then((e) => {
          console.log(e.code + ": " + e.message);
        });
      } else {
        console.log("Network error");
      }
    });
  }, []);



  return (
    <div>
      <br />
      <h3 className="text-center">Get all washing assistants</h3>
      <br />
      {assistants != null ? 
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price per hour</th>
            <th scope="col">Primary Language</th>
            <th scope="col">Years of experience</th>
          </tr>
        </thead>
      
        <tbody>
          {assistants.map((assistant) => (
            <tr>
          
              <td>{assistant.name}</td>
              <td>{assistant.pricePerHour}</td>
              <td>{assistant.primaryLanguage}</td>
              <td>{assistant.yearsOfExperience}</td>
              <td>
                {/* <button
                  className="btn btn-danger btn-sm"
                  id={assistant.id}
                  //onClick={deletePerson}
                >
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      : "loading..."}
    </div>
  );
};

export default GetAllAssistants;