import React, { Component } from 'react'

import CurrencyCard from './CurrencyCard'
import CurrencyUtil from './CurrencyUtil'


class SettingsContainer extends Component {
    cacheShownKey = 'rate-shown-v1'

    constructor(props) {
        super(props)

        this.state = {
            shown: CurrencyUtil.getShownCurrencyList(),
        }

        this.changeCheckboxShow = this.changeCheckboxShow.bind(this)
    }

    render() {
        const currencyList = Object.keys(this.props.currencyData).sort()

        const currencyListChoice = currencyList.map((i) => {
            const checkboxId = `checkbox-${i}`
            const checkboxChecked = (this.state.shown.indexOf(i) !== -1)

            const prepend = (
                <div className="custom-control custom-checkbox zoom-checkbox">
                    <input id={checkboxId} type="checkbox" className="custom-control-input"
                        value={i} checked={checkboxChecked}
                        onChange={(e) => this.changeCheckboxShow(e)} />

                    <span className="custom-control-label">&#8203;</span>
                </div>
            )

            return (
                <label key={i} className="d-block mb-0" htmlFor={checkboxId}>
                    <CurrencyCard currency={i} prepend={prepend} />
                </label>
            )
        })

        return (
            <div>
                <p className="text-center">
                    Select which currency to display
                </p>

                <div className="border-top">
                    {currencyListChoice}
                </div>
            </div>
        )
    }

    // =====

    changeCheckboxShow(e) {
        const checkbox = e.target
        const checkboxIsAdd = checkbox.checked
        const checkboxValue = checkbox.value

        const newShown = this.state.shown

        if (checkboxIsAdd) {
            newShown.push(checkboxValue)
        }
        else {
            const currencyIndex = newShown.indexOf(checkboxValue)
            newShown.splice(currencyIndex, 1)
        }

        this.setState({
            shown: newShown,
        })

        CurrencyUtil.setShownCurrencyList(newShown)
    }
}


export default SettingsContainer
