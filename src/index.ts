let sliderButtons: NodeListOf<Element>
let sliderImages: NodeListOf<Element>
let firstImage: HTMLElement

let autoPlay: boolean = true
let counter: number = 1

window.onload = function() {
    
    sliderButtons = document.querySelectorAll('.slider-btn')
    sliderImages = document.querySelectorAll('.slider-img')
    startSlider()
}

function startSlider() {
    console.log(1)
    firstImage = document.querySelector(".slider-img") as HTMLElement
    firstImage.classList.remove("invisible")

    sliderButtons.forEach((button: Element, index: number) => {
        button.addEventListener("click", displayImgListener)
        button.setAttribute("id", index.toString())
        console.log("Lala")
    })

    console.log(2)
}

function displayImg(index: number) {
    sliderImages.forEach(img => {
        img.classList.add("invisible")
    })
    sliderImages[index].classList.remove("invisible")
}

function displayImgListener(e: Event) {
    autoPlay = false
    let clickedButton = e.target as HTMLElement
    displayImg(Number(clickedButton.id))
}
