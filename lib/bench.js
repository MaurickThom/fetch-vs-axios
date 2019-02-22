/* eslint no-unused-vars: 0 */

const log = (id) => () => console.log(id)

const getPromedy = (values) => Math.round((values.reduce((a, b) => a + b) / values.length))

const getValuesDifPorcent = (a, b) => {
    const max = Math.max(a, b)
    const min = Math.min(a, b)
    const dif = max - min
    return Math.round((dif / min) * 100)
}

const makeBencher = async (log, fn, times) => {
    const perform = []
    let startTime = null

    while (times--) {
        startTime = performance.now()
        await fn()
        perform.push(performance.now() - startTime)
        log()
    }

    return perform
}

const repeat = async (fn, times) => {
    const values = []
    while (times--) {
        values.push(await fn())
    }

    return values
}
