import { NavLink, Route } from "react-router-dom";

function Header({ loggedIn, logout, validateAccess }) {
  return (
    <ul className="header">
      {console.log(loggedIn)}
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>

      <li>
        <NavLink exact activeClassName="active" to="/GetAllAssistants">
        Get all assistants
        </NavLink>
      </li>
      {!loggedIn ? (
        <li>
          <NavLink exact activeClassName="active" to="/login">
            Login
          </NavLink>
        </li>
      ) : (
        <>
          {validateAccess === "user" ? (
            <li>
              <NavLink exact activeClassName="active" to="/MyBookings">
              My bookings
              </NavLink>
            </li>
          ) : (
            ""
          )}

          {validateAccess === "admin" ? (
            <li>
              <NavLink exact activeClassName="active" to="/createAssistant">
                Create Assistant
              </NavLink>
            </li>
          ) : (
            ""
          )}

        
{validateAccess === "admin" ? (
        <li>
        <NavLink exact activeClassName="active" to="/deleteBooking">
        All bookings
        </NavLink>
       </li>
       ) : (
        ""
      )}
          <li>
            {/*Logout is never active. Once you click you gets to the homepage*/}
            <NavLink
              exact
              activeClassName="none"
              to="/"
              onClick={() => logout()}
            >
              Logout
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
}

export default Header;
