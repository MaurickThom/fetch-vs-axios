
const whitAxios = (url) => () => axios(url)

const whitFetch = (url) => () => fetch(url)

const log = (id) => (msj) => console.log(id, msj)

const makeUrl = (url, resource) => `${url}/${resource}`

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
        log('repeat')
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

/**
 * Se realizan las pruebas de forma serial para evitar que se demaciado extrese el procesador y pueda
 * influenciar en las pruebas
 * Se prueba Axios
 * @param {string} url url del recurso
 * @param {string} resource recurso
 * @param {number} requests cantidad de consultas
 * @param {number} repetitions cantidad de repeticiónes de las pruebas
 */
const main = async (url, resource, requests, repetitions) => {
    const total = (requests * repetitions) * 2
    const ax = () => makeBencher(log('Axios'), whitAxios(makeUrl(url, resource)), requests)
    const ft = () => makeBencher(log('Fetch'), whitFetch(makeUrl(url, resource)), requests)
    // Se prueba Axios
    const t1 = await repeat(ax, repetitions)
    // Se prueba Fetch
    const t2 = await repeat(ft, repetitions)

    const t1p = getPromedy(t1.flat(1))
    const t2p = getPromedy(t2.flat(1))

    console.clear()
    console.log('Total Requests', total)
    console.log('Tiempo promedio por consulta')
    console.log('Axios ±', t1p, 'ms')
    console.log('Fetch ±', t2p, 'ms')
    console.log('Porcentaje de diferencia', getValuesDifPorcent(t1p, t2p) + '%')
}

/*
   Se realizan 100 consultas
   Se repiten las pruebas 5 veces
   Se saca un promedio entre los tiempo de respuestas
*/

main('http://localhost:3000/files', 'test.jpg', 100, 5)
