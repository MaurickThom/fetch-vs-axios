const server = require('../server');

(async () => {
    const port = 3000
    await server().listen(port)
})()
