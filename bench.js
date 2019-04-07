const server = require('./server')
const puppeteer = require('puppeteer')
const pti = require('puppeteer-to-istanbul')
const arg = require('arg')

const args = arg({
    '--req': Number
    , '--rep': Number
})

const resources = {
    foo: 'foo'
    , image: 'files/image.jpg'
    , fooJson: 'files/test.json'
    , imageLarge: 'files/image_large.jpg'
}

const port = 3000
const openUrl = (indexFile) => `http://localhost:${port}/${indexFile}`

const main = async ({
    cache
    , index
    , resource
    , requests
    , repetitions
}) => {
    await server(cache).listen(port)
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    page.on('console', msg => console.log(msg.text()))

    await page.coverage.startJSCoverage()
    await page.goto(openUrl(index))
    await page.evaluate((cache, res, reqs, repts) => main(cache, url(res), reqs, repts), cache, resource, requests, repetitions)

    const jsCoverage = await page.coverage.stopJSCoverage()
    pti.write(jsCoverage)
    await browser.close()
    process.exit()
}

main({
    cache: false
    , index: 'index.min.html'
    , resource: resources.image
    , requests: args['--req']
    , repetitions: args['--rep']
})
