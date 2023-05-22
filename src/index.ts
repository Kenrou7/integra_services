import { buscarCoincidencias } from "./util/searchUtil"
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
    const searchInput: HTMLInputElement = document.getElementById("buscador_palabra") as HTMLInputElement;
    let resultados_busqueda: HTMLElement = document.getElementById("resultados_busqueda") as HTMLElement;
    let resultados_listado: HTMLElement = document.getElementById("resultados_listado") as HTMLElement;
    const listado: HTMLElement[] = Array.from(document.querySelectorAll('li')) as HTMLElement[];
    //resultados_listado.appendChild(listado)
    
    function consultarInput(e:any){
        let palabraBuscada = e.target?.value
        palabraBuscada =="" 
            ? resultados_busqueda.style.zIndex="1" 
            : resultados_busqueda.style.zIndex="0"
    }

    searchInput.oninput= function(e:any){
        let palabraBuscada = e.target?.value
        //console.log(palabraBuscada)
        consultarInput(palabraBuscada)
        let coincidencias:string[]=buscarCoincidencias(palabraBuscada)
        borrarListado()
        coincidencias.forEach((item)=>{
            if(!coincidencias.includes(item)){
    		    coincidencias.push(item);
    	    }
            borrarListado()
            for (let i = 0; i < coincidencias.length; i++) {
                resultados_listado.innerHTML+= `<li class="resultado_item">${coincidencias[i]}</li>`;
            }
            //console.log(coincidencias);
        })

        console.log(coincidencias)
    }
    function borrarListado(){
        if (resultados_listado.hasChildNodes()){
            while(resultados_listado.childNodes.length >= 1){
                resultados_listado.removeChild(resultados_listado.firstChild)
            }
        }
    } 
    consultarInput(e)
}


function startSlider() {
    imagesDisplay = document.querySelector(".images-display") as HTMLElement
    imagesDisplayInnerHtml = imagesDisplay.innerHTML

    buttonDisplay = document.querySelector(".carrousel-dots") as HTMLElement
    buttonDisplayInnerHtml = buttonDisplay.innerHTML

    for(let i = 1; i <= numberOfImages; i++) {
        console.log(i)
        imagesDisplayInnerHtml += `<li>
                                        <a href="*" class="invisible slider-img"><img src="./${i}.png"/></a>
                                  </li>`

        buttonDisplayInnerHtml += `<input type="radio" class="slider-btn" name="slider">`
    }

    imagesDisplay.innerHTML = imagesDisplayInnerHtml
    buttonDisplay.innerHTML = buttonDisplayInnerHtml

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
