// import React from 'react'
// import { Container, Col, Row } from "react-bootstrap";
// import logo from '../images/logo.png';
// import { useDispatch } from 'react-redux';
// import { getAllMovie, getMovieSearch } from '../redux/actions/moviesAction';

// function Navbar() {

//     const dispatch = useDispatch();

//     // GET search/movie
//     const onSearch = async (word) => {
//         if (word === '') {
//             dispatch(getAllMovie());
//         } else {
//             dispatch(getMovieSearch(word));
//         }

//     }

//     return (
//         <div className="nav-style w-100">
//             <Container>
//                 <Row className="pt-2">
//                     <Col xs="2" lg="1">
//                         <a href="/">
//                             <img className="logo" src={logo} alt="logo" />
//                         </a>
//                     </Col>
//                     <Col xs="10" lg="11" className=" d-flex align-items-center">
//                         <div className="search  w-100">
//                             {/* icon  */}
//                             <i className="fa fa-search"></i>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="search.."
//                                 onChange={(e) => onSearch(e.target.value)}
//                             />
//                         </div>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     )
// }

// export default Navbar


import React from 'react';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavigationBar = () => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('movieAppCurrentUser'));

    const handleLogout = () => {
        localStorage.removeItem('movieAppCurrentUser');
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/" style={{ color: '#fff', fontWeight: 'bold' }}>
                    🎬 Movie App
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/"></Nav.Link>
                    </Nav>
                    
                    <Nav className="ms-auto">
                        {currentUser ? (
                            <Dropdown align="end">
                                <Dropdown.Toggle 
                                    variant="outline-light" 
                                    id="dropdown-basic"
                                    style={{ border: 'none' }}
                                >
                                    Welcome, {currentUser.firstName}!
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item disabled>
                                        <strong>{currentUser.firstName} {currentUser.lastName}</strong>
                                    </Dropdown.Item>
                                    <Dropdown.Item disabled>
                                        {currentUser.email}
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleLogout}>
                                        Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
