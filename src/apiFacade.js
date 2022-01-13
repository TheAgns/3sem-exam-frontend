import jwt_decode from "jwt-decode";
import { URL } from "./Settings";


//URL = "https://www.theagns.com/CA2-Backend";
function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function handleError(error, setError) {
  if (error.status) {
    error.fullError.then((data) => setError(data));
  } else {
    setError({ code: 500, message: "Some unknown error happened" });
  }
}

function apiFacade() {
  /* Insert utility-methods from a latter step (d) here (REMEMBER to uncomment in the returned object when you do)*/

  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  //Decode token

  const validateAccess = () => {
    var decoded = jwt_decode(getToken());
    const { roles } = decoded;
    console.log(roles);
    //  console.log(decoded);
    return roles;
  };

  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const login = (user, password) => {
    /*TODO*/
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };

const registerUser = (registerCredentials) => {
     const options = makeOptions('POST',true,registerCredentials);
     console.log(registerCredentials)
     return fetch(URL + "/api/info/register", options)
       .then(handleHttpErrors)
       .then((res) => {});
   }

  const fetchData = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/info/user", options).then(handleHttpErrors);
  };

  //Fetches from one endpoint. Only 1 external api call.
  function getAssistants(){
    return fetch(URL + "/api/info/getAllAssistants")
    .then(handleHttpErrors)
    }


  //Fetches from one endpoint. 4 external api call.
  const fetchAlotData = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/info/fetchSeq", options).then(handleHttpErrors);
  };

  const fetchAlotDataParallel = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/info/fetchParallel", options).then(
      handleHttpErrors
    );
  };

  const getAllMyBookings = (username) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(
      URL + "/api/info/getBooking/" + username,options)
      .then(handleHttpErrors);
  };

  const getUsername = () => {
    var decoded = jwt_decode(getToken());
    const { username } = decoded;
    return username;
  };

  //US-4 As an admin I would like to create a new washing assistant
  function createAssistant(assistant) {
    const options = makeOptions("POST", true, assistant);
    return fetch(URL + "/api/info/createAssistant", options)
    .then(handleHttpErrors)
    }
//US-4 As an admin I would like to create a new washing assistant
    function getAssistant(){
      const name = document.getElementById("name").value;
      const pricePerHour = document.getElementById("pricePerHour").value;
      const primaryLanguage = document.getElementById("primaryLanguage").value;
      const yearsOfExperience = document.getElementById("yearsOfExperience").value;
      const assistant = {
        "name" : name,
        "pricePerHour" : pricePerHour,
        "primaryLanguage" : primaryLanguage,
        "yearsOfExperience" : yearsOfExperience
      }
      console.log(assistant)
      createAssistant(assistant);
    }
    //US-7 As an admin I would like to delete a booking
    function getBooking(){
      return fetch(URL + "/api/info/getAllBookings")
      .then(handleHttpErrors)
      }
    //US-7 As an admin I would like to delete a booking
    function deleteSpecificBooking(id) {
      const options = makeOptions("DELETE", true, id);
      return fetch(URL + "/api/info/deleteBooking/" + id, options)
      .then(handleHttpErrors)
    };

    // function createBooking(booking) {
    //   const options = makeOptions("POST", true, booking);
    //   return fetch(URL + "/api/info/createBooking", options)
    //   .then(handleHttpErrors)
    //   }

    //   function getBookingCreate(){
    //     const bookingTime = document.getElementById("bookingTime").value;
    //     const date = document.getElementById("date").value;
    //     const year = document.getElementById("year").value;
    //     const month = document.getElementById("month").value;
    //     const day = document.getElementById("day").value;
    //     const time = document.getElementById("time").value;
    //     const hour = document.getElementById("hour").value;
    //     const minute = document.getElementById("minute").value;
    //     const second = document.getElementById("second").value;
    //     const nano = document.getElementById("nano").value;
    //     const duration = document.getElementById("duration").value;
    //     const booking = {
    //       "bookingTime": {
    //         "date": {
    //           "year": year,
    //           "month": month,
    //           "day": day
    //         },
    //         "time": {
    //           "hour": hour,
    //           "minute": minute,
    //           "second": second,
    //           "nano": nano
    //         }
    //       },
    //       "duration": duration
          
    //     }
    //    console.log(booking)
    //     createBooking(booking);
      
    //   }


  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }

    return opts;
  };

  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    getAssistants,
    getAllMyBookings,
    createAssistant,
    getBooking,
    deleteSpecificBooking,
    //createBooking,
    fetchAlotData,
    fetchAlotDataParallel,
    validateAccess,
    handleError,
    registerUser
  };
}
const facade = apiFacade();
export default facade;
