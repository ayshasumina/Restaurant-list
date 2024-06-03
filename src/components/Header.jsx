import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import { searchRestaurant } from '../redux/restaurantSlice';
import './Header.css';
import { Link } from 'react-router-dom';



function Header({insideHome}) {
  const dispatch = useDispatch()

  return (
    <Navbar expand="lg" className="bg-primary ">
    <Container className='p-3 navContainer'>
      <Navbar.Brand href="#home" style={{fontSize:'1.8em'}}><Link className='text-light text-decoration-none' to={'/'}><i class="fa-solid fa-location-dot"></i>DineCafe</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
  {
    insideHome &&
          <Nav.Link>
          <input onChange={e=>dispatch(searchRestaurant(e.target.value.toLowerCase()))} placeholder='Search Restaurant By Cities' className='rounded p-2 txtBox'  type="text"/>
          </Nav.Link>
  }
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header