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

            <header>
                <Container>
                    <Row className="align-items-center">
                        <Col> <Image src="assets/images/theo.png" fluid /> </Col>
                        <Col>
                            <h1>Hello there!</h1>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore, facere quisquam? Accusantium tenetur, libero, omnis quasi laborum vitae quibusdam deleniti repudiandae nisi, maiores commodi voluptatibus consequuntur sapiente provident blanditiis error?
                            </p>
                        </Col>
                    </Row>
                </Container>
            </header>

        </Container>
    );
}