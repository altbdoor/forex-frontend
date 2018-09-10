import React, { Component } from 'react'
import { withRouter, Link, NavLink } from 'react-router-dom'

import { Collapse } from 'reactstrap'


class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isCollapsed: true,
        }

        this.toggleNavbar = this.toggleNavbar.bind(this)
        this.triggerRefresh = this.triggerRefresh.bind(this)
    }

    render() {
        return (
            <div className="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
                <div className="container custom-container">
                    <Link className="navbar-brand" to="/home">
                        React Forex
                    </Link>

                    <button className="navbar-toggler" type="button" onClick={(e) => {this.toggleNavbar()}}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <Collapse isOpen={!this.state.isCollapsed} navbar>
                        <ul className="ml-auto navbar-nav">
                            <li className="nav-item">
                                <NavLink onClick={(e) => {this.toggleNavbar()}} className="nav-link d-block d-md-none" to="/home">
                                    Home
                                </NavLink>

                                <NavLink className="nav-link d-none d-md-block" to="/home">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink onClick={(e) => {this.toggleNavbar()}} className="nav-link d-block d-md-none" to="/settings">
                                    Settings
                                </NavLink>

                                <NavLink className="nav-link d-none d-md-block" to="/settings">
                                    Settings
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink onClick={(e) => {this.toggleNavbar()}} className="nav-link d-block d-md-none" to="/about">
                                    About
                                </NavLink>

                                <NavLink className="nav-link d-none d-md-block" to="/about">
                                    About
                                </NavLink>
                            </li>
                            <li className="nav-item d-block d-md-none">
                                <a className="nav-link text-primary" onClick={(e) => {this.triggerRefresh(true)}}>
                                    Refresh
                                </a>
                            </li>
                        </ul>

                        <div className="form-inline d-none d-md-block">
                            <button className="btn btn-outline-primary btn-block" onClick={(e) => {this.triggerRefresh(false)}}>
                                Refresh
                            </button>
                        </div>
                    </Collapse>

                </div>
            </div>
        )
    }

    // =====

    toggleNavbar() {
        this.setState({
            isCollapsed: !this.state.isCollapsed,
        })
    }

    triggerRefresh(isMobile=false) {
        this.props.refresh()

        if (isMobile) {
            this.toggleNavbar()
        }
    }

}


export default withRouter(Navbar)
