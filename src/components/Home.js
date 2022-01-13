import { Col, Container, Row } from "react-bootstrap";

function Home() {
  return (
    <div>
      <Container>
        <Row className="rows">
          <Col xs={2} className="columns"></Col>
          <Col className="columns">
            <h1 className="text-center mt-3">Car wash system</h1>
            <br></br>
            <h3>
              <strong>User stories</strong>
            </h3>
            <p>
              <strong>US1</strong>: As a user I would like to see all washing assistants
            </p>
            <p>
            <strong>US2</strong>: As a user I would like to see all my bookings
            </p>
            <p>
            <strong>US3</strong>: As a user I would like to make a booking and assign one or more washing assistants
            </p>
            <p>
              <strong>US4</strong>: As an admin I would like to create a new washing assistant
            </p>
            <p>
            <strong>US5</strong>: As an admin I would like to update a booking to change assistants
            </p>
            <p>
            <strong>US6</strong>: As an admin I would like to update all information about users, bookings, and cars
            </p>
            <p>
            <strong>US7</strong>: As an admin I would like to delete a booking
            </p>
            <br></br>
            <h3>
              <strong>Usernames And Passwords</strong>
            </h3>
            <p>
              <strong>user: </strong> username: "user" password: "test1"
            </p>
            <p>
              <strong>admin: </strong> username: "admin" password: "test2"
            </p>
          </Col>
          <Col xs={2} className="columns"></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
