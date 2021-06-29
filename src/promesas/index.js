// Promesas Esctructura basica

const somethingWillHappen = () => {


    return new Promise((resolve, reject) => {

        if (true) {
            resolve('Cool!')

        } else {

            reject('Not cool!')

        }

    });

};

somethingWillHappen()
    .then(response => console.log(response))
    .catch(err => console.log(err))



const somethingWillHappen_with_time = () => {


    return new Promise((resolve, reject) => {

        if (true) {

            setTimeout(() => {
                resolve('Cool!')
            }, 3000);

        } else {

            const error = new Error('Not Cool!')

            reject(error)

        }

    });

};



somethingWillHappen_with_time()
    .then(response => console.log(response))
    .catch(err => console.log(err))


// Varias promesas a la vez
// Si falla una las siguientes fallan 

Promise.all([somethingWillHappen(), somethingWillHappen_with_time()])
    .then((response) => {
        console.log('Array of results', response);
    })
    .catch(err => console.log(err, "todas"))

