const doSomethingAsync = () => {
    return new Promise((resolve, reject) => {
        (true)
            ? setTimeout(() => {
                resolve('Did something async')
            }, 3000)
            : reject(new Error('Test Error'))

    })
}


const doSomething = async () => {
    const something = await doSomethingAsync();
    console.log(something)

}


// Buena practica capturar los errores

const anotherCatchError = async () => {
    try {

        const something = await doSomethingAsync();
        console.log(something)

    } catch (error) {

        console.log(error)

    }
}

console.log('Antes without')
doSomething()
console.log('Despues')


console.log('Antes catch')
anotherCatchError()
console.log('Despues catch')