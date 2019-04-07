const server = require('./server')
const puppeteer = require('puppeteer')

const main = async () => {
    const port = 3000
    const pti = require('puppeteer-to-istanbul')
    await server().listen(port)
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    page.on('console', msg => console.log(msg.text()))
    await page.coverage.startJSCoverage()
    await page.goto(`http://localhost:${port}/index.html`)

    await page.evaluate(async () => {
        await main(url(resources.image), 1000, 5)
    })

    const jsCoverage = await page.coverage.stopJSCoverage()
    pti.write(jsCoverage)
    await browser.close()
    process.exit()
}
