import { Col, Container, Nav, Navbar, Row, Image } from "react-bootstrap";

export default function HomePage() {
    return (
        <>
            <Navbar expand="lg" fixed="top" variant="light">
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

            <header className="min-vh-100">
                <Container>
                    <Row className="align-items-center min-vh-100 my-auto">
                        <Col md="4"> <Image src="assets/images/theo.png" fluid /> </Col>
                        <Col>
                            <h1 className="display-1 fw-bold">Hello <br/> there!</h1>
                            <h4>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore, facere quisquam? Accusantium tenetur, libero, omnis quasi laborum vitae quibusdam deleniti repudiandae nisi, maiores commodi voluptatibus consequuntur sapiente provident blanditiis error?
                            </h4>
                        </Col>
                    </Row>
                </Container>
            </header>

            <section className="bg-light min-vh-100">
                {/* skills and tools */}
            </section>

            <section className="bg-secondary min-vh-100">
                {/* employment history */}
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