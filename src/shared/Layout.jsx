import React, { Component } from 'react';

import SimpleLineIcon from 'react-simple-line-icons';
import '../assets/css/custom.css'

export default class Layout extends Component {
    render() {
        return (
            <div>
                <section id="section">
                    <nav className="navbar static-top navbar-expand-lg navbar-light bg-transparent">
                        <div className="container">
                            <a href="void(0);" className="navbar-brand">
                                <img src={require('../assets/img/me.jpg')} className="logoImage rounded-circle" alt="tHEO" />
                            </a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMenu" aria-controls="navMenu" aria-expanded="false" aria-label="Menu Toggle">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navMenu">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item active">
                                        <a href="#resume" data-toggle="tab" className="nav-link" role="tab">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="void(0)" data-toggle="tab" data-target="#work" className="nav-link">Portfolio</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="void(0)" data-toggle="tab" data-target="#contact" className="nav-link">Contact</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    {this.props.children}
                </section>
                <footer id="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h3>
                                    <SimpleLineIcon name="social-github" size="large"/>
                                    <span className="text-muted small">1</span>
                                </h3>
                            </div>

                            <div className="col">
                                <h3>
                                <SimpleLineIcon name="social-twitter" size="large"/>
                                    <span className="text-muted small">305</span>
                                </h3>
                            </div>

                            <div className="col">
                                <h3>
                                <SimpleLineIcon name="social-facebook" size="large"/>
                                    <span className="text-muted small">890</span>
                                </h3>
                            </div>

                            <div className="col">
                                <h3>
                                <SimpleLineIcon name="social-instagram" size="large"/>
                                    <span className="text-muted small">1000</span>
                                </h3>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}
