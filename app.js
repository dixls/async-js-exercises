const baseUrl = "http://numbersapi.com/";
let favNum = 74
axios.get(`${baseUrl}${favNum}?json`)
    .then(req => {
        console.log(req.data.text)
    })

let multiNum = []
for (let i = 1; i<5; i++){
    multiNum.push(
        axios.get(`${baseUrl}${i}?json`)
    )
}

Promise.all(multiNum)
    .then(reqs => {
        reqs.forEach(req => console.log(req.data.text))
    })

let multiFav = []
for (let i=1; i<5; i++){
    multiFav.push(
        axios.get(`${baseUrl}${favNum}?json`)
    )
}

Promise.all(multiFav)
    .then(reqs => (
        reqs.forEach(req => console.log(req.data.text))
    ))