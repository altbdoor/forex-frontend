import React, { Component } from 'react'

import CurrencyUtil from './CurrencyUtil'
import CurrencyCard from './CurrencyCard'
import HomeForm from './HomeForm'


class HomeContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            setCurrency: CurrencyUtil.getLastSetCurrency(),
            setAmount: CurrencyUtil.getLastSetAmount(),
        }

        this.updateSetCurrency = this.updateSetCurrency.bind(this)
        this.updateSetAmount = this.updateSetAmount.bind(this)
    }

    render() {
        const currencyList = Object.keys(this.props.currencyData).sort()
        let orderedCurrencyComponent = null

        if (!this.props.currencyLoading) {
            const shownCurrencies = CurrencyUtil.getShownCurrencyList()

            orderedCurrencyComponent = currencyList.filter((i) => {
                return (
                    i !== this.state.setCurrency &&
                    shownCurrencies.indexOf(i) !== -1
                )

            }).map((currency) => {
                const fromAmount = this.props.currencyData[this.state.setCurrency]
                const toAmount = this.props.currencyData[currency]

                let finalAmount = toAmount / fromAmount * this.state.setAmount
                finalAmount = finalAmount.toLocaleString(undefined, {
                    minimumFractionDigits: 4,
                    maximumFractionDigits: 4,
                })

                const prepend = (
                    <span className="text-monospace">
                        {finalAmount}
                    </span>
                )

                return (
                    <CurrencyCard key={currency}
                        currency={currency}
                        prepend={prepend} />
                )
            })

            if (orderedCurrencyComponent.length === 0) {
                orderedCurrencyComponent = (
                    <div className="border-bottom py-2 text-center">
                        Go into Settings to show currencies
                    </div>
                )
            }
        }

        return (
            <div>
                <HomeForm currencyList={currencyList}
                    setCurrency={this.state.setCurrency}
                    setAmount={this.state.setAmount}
                    updateSetCurrency={this.updateSetCurrency}
                    updateSetAmount={this.updateSetAmount} />

                <div className="border-top">
                    {orderedCurrencyComponent}
                </div>
            </div>
        )
    }

    // =====

    updateSetCurrency(newCurrency) {
        this.setState({
            setCurrency: newCurrency,
        })

        CurrencyUtil.setLastSetCurrency(newCurrency)
    }

    updateSetAmount(newAmount) {
        const fixedNewAmount = Number(newAmount)

        if (!isNaN(newAmount)) {
            this.setState({
                setAmount: fixedNewAmount,
            })

            CurrencyUtil.setLastSetAmount(fixedNewAmount)
        }

    }

}


export default HomeContainer
