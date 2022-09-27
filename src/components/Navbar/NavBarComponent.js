import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import Avatar from "@mui/material/Avatar";
import { BsFillChatFill } from "react-icons/bs";
import { GiTripleYin } from "react-icons/gi";

function NavbarComponent() {
  let history = useNavigate();
  const logout = () => {
    localStorage.clear();
    history("login");
  };

  const writerId = localStorage.getItem("user");
  return (
    <Navbar
      sticky="top"
      collapseOnSelect
      expand="lg"
      variant="dark"
      style={{
        background: "rgba(199,128, 137, 1)",
      }}
    >
      <Container fluid className="">
        <Navbar.Brand style={{}}>
          <Nav.Link href="#">
            <Link
              className="nav-link"
              to={localStorage.getItem("user") === null ? "/" : "/home"}
            >
              <GiTripleYin className="triple-yin align-self-center "></GiTripleYin>
              Chatapp
            </Link>
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ">
            <NavDropdown
              title="Dropdown"
              id="collasible-nav-dropdown"
              className="nav-link"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {localStorage.getItem("user") !== null && (
              <>
                <Nav.Link href="#">
                  <Link className="nav-link" to={`/profile/${writerId}`}>
                    Your Profile
                  </Link>
                </Nav.Link>
                <Nav.Link href="#">
                  <div onClick={logout} className="nav-link">
                    Logout
                  </div>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
