// let sliderButtons: NodeListOf<HTMLInputElement>
// let sliderImages: NodeListOf<Element>

// let numberOfImages: number = 4
// let autoPlay: boolean = true
// let counter: number = 0

// window.onload = function() {
//     sliderButtons = document.querySelectorAll('.slider-btn')
//     sliderImages = document.querySelectorAll('.slider-img')
//     startSlider()
// }

// function startSlider() {
//     sliderImages[counter].classList.remove("invisible")
//     sliderButtons[counter].checked = true

//     autoSlider()

//     sliderButtons.forEach((button: Element, index: number) => {
//         button.addEventListener("click", displayImgListener)
//         button.setAttribute("id", index.toString())
//     })
// }

// function displayImg(index: number) {
//     sliderImages.forEach(img => {
//         img.classList.add("invisible")
//     })
//     sliderImages[index].classList.remove("invisible")
//     sliderButtons[index].checked = true
// }

// function autoSlider() {
//     setInterval(function() {
//         if(autoPlay) {
//             counter = (counter + 1) % numberOfImages
//             displayImg(counter)
//         }
//     }, 4000)
// }

// function displayImgListener(e: Event) {
//     autoPlay = false
//     let clickedButton = e.target as HTMLElement
//     displayImg(Number(clickedButton.id))
// }
