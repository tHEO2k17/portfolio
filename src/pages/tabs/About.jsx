import React, { Component } from 'react';

export default class About extends Component {
    render() {
        return (
            <div className="row pt-5">
                <div className="col-md-9">
                    <h3 className="display-4">
                        <span className="font-weight-bold">Hello,</span> <br />
                        I am <span className="font-weight-bold">Theophilus Paintsil.</span>
                    </h3>
                    <p className="lead"> Passionate <b>Software Developer</b> and a <b>Systems Engineer</b> </p>
                    <button type="button" className="btn btn-info btn-pill mr-2">Hire me &rarr;</button>
                    <button type="button" className="btn btn-outline-light btn-pill">Know more</button>
                </div>
                <div className="col-md-3">
                    <div className="card mt-3">
                        <img class="card-img-top" src={require('../../assets/img/pos.png')} alt="UI&amp;UI" />
                        <div class="card-body">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
