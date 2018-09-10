import React, { Component } from 'react'


class CurrencyCard extends Component {
    render() {
        const flagClassName = `
            d-block flag-icon
            flag-icon-${this.props.currency.substr(0, 2).toLowerCase()}
        `

        return (
            <div className="border-bottom py-2">
                <div className="row align-items-center no-gutters">
                    <div className="col-auto">
                        <span className={flagClassName}></span>
                    </div>
                    <div className="col-auto px-2">
                        {this.props.currency}
                    </div>
                    <div className="col-auto ml-auto">
                        {this.props.prepend}
                    </div>
                </div>
            </div>
        )
    }

    // =====


}


export default CurrencyCard
