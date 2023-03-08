let sliderButtons: NodeListOf<Element>
let sliderImages: NodeListOf<Element>
let firstImage = document.getElementById("img1") as HTMLElement

let autoPlay: boolean = true
let counter: number = 1

window.onload = function() {
    sliderButtons = document.querySelectorAll('.slider-btn')
    sliderImages = document.querySelectorAll('.slider-img')
    startSlider()
}

function startSlider() {
    console.log(1)

    firstImage.classList.remove("invisible")

    sliderButtons.forEach((button: Element, index: number) => {
        button.addEventListener("click", displayImg)
        button.setAttribute("id", index.toString())
        console.log("Lala")
    })

    console.log(2)
}

function displayImg(e: Event) {
    autoPlay = false
    let clickedButton = e.target
    console.log(4)
    let buttonId: string = "btn" + clickedButton.id.toString()

    sliderImages.forEach(img => {
        img.classList.add("invisible")
        
    })
}
