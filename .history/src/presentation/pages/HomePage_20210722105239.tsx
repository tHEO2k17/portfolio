import { Col, Container, Nav, Navbar, Row, Image, ProgressBar } from "react-bootstrap";

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
                            <Nav.Link href="#home">WORK</Nav.Link>
                            <Nav.Link href="#home">ABOUT</Nav.Link>
                            <Nav.Link href="#link">RESUME</Nav.Link>
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
                            <h4 className="fw-light text-muted mt-3">
                                I am Theophilus Paintsil, a mobile <br />
                                and web developer with an eye for beauty <br />
                                and experienced in developing client first solutions.
                            </h4>
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
                                Always up for a challenge, I have worked for lean start-ups<br />
                                and was a member of the first New Zealand start-up to attend Y Combinator,
                                the largest start-up accelerator in the world. <br />
                                From there, I worked my way up to Art Director and Team Lead at Appster where
                                I oversaw the design of 30+ mobile and desktop apps. Currently,
                                I lead UI/UX design at SaaS start-up VideoMyJob.
                            </h4>
                        </Col>
                        <Col>
                            <ProgressBar>
                                <ProgressBar variant="info" now={55} key={1} label="HTML" />
                                <ProgressBar variant="secondary" now={30} key={2} label="CSS" />
                                <ProgressBar variant="dark" now={20} key={3} label="Javascript" />
                                <ProgressBar variant="dark" now={20} key={3} label="Typescript" />
                            </ProgressBar>
                            <ProgressBar className="my-2" variant="info" now={70} key={3} label="Flutter" />
                            <ProgressBar>
                                <ProgressBar variant="success" now={55} key={1} label="NodeJS" />
                                <ProgressBar variant="danger" now={30} key={2} label="NestJs" />
                            </ProgressBar>
                            <ProgressBar className="my-2" variant="success" now={70} key={3} label="NodeJs" />
                            <ProgressBar variant="dark" now={10} key={3} label="Javascript" />
                        </Col>
                    </Row>
                </Container>
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