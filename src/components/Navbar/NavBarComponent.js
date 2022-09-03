import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "./navbar.scss";
import Avatar from "@mui/material/Avatar";
import { BsFillChatFill } from "react-icons/bs";

function NavbarComponent() {
    const writerId = 5;
    return (
        <Navbar
            className="mb-4 navbar-bg  "
            sticky="top"
            collapseOnSelect
            expand="lg"
            variant="dark"
            style={{ background: "rgba(199,128, 137, 1)" }}
        >
            <Container fluid className="">
                <Navbar.Brand href="#home">LearnBook</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto ">
                        <Link className="nav-link" to="/cards">
                            Home
                        </Link>

                        <NavDropdown
                            title="Dropdown"
                            id="collasible-nav-dropdown"
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
                    <Nav>
                        <Link
                            className="nav-link"
                            to={{ pathname: "/writers/" + writerId }}
                        >
                            <Avatar
                                alt="G"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 24, height: 24 }}
                            />
                        </Link>
                        <Nav.Link href="#deets"></Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            <BsFillChatFill size={22} />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
