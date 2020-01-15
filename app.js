const signupButton = document.querySelector('.sign-up')
const loginButton = document.querySelector('.login')
const signupForm = document.querySelector('.signup-form')
const loginForm = document.querySelector('.login-form')
const regionDropdown = document.querySelector('.region-dropdown')

const seafoodContainer = document.querySelector('.fish-list')
const speciesForm = document.querySelector('.fish-form')
const speciesInput = document.querySelector('.fish-input')

const modal = document.querySelector('.modal')
const trigger = document.querySelector('.info-button')
const closeButton = document.querySelector('.close-button')

const map = document.querySelector('#svg')

const fishData = document.querySelector('.fish-data')
const fishImage = document.querySelector('.fish-image')
const fishInfo = document.querySelector('.info')
const scientificName = document.querySelector('.scientific-name')
const fishLocation = document.querySelector('.location')
const biology = document.querySelector('.biology')
const population = document.querySelector('.population')
const bestHarvest = document.querySelector('.best-harvest')
const fishingRate = document.querySelector('.fishing-rate')
const availability = document.querySelector('.availability')
const healthBenefits = document.querySelector('.health-benefits')


fetch('http://localhost:3000/fish')
    .then(response=>response.json())
    .then(fishes=>fishes.sort(aToZ).map(fishNames))


function aToZ(a, b){
    if (a.name < b.name){return -1}
    else if (a.name > b.name){return 1}
    else {return 0}
}

function fishNames(fish){
    const fishName = document.createElement('li')
    const infoButton = document.createElement('button')

    fishName.innerText = `${fish.name} `
    fishName.className = "fish-name"
    infoButton.className = "info-button"
    fishName.id = `${fish.region}`

    infoButton.addEventListener('click', event => {
        fishImage.src = fish.image
        scientificName.innerText = fish.scientific_name
        fishLocation.innerHTML = fish.location
        biology.innerHTML = fish.biology
        population.innerText = fish.population
        bestHarvest.innerText = fish.best_harvest
        fishingRate.innerText = fish.fishing_rate
        availability.innerHTML = fish.availability
        healthBenefits.innerHTML = fish.health_benefits
        modal.classList.toggle('show-modal')
    })
    closeButton.addEventListener('click', toggleModal)
    // window.addEventListener('click', windowOnClick)

    fishName.appendChild(infoButton)
    seafoodContainer.appendChild(fishName)
}


speciesForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(speciesForm)
    const fishArray = Array.prototype.slice.call(document.querySelectorAll('.fish-name'))
    fishArray.forEach(fish=>{
        if (fish.innerText.toLowerCase().includes((formData.get('species')).toLowerCase())){
            fish.style.display = ""
        } else {
            fish.style.display = "none"
        }
    })
})

signupButton.addEventListener('click', (event)=> {
    toggleSignUp()
})

loginButton.addEventListener('click', (event)=>{
    toggleLogin()
})

function toggleSignUp(){
    signupButton.classList.add('invisible')
    loginButton.classList.add('invisible')
    signupForm.classList.remove('invisible-signup')
}

function toggleLogin(){
    signupButton.classList.add('invisible')
    loginButton.classList.add('invisible')
    loginForm.classList.remove('invisible-login')
}


function toggleModal(){
    modal.classList.toggle('show-modal')
}

function windowOnClick(event){
    if (event.target === modal){
        toggleModal();
    }
}

map.addEventListener('load', ()=>{
    const mapDocument = map.contentDocument
    const state = mapDocument.querySelector('.state')
    const gArray = Array.prototype.slice.call(state.querySelectorAll('g'))
    gArray.map(region=>{
        region.addEventListener('mouseenter', (event)=>{
            event.target.style.fill = "purple"
        })
        region.addEventListener('mouseleave', (event)=>{
            event.target.style.fill = ""
        })
        region.addEventListener('click', ()=>{
            const fishArray = Array.prototype.slice.call(document.querySelectorAll('.fish-name'))
            fishArray.map(fish=>{
                if (region.className.baseVal == "alaska"){
                    if (fish.id.includes("Alaska")){
                        fish.style.display = ""
                    } else {
                        fish.style.display = "none"
                    } 
                } else if (region.className.baseVal == "hawaii"){
                    if (fish.id.includes("Pacific Islands")){
                        fish.style.display = ""
                    } else {
                        fish.style.display = "none"
                    } 
                } else if (region.className.baseVal == "atlantic"){
                    if (fish.id.includes("Greater Atlantic")){
                        fish.style.display = ""
                    } else {
                        fish.style.display = "none"
                    } 
                } else if (region.className.baseVal == "west"){
                    if (fish.id.includes("West Coast")){
                        fish.style.display = ""
                    } else {
                        fish.style.display = "none"
                    } 
                } else if (region.className.baseVal == "southeast"){
                    if (fish.id.includes("Southeast")){
                        fish.style.display = ""
                    } else {
                        fish.style.display = "none"
                    } 
                }
            })
        })
    })
})

fetch('http://localhost:3000/regions')
    .then(response=>response.json())
    .then(regions=>regions.sort(aToZ).map(regionNames))

function regionNames(region){
    const regionOption = document.createElement('option')
    regionOption.innerText = region.name 

    regionDropdown.appendChild(regionOption)
}