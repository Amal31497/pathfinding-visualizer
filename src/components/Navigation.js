import React from "react";
import { Navbar, Container } from "react-bootstrap";

class Navigation extends React.Component {

    render() {
        return (
            <Navbar bg="dark">
                <Container>
                    <Navbar.Brand style={{color:"white"}}>Pathfinding Visualizer</Navbar.Brand>
                </Container>
            </Navbar>
        )
    }
}

export default Navigation;
