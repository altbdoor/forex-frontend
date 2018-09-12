import React, { Component } from 'react'

import {
    HashRouter,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom'

import CurrencyUtil from './modules/CurrencyUtil'
import Navbar from './modules/Navbar'
import StatusBar from './modules/StatusBar'

import HomeContainer from './modules/HomeContainer'
import SettingsContainer from './modules/SettingsContainer'
import AboutContainer from './modules/AboutContainer'


class App extends Component {
    innerInterval = null

    constructor(props) {
        super(props)

        this.state = {
            currencyLoading: true,
            currencyData: {},
            lastUpdated: null,
            isOnline: true,
        }

        this.resetInnerInterval = this.resetInnerInterval.bind(this)
    }

    componentDidMount() {
        this.startInnerInterval()
    }

    render() {
        const InjectedHomeContainer = ((props) => {
            return (
                <HomeContainer currencyLoading={this.state.currencyLoading}
                    currencyData={this.state.currencyData}
                    {...props} />
            )
        })

        const InjectedSettingsContainer = ((props) => {
            return (
                <SettingsContainer currencyData={this.state.currencyData}
                    {...props} />
            )
        })

        return (
            <HashRouter>
                <div>
                    <Navbar refresh={this.resetInnerInterval} />
                    <div className="pt-5 pb-4"></div>

                    <div className="container custom-container pb-4">
                        <Switch>
                            <Route exact path="/home" render={InjectedHomeContainer} />
                            <Route exact path="/settings" render={InjectedSettingsContainer} />
                            <Route exact path="/about" component={AboutContainer} />
                            <Redirect to="/home" />
                        </Switch>
                    </div>

                    <StatusBar currencyLoading={this.state.currencyLoading}
                        lastUpdated={this.state.lastUpdated}
                        isOnline={this.state.isOnline} />
                </div>
            </HashRouter>
        )
    }

    // =====

    startInnerInterval() {
        const self = this
        const halfHour = 1000 * 60 * 30

        const intervalFn = (() => {
            self.setState({
                currencyLoading: true,
            })

            CurrencyUtil.getRates(true).then((d) => {
                self.setState({
                    currencyLoading: false,
                    currencyData: d.rates,
                    lastUpdated: new Date(d.epoch),
                    isOnline: true,
                })
            }).catch(() => {
                self.offlineIntervalHandler()
                self.setState({
                    isOnline: false,
                })
            })
        })

        intervalFn()
        this.innerInterval = setInterval(intervalFn, halfHour)
    }

    resetInnerInterval() {
        clearInterval(this.innerInterval)
        this.startInnerInterval()
    }

    offlineIntervalHandler() {
        CurrencyUtil.getRates(false).then((d) => {
            this.setState({
                currencyLoading: false,
                currencyData: d.rates,
                lastUpdated: new Date(d.epoch),
            })
        })
    }

}


export default App
