const makeUrl = (url, resource) => `${url}/${resource}`

const whitAxios = (url) => () => axios(url)

const whitFetch = (url) => () => fetch(url)

;(async () => {
    const url = 'http://localhost:3000/files'
    const resource = 'test.jpg'
    const repeatReq = 100
    const repeatTest = 5
    const totalRequests = (repeatReq * repeatTest) * 2

    const ax = () => makeBencher(log('Bench Axios'), whitAxios(makeUrl(url, resource)), repeatReq)
    const ft = () => makeBencher(log('Bench Fetch'), whitFetch(makeUrl(url, resource)), repeatReq)
    const t1 = await repeat(ax, repeatTest)
    const t2 = await repeat(ft, repeatTest)

    const t1p = getPromedy(t1.flat(1))
    const t2p = getPromedy(t2.flat(1))

    console.clear()
    console.log('Total Requests', totalRequests)
    console.log('Tiempo promedio por consulta')
    console.log('Axios ±', t1p, 'ms')
    console.log('Fetch ±', t2p, 'ms')
    console.log('Porcentaje de diferencia', getValuesDifPorcent(t1p, t2p) + '%')
})()
