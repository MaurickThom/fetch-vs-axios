const http = require('http')
const fs = require('fs')
const { join } = require('path')
// eslint-disable-next-line node/no-deprecated-api
const { parse } = require('url')

const config = {
    host: '0.0.0.0'
    , port: 3000
}

const pipe = (pathname, res) => fs.createReadStream(join(__dirname, pathname)).pipe(res)
const jsonFile = JSON.stringify(fs.readFileSync(join(__dirname, 'test.json')))

http.createServer((req, res) => {
    // res.setHeader('Cache-Control', 'public, max-age=86400')
    const { pathname } = parse(req.url)

    switch (pathname) {
        case '/test.json': {
            // direct from memory
            res.setHeader('Content-Type', 'application/json')
            res.end(jsonFile)
            return
        }

        case '/test.jpg': {
            res.setHeader('Content-Type', 'image/jpeg')
            pipe(pathname, res)
            return
        }

        case '/foo': {
            res.setHeader('Content-Type', 'application/json')
            res.end({
                foo: 'foo'
            })
            return
        }

        default: {
            // stream pipe from source disk
            pipe(pathname, res)
        }
    }
}).listen(config, () => console.log('listen on port', config.port))
