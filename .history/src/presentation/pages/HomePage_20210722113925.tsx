import { Col, Container, Nav, Navbar, Row, Image, Card } from "react-bootstrap";

export default function HomePage() {

    return (
        <>
            <Navbar expand="lg" fixed="top" variant="light">
                <Container>
                    <Navbar.Brand href="#home">
                        <span className="fw-bold">tHEO<b className="text-danger">.</b></span>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="ms-auto">
                            <Nav.Link href="#home">ABOUT</Nav.Link>
                            <Nav.Link href="#home">CONTACT</Nav.Link>
                            <Nav.Link href="#link">WORKS</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <header className="min-vh-100">
                <Container>
                    <Row className="align-items-center min-vh-100 my-auto gx-5">
                        <Col md="4"> <Image src="assets/images/theo.png" fluid /> </Col>
                        <Col>
                            <h1 className="display-1 fw-bold">
                                <b className="text-danger">H</b>ELLO <br />
                                <b className="text-danger">T</b>HERE!
                            </h1>
                            <h2 className="fw-light text-muted mt-3">
                                I am Theophilus Paintsil, a mobile and web 
                                <br /> developer with an eye for beauty and 
                                <br /> experienced in developing client first solutions.
                            </h2>
                        </Col>
                    </Row>
                </Container>
            </header>

            <section className="bg-danger min-vh-100">
                {/* skills and tools */}
                <Container>
                    <Row className="align-items-center min-vh-100 my-auto gx-5 text-light">
                        <Col>
                            <h1 className="fw-bold">My Career So Far</h1>
                            <h4 className="text-white-50 mt-4">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                                Possimus, voluptatum! Dignissimos, ducimus facilis. 
                                Culpa nihil esse qui cupiditate vero ad exercitationem maxime consequuntur, 
                                eveniet totam praesentium dicta, dolorem inventore? Dolorem.
                            </h4>
                        </Col>
                        <Col>
                            <Row md="3" className="gy-3">
                                <Col>
                                    <Card border="light" bg="danger">
                                        <Card.Body>HTML</Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card border="light" bg="danger">
                                        <Card.Body>CSS</Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card border="light" bg="danger">
                                        <Card.Body>Javascript</Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card border="light" bg="danger">
                                        <Card.Body>HTML</Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card border="light" bg="danger">
                                        <Card.Body>CSS</Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card border="light" bg="danger">
                                        <Card.Body>Javascript</Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card border="light" bg="danger">
                                        <Card.Body>Javascript</Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card border="light" bg="danger">
                                        <Card.Body>HTML</Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card border="light" bg="danger">
                                        <Card.Body>CSS</Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card border="light" bg="danger">
                                        <Card.Body>Javascript</Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="bg-light min-vh-100">
                {/* work gallery */}
            </section>

            <footer className="bg-dark text-white">
                <Container className="py-5">
                    <Row>
                        <Col>&copy; {new Date().getFullYear()} Theophilus Paintsil. All rights reserved </Col>
                    </Row>
                </Container>
            </footer>

        </>
    );
}