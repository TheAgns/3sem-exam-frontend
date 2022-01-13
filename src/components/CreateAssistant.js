
import React, { useState, useEffect } from "react";
import facade from "../apiFacade"
import ErrorToDisplay from "./ErrorToDisplay";
import SuccesToDisplay from "./SuccessToDisplay";




function CreateAssistant (){

    const [assistant, setAssistant] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const onChange = (evt) => {
        setAssistant({
          ...assistant,
          [evt.target.id]: evt.target.value,
        });
      };



      const handleSubmit = (evt) => {
        evt.preventDefault();
        //check if some inputs are empty. If yes --> error 
        facade.createAssistant(assistant)

        .then((res) => {
           console.log(res)
           setSuccess("The assistant is now created!")
           setError(null)
          })
          .catch((err) => {
            console.log(err);
            if (err.status) {
              err.fullError.then((e) => {
                console.log(e.code + ": " + e.message);
                setError("Have you filled in all fields?")
                setSuccess(null)
              });
            } else {
              console.log("Network error");
            }
          });
        
        //redirects user to home page
        };

        return (
    
            <form onChange={onChange} class="register-form">
                <h3>Create a new assistant</h3>

               
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" 
                    className="form-control" 
                    placeholder="Enter name" 
                    id="name"
                    // value={boat.brand}
                    /* onChange={onChange} */ />

                </div>

                <div className="form-group">
                    <label htmlFor="pricePerHour">Price per hour</label>
                    <input type="text" 
                    className="form-control" 
                    placeholder="Enter price per hour" 
                    id="pricePerHour"
                    // value={boat.make}
                    /* onChange={onChange} */ />
                </div>

                <div className="form-group">
                    <label htmlFor="primaryLanguage">Primary language</label>
                    <input type="text" 
                    className="form-control" 
                    placeholder="Enter Primary language" 
                    id="primaryLanguage" 
                    // value={boat.name}
                    /* onChange={onChange} */ />
                </div>

                <div className="form-group">
                    <label htmlFor="yearsOfExperience">Years of experience</label>
                    <input type="text" 
                    className="form-control" 
                    placeholder="Enter Years of experience" 
                    id="yearsOfExperience" 
                    // value={boat.image}
                    /* onChange={onChange} */ />
                    
                </div>


                <button type="submit" onClick={handleSubmit}className="btn btn-dark btn-lg btn-block">Create Assistant</button>
                {error && <ErrorToDisplay errorMsg={error} />}
                {success && <SuccesToDisplay msg={success} />}
            </form>

          
        ); 
    }

  export default CreateAssistant;

