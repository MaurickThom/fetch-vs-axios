const url = 'http://localhost:3000/files/test.jpg'

const img = document.getElementById('image')

const whitFetch = () => {
    return fetch(url)
        .then((r) => r.blob())
        .then((blob) => URL.createObjectURL(blob))
        .then((url) => img.src = url)
}

const whitAxios = () => {
    return axios(url, {
        responseType: 'arraybuffer'
    })
        .then((r) => new Blob([r.data]))
        .then((blob) => URL.createObjectURL(blob))
        .then((url) => img.src = url)
}

const run = async () => {
    const ft = await makeBencher(log('fetch'), whitFetch, 100)
    const ax = await makeBencher(log('axios'), whitAxios, 100)
    console.log(getPromedy(ft))
    console.log(getPromedy(ax))
}

run()
