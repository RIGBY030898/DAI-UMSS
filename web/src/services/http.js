const get = async (url) => {
    var data = {}
    await fetch(url)
        .then((response) => response.json())
        .then((dataJSON) => (data = dataJSON))
        .catch((error) => (data = { message: error, status: 500 }))

    return data
}

const post = async (url, body) => {
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }
    var data = {}
    await fetch(url, option)
        .then((response) => response.json())
        .then((dataJSON) => {
            data = dataJSON
        })
        .catch((error) => {
            data = { message: error, status: 500 }
        })
    return data
}

export { get, post }
