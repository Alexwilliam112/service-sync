'use strict'
const Identifiers = require('../lib/keywords')

module.exports = (() => {
    const generateRegex = (keyword) => {
        return new RegExp(keyword.split('').join('[aeiou]*'), 'i')
    }

    class Filter {
        static isQueryingOrder(message) {
            const orderPattern = /\bORD\b/;
            return orderPattern.test(message)
        }

        static isAskingOrder (message) {
            for (const keyword of Identifiers.QUERIES()) {
                const regex = generateRegex(keyword)

                if (regex.test(message)) {
                    return true;
                }
            }
            return false;
        }

        static isAngry (message) {
            for (const keyword of Identifiers.RED_FLAGS()) {
                const regex = generateRegex(keyword)
                const uppercaseWordsPattern = /\b[A-Z]{2,}\b/g;
                const matches = message.match(uppercaseWordsPattern)

                if (regex.test(message)) return true;
                if(matches && matches.length >= 2) return true;
            }
            return false;
        }
    }

    return Filter
})()