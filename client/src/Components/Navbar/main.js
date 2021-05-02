import {Navbar,Nav,NavDropdown} from "react-bootstrap"
function NavbarComponent() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Adcuratio</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/convert">Convert</Nav.Link>
            <Nav.Link href="/view">View/Modify</Nav.Link>
            <Nav.Link href="/show-trends">Show Trends</Nav.Link>
            </Nav>
            <Nav>
            <Nav.Link href="#">Logout</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
