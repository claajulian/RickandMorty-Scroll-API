const requestTarget = document.querySelector('#request-target') // me traigo al div
const itemCointainer = document.querySelector('#item-container') // me traigo al main
const intersectionOptions = {
    threshold: 1 // que tanto del elemento tiene que estar visible para que se dispare intersectionobserver
}

let apiUrl = 'https://rickandmortyapi.com/api/character'
let loading = false


const onIntersect = ([entry]) => {
    // console.log(entry);
    if (apiUrl && !loading && entry.isIntersecting)
        makeRequest()
}

function makeRequest() {
    loading = true
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            cleanUp(data.info.next)
            renderItems(data.results)
        })
}

function cleanUp(nextPage) {
    apiUrl = nextPage
    loading = false
}

function renderItems(results) {
    results.forEach(item => {
        itemCointainer.appendChild(createItem(item))
    })
}

function createItem(item) {
    const newItem = document.createElement('div')
    newItem.classList.add ('item')
    newItem.innerHTML = (
        `<div class="char-id"> ${item.id} </div>
         <div class="char-name"> ${item.name} </div>
         <img class="char-img" src=${item.image} </img>
         <div class="char-species"> ${item.species} </div>

        `
    )
    return newItem
}


let observer = new IntersectionObserver(onIntersect, intersectionOptions) // le pasamos dos variables

observer.observe(requestTarget)

