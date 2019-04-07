const server = require('./server')
const puppeteer = require('puppeteer')
const pti = require('puppeteer-to-istanbul')
const arg = require('arg')

const args = arg({
    '--req': Number
    , '--rep': Number
})

const RESOURCES = {
    FOO: 'foo'
    , GIF: 'files/giphy.gif'
    , IMAGE: 'files/image.jpg'
    , FOO_JSON: 'files/test.json'
    , IMAGE_LARGE: 'files/image_large.jpg'
}

const PORT = 3000
const URL = `http://localhost:${PORT}`
const openUrl = (indexFile) => `${URL}/${indexFile}`

const main = async ({
    cache
    , index
    , resource
    , requests
    , repetitions
}) => {
    // start http server
    await server(cache).listen(PORT)

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const evalArgs = [URL, cache, resource, requests, repetitions]

    page.on('console', msg => console.log(msg.text()))

    // start coverage API
    await page.coverage.startJSCoverage()
    await page.goto(openUrl(index))
    await page.evaluate((url, cache, res, reqs, reps) => main({
        url: makeUrl(url, res)
        , cache
        , requests: reqs
        , repetitions: reps
    }), ...evalArgs)

    pti.write(await page.coverage.stopJSCoverage())

    await browser.close()
    process.exit()
}

main({
    cache: false
    , index: 'index.min.html'
    , resource: RESOURCES.IMAGE
    , requests: args['--req']
    , repetitions: args['--rep']
})
