const makeUrl = (url, resource) => url && `${url}/${resource}`

const log = (id) => () => console.log(id)

const whitAxios = (url) => () => axios(url)

const whitFetch = (url) => () => fetch(url)

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

const run = async () => {
    const url = 'http://localhost:3000'
    const resource = 'test.jpg'
    const repeatReq = 100
    const repeatTest = 5
    const totalRequests = (repeatReq * repeatTest) * 2

    const ax = () => makeBencher(log('Bench Axios'), whitAxios(makeUrl(url, resource)), repeatReq)
    const ft = () => makeBencher(log('Bench Fetch'), whitFetch(makeUrl(url, resource)), repeatReq)
    const t2 = await repeat(ft, repeatTest)
    const t1 = await repeat(ax, repeatTest)

    const t1p = getPromedy(t1.flat(1))
    const t2p = getPromedy(t2.flat(1))

    console.clear()
    console.log('Total Requests', totalRequests)
    console.log('Tiempo promedio por consulta')
    console.log('Axios ±', t1p, 'ms')
    console.log('Fetch ±', t2p, 'ms')
    console.log('Porcentaje de diferencia', getValuesDifPorcent(t1p, t2p) + '%')
}

run()
