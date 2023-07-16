const searchForm = document.querySelector(".search-form") 
const seachInput = document.querySelector(".search-input")
const results = document.querySelector(".results")

const url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch="


searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const value = seachInput.value
    if (!value) {
        results.innerHTML = `<div class="message">Please enter a valid search term!</div>`
        return
    }
    fetchPages(value)
})

const fetchPages = async (value) => {
    results.innerHTML = `<div class="loading"></div>`
    try {
        const response = await fetch(url + value)
        const data = await response.json()
        const pages = data.query.search
        if (pages.length < 1) {
            results.innerHTML = `<div class="message">No matching results!</div>`
            return
        }
        renderResults(pages)
    } 
    catch (error) {
        results.innerHTML = `<div class="message">There was an error. Please try again later!</div>`
    }
}

const renderResults = (list) => {
    const cards = list.map(item => {
        const { title, snippet, pageid } = item
        return (`
            <a href="http://en.wikipedia.org/?curid=${pageid}" class="card" target="_blank">
                <h3>${title}</h3>
                <p>${snippet}...</p>
            </a>
        `)
    }).join("")
    results.innerHTML = `<article class="cards">${cards}</article>`
}