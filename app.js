const numSection = document.getElementById("number-section");
const cardSection = document.getElementById("card-section");
const drawBtn = document.getElementById("draw-btn")

const baseUrl = "http://numbersapi.com/";

const putFactOnPage = (factText) => {
    let newFact = `
    <span class="card-selection">
        ${factText}
    </span><br>
    `
    numSection.innerHTML += newFact
}

let favNum = 74
async function getNumFact(favNum) {
    let res = await axios.get(`${baseUrl}${favNum}?json`)
    let fact = res.data.text
    return fact
}

getNumFact(favNum).then(fact => putFactOnPage(fact))

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
        getNumFact(favNum)
    )
}
Promise.all(multiFav)
    .then(reqs => (
        reqs.forEach(req => {
            putFactOnPage(req)
        })
    ))


class Deck {
    constructor() {
        this.baseUrl = "https://deckofcardsapi.com/api/deck/";
        this.id = "";
    }

    async getId() {
        let res = await axios.get(`${this.baseUrl}new/shuffle/?deck_count=1`)
        this.id = res.data.deck_id
    }
    async draw(num = 1) {
        let res = await axios.get(`${this.baseUrl}${this.id}/draw/?count=${num}`)
        return res.data.cards
    }
    async drawOne() {
        let res = await axios.get(`${this.baseUrl}${this.id}/draw/?count=1`)
        return res.data.cards[0]
    }
}

let newDeck = new Deck;

const putCardOnPage = (cardUrl) => {
    let newCard = `
    <span class="card-selection">
        <img src="${cardUrl}"></img>
    </span>
    `
    cardSection.innerHTML += newCard
}

async function drawBtnHandler() {
    newCard = await newDeck.drawOne()
    putCardOnPage(newCard.image)
}

drawBtn.addEventListener("click", drawBtnHandler)

async function getNewDeck(){
    await newDeck.getId()
    firstCard = await newDeck.drawOne()
    putCardOnPage(firstCard.image)
}

getNewDeck()