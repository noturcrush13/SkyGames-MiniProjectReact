import React from 'react'
import { Container, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/home.css';
import Logo from '../assets/img/Logo-SkyGames.png';

export default function Homepage() {
  return (
    <div>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap" rel="stylesheet"></link>
        <div className='navbar'>
        <Navbar expand="lg">
  <Container>
    <Navbar.Brand href="#">
      <img src={Logo} alt="SkyGames" style={{height:'auto', width:'auto'}}/>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="container d-flex justify-content-center me-auto my-lg-0"
        // style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link href="/" style={{ color:"white"}}>Home</Nav.Link>
        <Nav.Link href="/games" style={{ color:"white"}}>Games</Nav.Link>
        <Nav.Link href="#action2" style={{ color:"white"}}>About</Nav.Link>
        <Nav.Link href="#action2" style={{ color:"white"}}>Contact</Nav.Link>
      </Nav>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>
        </div>
    </div>
  )
}
