import React, { Component } from 'react';
import About from './tabs/About.jsx';
import Resume from './tabs/Resume.jsx';

export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="tab-content">
                    <div className="tab-pane fade active show" id="about">
                        <About />
                    </div>
                    <div className="tab-pane fade " id="resume">
                        <Resume />
                    </div>
                </div>
            </div>
        );
    }
}
