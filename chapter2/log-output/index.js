const generateRandomString = () => {
    let randomString = ""
    for (let i = 0; i < 10; i++) {
        randomString = randomString + Math.floor(Math.random() * 10)
    }
    console.log(`${new Date()}:${randomString}`)
    setTimeout(generateRandomString, 5000)
}

generateRandomString()
