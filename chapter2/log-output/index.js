let randomString = ""
for (let i = 0; i < 10; i++) {
    randomString = randomString + Math.floor(Math.random() * 10)
}

const logRandomString = () => {
    console.log(`${new Date()}:${randomString}`)
    setTimeout(logRandomString, 5000)
}

logRandomString()
