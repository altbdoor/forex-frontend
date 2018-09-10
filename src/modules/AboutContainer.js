import React, { Component } from 'react'


class AboutContainer extends Component {
    render() {
        return (
            <div>
                <p>Built with:</p>
                <ul>
                    <li><a href="https://getbootstrap.com/">Bootstrap 4</a></li>
                    <li><a href="https://reactjs.org/">ReactJS 16.4.2</a></li>
                    <li><a href="https://reacttraining.com/react-router/">React Router 4.3.1</a></li>
                    <li><a href="https://reactstrap.github.io/">reactstrap 6.4.0</a></li>
                    <li><a href="https://github.com/pamelafox/lscache">lscache 1.2.0</a></li>
                    <li><a href="https://github.com/lipis/flag-icon-css">flag-icon-css 3.0.0</a></li>
                </ul>

                <p>GitHub:</p>
                <ul>
                    <li><a href="https://github.com/altbdoor/forex-frontend">forex-frontend</a></li>
                    <li><a href="https://github.com/altbdoor/forex-backend">forex-backend</a></li>
                </ul>

                <p>
                    Currency data sourced from <a href="https://openexchangerates.org/">open exchange rates</a>.
                </p>
            </div>
        )
    }

}


export default AboutContainer
