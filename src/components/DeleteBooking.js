import React, { useState, useEffect } from "react";
import facade from "../apiFacade"
//import { Modal } from "react-bootstrap";


const DeleteBooking = (props) => {

   

  const [bookingAll, setBookingAll] = useState(null);
  const [update, setUpdate] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    facade.getBooking().then((res) => {
      setBookingAll(res);
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

  const deleteSpecificcBooking = (event) => {
    console.log(event.target.id);
    const id = event.target.id;
    facade.deleteSpecificBooking(id, (data) => {
      console.log(data);
      setUpdate((update) => update + 1);
    });
  };

  return (
    <div>
      <br />
      <h3 className="text-center">Get all bookings</h3>
      <br />
      {bookingAll != null ? 
      <table className="table table-striped">
        <thead>
          <tr>
          <th scope="col">ID </th>
            {/* <th scope="col">Booking time</th> */}
            <th scope="col">Duration</th>
            <th scope="col">Username</th>
          </tr>
        </thead>
      
        <tbody>
          {bookingAll.map((bookings) => (
            <tr key={bookings.id}>
              <td>{bookings.id}</td>
               {/* <td>{bookings.bookingTime}</td>  */}
              <td>{bookings.duration}</td>
              <td>{bookings.USER_user_name}</td>
              <td>{bookings.username}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  id={bookings.id}
                  onClick={deleteSpecificcBooking}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      : "loading..."}
    </div>
  );
};

export default DeleteBooking;