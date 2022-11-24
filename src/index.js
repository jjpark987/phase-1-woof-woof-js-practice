document.addEventListener('DOMContentLoaded', () => {
    const dogBar = document.getElementById('dog-bar')
    const dogInfo = document.getElementById('dog-info')
    let dogFilter = document.getElementById('good-dog-filter')

    fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(data => {
        for(const dog of data) {
            const span = document.createElement('span')
            span.textContent = dog.name
            span.addEventListener('click', () => {
                const dogDiv = document.createElement('div')
                dogDiv.className = 'displayed'
                
                const image = document.createElement('img')
                image.src = dog.image
                
                const name = document.createElement('h2')
                name.textContent = dog.name

                const button = document.createElement('button')
                if(dog.isGoodDog) {
                    button.textContent = 'Good Dog!'
                } else {
                    button.textContent = 'Bad Dog!'
                }
                button.className = 'btn'
                button.addEventListener('click', () => {
                    if(button.textContent === 'Good Dog!') {
                        console.log('good to bad')
                        button.textContent = 'Bad Dog!'

                        fetch(`http://localhost:3000/pups/${dog.id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({
                                isGoodDog: false
                            })
                        })
                        .then(response => response.json())
                        .then(data => console.log(data))
                        .catch(() => alert('There was an error with the PATCH request.'))
                    } else {
                        console.log('bad to good')
                        button.textContent = 'Good Dog!'

                        fetch(`http://localhost:3000/pups/${dog.id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({
                                isGoodDog: true
                            })
                        })
                        .then(response => response.json())
                        .then(data => console.log(data))
                        .catch(() => alert('There was an error with the PATCH request.'))
                    }
                })

                if(dogFilter.textContent === 'Filter good dogs: ON') {
                    if(!dog.isGoodDog) {
                        dogDiv.hidden = true
                    }
                }

                dogDiv.append(image, name, button)
                dogInfo.appendChild(dogDiv)
            })

            dogBar.appendChild(span)
        }
    })
    .catch(() => alert('There was an error with the GET request.'))


    let currentDogs
    dogFilter.addEventListener('click', () => {
        currentDogs = document.getElementsByClassName('displayed')

        if(dogFilter.textContent === 'Filter good dogs: OFF') {
            dogFilter.textContent = 'Filter good dogs: ON'
            for(const dog of currentDogs) {
                if(dog.querySelector('.btn').textContent === 'Bad Dog!') {
                    dog.hidden = true
                }
            }
        } else {
            dogFilter.textContent = 'Filter good dogs: OFF'
            for(const dog of currentDogs) {
                dog.hidden = false
            }
        }
    })
})