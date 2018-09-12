import lscache from 'lscache'


class CurrencyUtil {
    static getLastSetCurrency() {
        const data = lscache.get('rate-currency-v1')
        return (data || 'USD')
    }

    static setLastSetCurrency(currency) {
        lscache.set('rate-currency-v1', currency)
    }

    // =====

    static getLastSetAmount() {
        const data = lscache.get('rate-amount-v1')
        return (Number(data) || 100)
    }

    static setLastSetAmount(amount) {
        lscache.set('rate-amount-v1', amount)
    }

    // =====

    static getShownCurrencyList() {
        let list = lscache.get('rate-shown-v1')

        if (list === null) {
            list = [
                'AUD', 'GBP', 'CAD', 'CNY', 'EUR', 'JPY', 'MYR', 'RUB', 'SGD',
                'CHF', 'USD',
            ]
        }

        return list
    }

    static setShownCurrencyList(list) {
        lscache.set('rate-shown-v1', list)
    }

    // =====

    static getIgnoredCurrencyList() {
        const list = [
            // referred to the link below
            // https://bank-info.in/list-countries-flag-currency

            // non-country currency
            'BTC', 'XAG', 'XDR', 'XPD', 'XPT', 'XAU',

            // no flag currency
            'ANG', 'XAF', 'XCD', 'XOF', 'XPF',

            // duplicate currency
            'CLF', 'CNH', 'CUC', 'MRU', 'STN', 'VES',
        ]

        return list
    }

    static getRates(force=false) {
        const cacheKey = 'rate-data-v1'
        let cacheData = lscache.get(cacheKey)
        let promise = null
        let isNewData = true

        if (force) {
            cacheData = null
        }

        if (cacheData !== null) {
            isNewData = false
            promise = Promise.resolve(cacheData)
        }
        else {
            promise = this.getLatestRates()
        }

        if (isNewData) {
            promise = promise.then((data) => {
                this.getIgnoredCurrencyList().forEach((i) => {
                    if (i in data) {
                        delete data[i]
                    }
                })

                const dataWithDate = {
                    epoch: Date.now(),
                    rates: data,
                }

                lscache.set(cacheKey, dataWithDate)
                return Promise.resolve(dataWithDate)
            })
        }

        return promise
    }

    static getLatestRates() {
        const githubUrl = 'https://raw.githubusercontent.com/altbdoor/forex-backend/json-data/data.json'
        const githubRequest = new Request(githubUrl, {
            cache: 'no-store',
        })

        return fetch(githubRequest).then((r) => {
            return r.json()
        })

        // const githubUrl = 'https://api.github.com/repos/altbdoor/forex-backend/commits/json-data'

        // const githubHeaders = new Headers({
        //     'Accept': 'application/vnd.github.v3+json',
        // })
        // const githubRequest = new Request(githubUrl, {
        //     headers: githubHeaders,
        //     cache: 'no-store',
        // })

        // return fetch(githubRequest).then((r) => {
        //     return r.json()
        // }).then((r) => {
        //     const sha = r.sha.substr(0, 7)
        //     const jsonUrl = `https://cdn.rawgit.com/altbdoor/forex-backend/${sha}/data.json`

        //     const jsonRequest = new Request(jsonUrl, {
        //         cache: 'no-store',
        //     })

        //     return fetch(jsonRequest)
        // }).then((r) => {
        //     return r.json()
        // })
    }
}


export default CurrencyUtil
