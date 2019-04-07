const resources = {
    foo: 'foo'
    , image: 'files/image.jpg'
    , fooJson: 'files/test.json'
    , imageLarge: 'files/image_large.jpg'
}

const log = (id) => (...msj) => console.log(id, ...msj)

const whitAxios = (url) => () => axios(url)

const whitFetch = (url) => () => fetch(url)

const makeUrl = (url, resource) => `${url}/${resource}`

// eslint-disable-next-line no-unused-vars
const url = (r) => makeUrl('http://localhost:3000', r)

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
 * Las pruebas son muy simples, a continuación detallo los procedimientos:
 * Se realizan las pruebas de forma serial, para evitar que se extrese de forma exesiba el proceso y pueda
 * alterar las pruebas, se podria ejecutar las prubas por separado, pero no he notado diferencias.
 * Ejemplo: se realizan 100 request con Axios/Fetch, se repite el proceso 5 veces, (cantidad consultas * cantidad repeticiónes), paso seguido
 * se saca un promedio en base a los tiempos de respuesta de cada ejecución.
 *
 * @param {string} giveURL url del recurso
 * @param {string} resource recurso
 * @param {number} requests cantidad de consultas
 * @param {number} repetitions cantidad de repeticiónes de las pruebas
 */
// eslint-disable-next-line no-unused-vars
const main = async (giveURL, requests, repetitions) => {
    const req = await fetch(url(resources.image))
    const total = (requests * repetitions) * 2
    const ax = () => makeBencher(log('Axios'), whitAxios(giveURL), requests)
    const ft = () => makeBencher(log('Fetch'), whitFetch(giveURL), requests)
    // Se prueba Axios
    const t1 = await repeat(ax, repetitions)
    // Se prueba Fetch
    const t2 = await repeat(ft, repetitions)

    const t1p = getPromedy(t1.flat(1))
    const t2p = getPromedy(t2.flat(1))

    console.log('')
    console.log('')
    console.log('Total Requests:', total)
    console.log('Recurso:', resources.image)
    console.log('Tipo de dato:', req.headers.get('Content-type'))
    console.log('Tamaño del dato:', req.headers.get('Content-length'))
    console.log('Tiempo promedio por consulta')
    console.log('Axios ±', t1p, 'ms')
    console.log('Fetch ±', t2p, 'ms')
    console.log('Porcentaje de diferencia:', getValuesDifPorcent(t1p, t2p) + '%')
    console.log('')
    console.log('')
}
