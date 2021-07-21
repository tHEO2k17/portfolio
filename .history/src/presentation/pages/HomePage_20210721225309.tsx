import { Container, Nav, Navbar } from "react-bootstrap";

export default function HomePage() {
    return (
        <Container fluid>
            <Navbar expand="lg" variant="light">
                <Container>
                    <Navbar.Brand href="#home">tHEO.</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">WORK</Nav.Link>
                            <Nav.Link href="#home">ABOUT</Nav.Link>
                            <Nav.Link href="#link">RESUME</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </Container>
    );
}