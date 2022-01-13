import React, { useState, useEffect } from "react";
import facade from "../apiFacade"
//import { Modal } from "react-bootstrap";


const MyBookings = ({bookingName}) => {



  const [bookings, setBookings] = useState(null);
  // const [username, setUsername] = useState("none");

  useEffect(() => {
    //const navn = setUsername(facade.getUsername);
    //console.log(navn)
    facade.getAllMyBookings(bookingName)
    .then((res) => {
      setBookings(res);
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
      <h3 className="text-center">My bookings</h3>
      <br />
      {bookings != null ? 
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Booking time</th>
            <th scope="col">Duration</th>
          </tr>
        </thead>
      
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
                <td>{bookings.id}</td>
               {/* <td>{bookings.bookingTime}</td>  */}
              <td>{bookings.duration}</td>
              <td>{bookings.USER_user_name}</td>
              
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  id={booking.id}
                  //onClick={deletePerson}
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

export default MyBookings;