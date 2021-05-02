import {Navbar,Nav,NavDropdown} from "react-bootstrap"
import Cookies from 'universal-cookie';

const cookies = new Cookies();
function getcookie(string){
  return(cookies.get(string));
}
function setCookie(key,value){
  cookies.set(key,value,{maxAge:259200})
}
function logout(){
  cookies.remove("token")
  window.location.href="/"
}
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
            <Nav.Link href="#" onClick={()=>logout()}>Logout</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
