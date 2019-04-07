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

const main = async (resource, requests, repetitions) => {
    const port = 3000
    await server().listen(port)
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    page.on('console', msg => console.log(msg.text()))

    await page.coverage.startJSCoverage()
    await page.goto(`http://localhost:${port}/index.html`)
    await page.evaluate((res, reqs, repts) => main(url(res), reqs, repts), resource, requests, repetitions)

    const jsCoverage = await page.coverage.stopJSCoverage()
    pti.write(jsCoverage)
    await browser.close()
    process.exit()
}

main(resources.image, args['--req'], args['--rep'])
