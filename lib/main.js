const log = (id) => (...msj) => console.log(id, ...msj)

const whitAxios = (url) => () => axios(url)

const whitFetch = (url) => () => fetch(url)

// eslint-disable-next-line no-unused-vars
const makeUrl = (url, resource) => `${url}/${resource}`

// eslint-disable-next-line promise/param-names
const delay = (t) => new Promise((r) => setTimeout(r, t))

/**
 * Busca el promedio de respuesta
 * Suma todos los resultados y divide por el total
 * @param {Array<number>} values
 */
const getPromedy = (values) => Math.round((values.reduce((a, b) => a + b) / values.length))

/**
 * Se calcula la diferencia en porcentaje entre dos magnitudes
 * @param {number} a
 * @param {number} b
 * @returns
 */
const getValuesDifPorcent = (a, b) => {
    const max = Math.max(a, b)
    const min = Math.min(a, b)
    const dif = max - min
    return Math.round((dif / min) * 100)
}

/**
 * Funcion generica para realizar pruebas de forma serial y calcular los tiempos de ejecución
 * @param {Function} log logger
 * @param {Function} fn funcion que se va a repetir de forma serial
 * @param {number} times cantidad de veces que se va a ejecutar la funcion
 * @returns
 */
const makeBencher = async (log, fn, times) => {
    const perform = []
    let startTime = null

    while (times--) {
        startTime = performance.now()
        await fn()
        const time = performance.now() - startTime
        perform.push(time)
        log(times, 'repeat', `± ${Math.round(time)}ms`)
    }

    return perform
}

/**
 * Funcion para reproducir las prubas, cierta cantidad de veces
 * Ejemplo:
 * la funcion makeBench se ejecuta 100 veces, se realizan 100 consultas, con Axios,
 * luego se repite la ejecución de makeBench 5 veces.
 * @param {Function} fn funcion a ejecutarse de forma repetida
 * @param {*} times cantidad de repeteciónes
 * @returns
 */
const repeat = async (fn, times) => {
    const values = []
    // Se genera una ejecución de bucle bloqueante
    while (times--) {
        values.push(await fn())
    }

    return values
}

/**
 * @typedef {Object} Main
 * @property {boolean} cache enable client side cache
 * @property {string} resource Resource /binary/plain text/etc
 * @property {string} giveURL URL of resource
 * @property {number} requests Number of request
 * @property {number} repetitions Number of test repetition.
 */

/**
 * Las pruebas son muy simples, a continuación detallo los procedimientos:
 * Se realizan las pruebas de forma serial, para evitar que se extrese de forma exesiba el proceso y pueda
 * alterar las pruebas, se podria ejecutar las prubas por separado, pero no he notado diferencias.
 * Ejemplo: se realizan 100 request con Axios/Fetch, se repite el proceso 5 veces, (cantidad consultas * cantidad repeticiónes), paso seguido
 * se saca un promedio en base a los tiempos de respuesta de cada ejecución.
 * @param {Main} {
 *     cache = false
 *     , resource
 *     , giveURL
 *     , requests
 *     , repetitions
 * }
 */
// eslint-disable-next-line no-unused-vars
const main = async ({
    url
    , cache = false
    , requests
    , repetitions
    , delaySeconds = 3000
}) => {
    const req = await fetch(url)
    const resource = new URL(url).pathname
    const total = (requests * repetitions) * 2
    const ax = () => makeBencher(log('Axios'), whitAxios(url), requests)
    const ft = () => makeBencher(log('Fetch'), whitFetch(url), requests)

    // Se prueba Fetch
    const t2 = await repeat(ft, repetitions)

    log('Delay')(delaySeconds)
    await delay(delaySeconds)

    // Se prueba Axios
    const t1 = await repeat(ax, repetitions)

    const t1p = getPromedy(t1.flat(1))
    const t2p = getPromedy(t2.flat(1))

    console.log('')
    console.log('')
    console.log('Cache status:', cache)
    console.log('Total requests:', total)
    console.log('Resource:', resource)
    console.log('Content type:', req.headers.get('Content-type'))
    console.log('Content length:', req.headers.get('Content-length'))
    console.log('Promedy time per request')
    console.log('Axios ±', t1p, 'ms')
    console.log('Fetch ±', t2p, 'ms')
    console.log('Percent difference:', getValuesDifPorcent(t1p, t2p) + '%')
    console.log('')
    console.log('')
}

// DEMO
// main({
//     url: makeUrl('http://localhost:3000', 'files/image.jpg')
//     , cache: false
//     , requests: 50
//     , repetitions: 5
// })
