import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { FcMindMap } from 'react-icons/fc';
import "../App.css";

class Navigation extends React.Component {

    render() {
        return (
            <Navbar bg="dark">
                <Container>
                    <Navbar.Brand style={{color:"white"}}>Pathfinding Visualizer <span><FcMindMap size={24}/></span> </Navbar.Brand>
                </Container>
            </Navbar>
        )
    }
}

export default Navigation;
