import React, { Component } from 'react'


class StatusBar extends Component {
    render() {
        let content = 'Updating data...'

        if (!this.props.currencyLoading) {
            const dateFormatted = this.props.lastUpdated.toLocaleString(undefined, {
                hour12: true,
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            })
            content = `Last updated on ${dateFormatted}`
        }

        return (
            <div id="statusbar" className="position-fixed text-white small font-weight-bold">
                <div className="container custom-container d-flex align-items-center">
                    <span>{content}</span>
                </div>
            </div>
        )
    }
}


export default StatusBar
