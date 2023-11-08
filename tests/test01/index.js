const h1 = document.querySelector("h1")
const h2 = document.querySelector("h2")
const input = document.querySelector("input")

function updateDate(){
    let date = new Date(input.value)
    try {
        let formattedDate = new SmartFormat(date).smartDate()
        h1.innerHTML = formattedDate
        h2.innerHTML = "😄"
    } catch (error) {
        console.log(error)
        h1.innerHTML = "input a valid date"
        h2.innerHTML = "😟"
    }

}

