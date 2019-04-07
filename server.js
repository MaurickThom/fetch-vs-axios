const http = require('http')
const fs = require('fs')
const { join } = require('path')
// eslint-disable-next-line node/no-deprecated-api
const { parse } = require('url')

// serve in all interfaces
const config = {
    host: '0.0.0.0'
    , port: 3000
}

const pipe = (pathname, res) => {
    fs.stat(join(__dirname, pathname), (err, stats) => {
        if (err) throw err
        res.setHeader('Content-length', stats.size)
        fs.createReadStream(join(__dirname, pathname)).pipe(res)
    })
}

/**
 * Simple servidor para realizar los benchmarks
 * @param {boolean} [cache=false] envia el header de control de cache
 * @returns
 */
const server = (cache = false) => {
    const jsonFile = JSON.stringify(fs.readFileSync(join(__dirname, 'files/test.json')))
    const jsonLiteral = JSON.stringify({
        foo: 'foo'
    })

    return http.createServer((req, res) => {
        cache && res.setHeader('Cache-Control', 'public, max-age=86400')
        const { pathname } = parse(req.url)

        switch (pathname) {
            case '/favicon.ico': {
                res.end()
                return
            }

            case '/files/test.json': {
                // serve direct from memory
                res.setHeader('Content-Type', 'application/json')
                res.setHeader('Content-length', jsonFile.length)
                res.end(jsonFile)
                return
            }

            case '/files/image.jpg' || '/files/image_large.jpg': {
                // serve in stream from disk
                res.setHeader('Content-Type', 'image/jpg')
                pipe(pathname, res)
                return
            }

            case '/foo': {
                // serve plain text serialized json
                res.setHeader('Content-Type', 'application/json')
                res.setHeader('Content-length', jsonLiteral.length)
                res.end(jsonLiteral)
                return
            }

            // serve all others things
            default: {
                pipe(pathname, res)
            }
        }
    })
}

server().listen(config, () => console.log('listen on port', config.port))
