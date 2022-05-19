const numSection = document.getElementById("number-section");
const cardSection = document.getElementById("card-section");
const drawBtn = document.getElementById("draw-btn")

const baseUrl = "http://numbersapi.com/";

let favNum = 74
axios.get(`${baseUrl}${favNum}?json`)
    .then(req => {
        putFactOnPage(req.data.text)
    })

let multiNum = []
for (let i = 1; i < 5; i++) {
    multiNum.push(
        axios.get(`${baseUrl}${i}?json`)
    )
}

Promise.all(multiNum)
    .then(reqs => {
        reqs.forEach(req => {
            putFactOnPage(req.data.text)
        })
    })

let multiFav = []
for (let i = 1; i < 5; i++) {
    multiFav.push(
        axios.get(`${baseUrl}${favNum}?json`)
    )
}

Promise.all(multiFav)
    .then(reqs => (
        reqs.forEach(req => {
            putFactOnPage(req.data.text)
        })
    ))

const putFactOnPage = (factText) => {
    let newFact = `
    <span class="card-selection">
        ${factText}
    </span><br>
    `
    numSection.innerHTML += newFact
}

let deckId = ""
const deckBaseUrl = "https://deckofcardsapi.com/api/deck/"
axios.get(`${deckBaseUrl}new/shuffle/?deck_count=1`)
    .then(req => {
        console.log(req)
        deckId = req.data.deck_id
    })
    .then(req2 => {
        console.log("req2 is ", req2)
        return axios.get(`${deckBaseUrl}${deckId}/draw/?count=1`)
    })
    .then(req3 => {
        console.log("req3 is ", req3)
        console.log(req3.data.cards[0])
        let cardUrl = req3.data.cards[0].image
        putCardOnPage(cardUrl)
    })
    .catch(err => console.log("something really went wrong"))

const drawACard = () => {
    return axios.get(`${deckBaseUrl}${deckId}/draw/?count=1`)
}


const putCardOnPage = (cardUrl) => {
    let newCard = `
    <span class="card-selection">
        <img src="${cardUrl}"></img>
    </span>
    `
    cardSection.innerHTML += newCard
}

drawBtn.addEventListener("click", () => {
    drawACard()
        .then(req => {
            putCardOnPage(req.data.cards[0].image)
        })
        .catch(err => console.log("something went wrong"))
})