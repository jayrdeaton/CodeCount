const TIMEOUT = 10000

module.exports = (time) => new Promise((resolve, reject) => setTimeout(resolve, time || TIMEOUT))
