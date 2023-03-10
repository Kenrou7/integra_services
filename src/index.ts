let numberOfImages: number = 4

let imagesDisplay: HTMLElement
let imagesDisplayInnerHtml: string

let buttonDisplay: HTMLElement
let buttonDisplayInnerHtml: string

let sliderButtons: NodeListOf<HTMLInputElement>
let sliderImages: NodeListOf<Element>

let autoPlay: boolean = true
let counter: number = 0

window.onload = function() {
    startSlider()
}

function startSlider() {
    imagesDisplay = document.querySelector(".images-display") as HTMLElement
    imagesDisplayInnerHtml = imagesDisplay.innerHTML

    buttonDisplay = document.querySelector(".carrousel-dots") as HTMLElement
    buttonDisplayInnerHtml = buttonDisplay.innerHTML

    for(let i = 1; i <= numberOfImages; i++) {
        console.log(i)
        imagesDisplayInnerHtml += `<li>
                                        <a href="*" class="invisible slider-img"><img src="./assets/img/home_banner_${i}.png"/></a>
                                  </li>`

        
    }
    sliderButtons = document.querySelectorAll('.slider-btn')
    sliderImages = document.querySelectorAll('.slider-img')
    sliderImages[counter].classList.remove("invisible")
    sliderButtons[counter].checked = true

    autoSlider()

    sliderButtons.forEach((button: Element, index: number) => {
        button.addEventListener("click", displayImgListener)
        button.setAttribute("id", index.toString())
    })
}

function displayImg(index: number) {
    sliderImages.forEach(img => {
        img.classList.add("invisible")
    })
    sliderImages[index].classList.remove("invisible")
    sliderButtons[index].checked = true
}

function autoSlider() {
    setInterval(function() {
        if(autoPlay) {
            counter = (counter + 1) % numberOfImages
            displayImg(counter)
        }
    }, 4000)
}

function displayImgListener(e: Event) {
    autoPlay = false
    let clickedButton = e.target as HTMLElement
    displayImg(Number(clickedButton.id))
}
