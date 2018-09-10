import React, { Component } from 'react'


class HomeForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            formCurrency: props.setCurrency,
            formAmount: props.setAmount,
            formValid: true,
        }

        this.updateCurrency = this.updateCurrency.bind(this)
        this.updateAmount = this.updateAmount.bind(this)
    }

    render() {
        const currencyOptions = this.props.currencyList.map((i) => {
            return (
                <option key={i} value={i}>
                    {i}
                </option>
            )
        })

        let inputClassName = 'form-control text-monospace'
        if (!this.state.formValid) {
            inputClassName += ' is-invalid'
        }

        return (
            <div className="row no-gutters pb-3">
                <div className="col-4 col-sm-3 pr-2">
                    <select className="form-control" value={this.state.formCurrency}
                        onChange={(e) => {this.updateCurrency(e)}}>
                        {currencyOptions}
                    </select>
                </div>
                <div className="col-8 col-sm-9">
                    <input type="number" className={inputClassName} value={this.state.formAmount}
                        onChange={(e) => {this.updateAmount(e)}} />

                    <div className="invalid-feedback">
                        Amount is more than what the system supports
                    </div>
                </div>
            </div>
        )
    }

    // =====

    updateCurrency(e) {
        e.preventDefault()
        const targetValue = e.target.value

        this.setState({
            formCurrency: targetValue,
        })

        this.props.updateSetCurrency(e.target.value)
    }

    updateAmount(e) {
        e.preventDefault()
        const targetValue = e.target.value

        this.setState({
            formAmount: targetValue,
            formValid: true,
        })

        const isValueSafe = Number.isSafeInteger(Number(targetValue))
        if (isValueSafe) {
            this.props.updateSetAmount(targetValue)
        }
        else {
            this.setState({
                formValid: false,
            })
        }
    }

}


export default HomeForm
