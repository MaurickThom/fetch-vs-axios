const server = require('./server')
const puppeteer = require('puppeteer');

(async () => {
    const port = 3000
    await server().listen(port)
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    page.on('console', msg => console.log(msg.text()))
    await page.goto(`http://localhost:${port}/index.html`)
    await page.evaluate(async () => {
        await main(url(resources.image), 100, 5)
    })
    // await browser.close()
})()
