let p = new Promise((resolve) => {
    console.log(1)
    setTimeout(() => {
        resolve()
    }, 1000)
})