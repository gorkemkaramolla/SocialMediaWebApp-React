import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "./navbar.scss";
import Avatar from "@mui/material/Avatar";
import { BsFillChatFill } from "react-icons/bs";
import { GiTripleYin } from "react-icons/gi";

function NavbarComponent() {
    const writerId = 5;
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
                    <Link className="nav-link" to="/cards">
                        <GiTripleYin className="triple-yin align-self-center "></GiTripleYin>
                        Chatapp
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto ">
                        <Nav.Link href="#">
                            <Link className="nav-link" to="/register">
                                Register
                            </Link>
                        </Nav.Link>

                        <NavDropdown
                            title="Dropdown"
                            id="collasible-nav-dropdown"
                            className="nav-link"
                        >
                            <NavDropdown.Item href="#action/3.1">
                                Action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">
                                Something
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav></Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
