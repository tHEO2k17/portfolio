import { Col, Container, Nav, Navbar, Row, Image } from "react-bootstrap";

export default function HomePage() {
    return (
        <Container fluid>
            <Navbar expand="lg" variant="light">
                <Container>
                    <Navbar.Brand href="#home">tHEO.</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="ml-0">
                            <Nav.Link href="#home">WORK</Nav.Link>
                            <Nav.Link href="#home">ABOUT</Nav.Link>
                            <Nav.Link href="#link">RESUME</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Row>
                <Col> <Image src="assets/images/theo.png"/> </Col>
                <Col></Col>
            </Row>

        </Container>
    );
}