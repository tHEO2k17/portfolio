import { Container, Nav, Navbar } from "react-bootstrap";

export default function HomePage() {
    return (
        <Container fluid>
            <Navbar expand="lg" variant="light">
                <Container>
                    <Navbar.Brand href="#home">tHEO.</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="ml-auto">
                            <Nav.Link href="#home">About</Nav.Link>
                            <Nav.Link href="#home">Resume</Nav.Link>
                            <Nav.Link href="#link">Contact</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </Container>
    );
}