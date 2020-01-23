const signupButton = document.querySelector('.sign-up')
const loginButton = document.querySelector('.login')
const signupForm = document.querySelector('.signup-form')
const loginForm = document.querySelector('.login-form')
const regionDropdown = document.querySelector('.region-dropdown')
const navbar = document.querySelector('nav')
const fishGif = document.querySelector('.fish-gif')
const flippedFish = document.querySelector('.flipped-fish-gif')
const doryButton = document.querySelector('.gif-button')
const userInfo = document.querySelector('.user-info')
const userfishList = document.querySelector('.user-fish-list')
const regionalSeafood = document.querySelector('.regional-seafood')
const newRegion = document.querySelector('.new-region')
const updateRegion = document.querySelector('.update-region')

const seafoodContainer = document.querySelector('.fish-list')
const speciesForm = document.querySelector('.fish-form')
const speciesInput = document.querySelector('.fish-input')
const wildButton = document.querySelector('.wild')
const farmedButton = document.querySelector('.farmed')
const clearButton = document.querySelector('.clear')
const wildFarmedContainer = document.querySelector('.wild-farmed-container')

const modal = document.querySelector('.modal')
const doryModal = document.querySelector('.dory-modal')
const trigger = document.querySelector('.info-button')
const closeButton = document.querySelector('.close-button')
const doryCloseButton = document.querySelector('.dory-close-button')

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

window.addEventListener('DOMContentLoaded', (event)=>{
fetch('http://localhost:3000/fish')
    .then(response=>response.json())
    .then(fishes=>fishes.sort(aToZ).map(fishNames))


function aToZ(a, b){
    if (a.name < b.name){return -1}
    else if (a.name > b.name){return 1}
    else {return 0}
}

function toggleFishGif(){
    addMovement()
    setTimeout(removeMovement, 10000)
    setTimeout(addFlippedMovement, 10000)
    setTimeout(addMovement, 20000)
    setTimeout(removeFlippedMovement, 20000)
    setTimeout(addFlippedMovement, 30000)
    setTimeout(removeMovement, 30000)
    setTimeout(removeFlippedMovement, 40000)
    setTimeout(toggleFishGif, 40000)
}

function addMovement(){
    fishGif.classList.add('righthorizTranslate')
}

function removeMovement(){
    fishGif.classList.remove('righthorizTranslate')
}

function addFlippedMovement(){
    flippedFish.classList.add('lefthorizTranslate')
}

function removeFlippedMovement(){
    flippedFish.classList.remove('lefthorizTranslate')
}

toggleFishGif()

function logSomething(){
    console.log("hi")
}


wildButton.innerText = "Wild"
farmedButton.innerText = "Farmed"
clearButton.innerText = "Clear Results"

function fishNames(fish){
    const fishName = document.createElement('li')
    const infoButton = document.createElement('button')
    const addFish = document.createElement('button')

    fishName.innerText = `${fish.name} `
    fishName.className = "fish-name"
    infoButton.className = "info-button"
    addFish.className = "add-fish"
    fishName.id = `${fish.region}`

    regionFish(fish)

    addFish.addEventListener('click', (event)=>{
        fetch('http://localhost:3000/user_fishes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({user_id: localStorage.getItem('user'), fish_id: fish.id})
        })
        .then(response=>response.json())
        displayUserFish(fish)
    })

    infoButton.addEventListener('click', event => {
        displayFishInfo(fish)
    })

    wildButton.addEventListener('click', (event) => {
        showWildFish(fish)
    })

    farmedButton.addEventListener('click', (event) => {
        showFarmedFish(fish)
    })

    closeButton.addEventListener('click', toggleModal)

    fishName.appendChild(infoButton)
    if (localStorage.token){
        fishName.appendChild(addFish)
    }
    seafoodContainer.appendChild(fishName)
}


speciesForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(speciesForm)
    speciesInput.value = ""
    const fishArray = Array.prototype.slice.call(document.querySelectorAll('.fish-name'))
    fishArray.forEach(fish=>{
        if (fish.innerText.toLowerCase().includes((formData.get('species')).toLowerCase())){
            fish.style.display = ""
        } else {
            fish.style.display = "none"
        }
    })
})

function showWildFish(fish){
    const wildFish = document.createElement('li')
    if (fish.harvest_type === "Wild") {
        wildFish.innerText = fish.name
        wildFish.className = "wild-fish"
    }
    wildFarmedContainer.appendChild(wildFish)
}

function showFarmedFish(fish){
    const farmedFish = document.createElement('li')
    if (fish.harvest_type === "Farmed") {
        farmedFish.innerText = fish.name
        farmedFish.className = "farmed-fish"
    }
    wildFarmedContainer.appendChild(farmedFish)
}

clearButton.addEventListener('click', (event) => {
    wildFarmedContainer.innerHTML = ''
})

signupButton.addEventListener('click', (event)=> {
    toggleSignUp()
})

loginButton.addEventListener('click', (event)=>{
    toggleLogin()
})

function displayFishInfo(fish){
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
}

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

fishGif.addEventListener('click', (event)=>{
    toggleDoryModal()
})

flippedFish.addEventListener('click', (event)=>{
    toggleDoryModal()
})

doryCloseButton.addEventListener('click', (event)=>{
    toggleDoryModal()
})

function toggleDoryModal(){
    doryModal.classList.toggle('show-dory-modal')
}

function windowOnClick(event){
    if (event.target === modal){
        toggleModal();
    }
}

map.addEventListener('load', ()=>{
    const mapDocument = map.contentDocument
    const state = mapDocument.querySelector('.state')
    const stateArray = Array.prototype.slice.call(state.querySelectorAll('g'))
    stateArray.map(region=>{
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
    const newregionOption = document.createElement('option')
    regionOption.innerText = region.name
    regionOption.value = region.id
    newregionOption.innerText = region.name
    newregionOption.value = region.id

    newRegion.appendChild(newregionOption)
    regionDropdown.appendChild(regionOption)
}

signupForm.addEventListener('submit', (event) =>{
    event.preventDefault()

    const signupFormData = new FormData(signupForm)
    const username = signupFormData.get('username')
    const password = signupFormData.get('password')
    const region_id = signupFormData.get('region')

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user:{username, password, region_id}})
    })
    .then(refreshPage)
})

function refreshPage(){
    window.location.replace('http://localhost:3001')
}

loginForm.addEventListener('submit', (event)=>{
    event.preventDefault()

    const loginFormData = new FormData(loginForm)
    const username = loginFormData.get('username')
    const password = loginFormData.get('password')

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    })
    .then(response=>response.json())
    .then((result) => {
        return result.error ? alert(result.error) : (localStorage.setItem('token', result.token), localStorage.setItem('user', result.user.id), localStorage.setItem('region', result.user.region_id))
    })
    .then(refreshPage)
})

if(localStorage.token){
    const logoutButton = document.createElement('button')
    logoutButton.innerText = "Logout"
    logoutButton.className = "logout-button"
    logoutButton.addEventListener('click', (event)=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('region')
        refreshPage()
    })
    loginForm.classList.add('invisible-login')
    signupButton.classList.add('invisible')
    loginButton.classList.add('invisible')
    userInfo.classList.remove('invisible-info')
    navbar.appendChild(logoutButton)



fetch(`http://localhost:3000/users/${localStorage.getItem('user')}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`
    }
})
    .then(response=>response.json())
    .then(user=>user.fishes.sort(aToZ).map(displayUserFish))

function displayUserFish(fish){
    const userfishLi = document.createElement('li')
    const ufInfoButton = document.createElement('button')
    const deleteFish = document.createElement('button')
    userfishLi.innerText = `${fish.name} `
    ufInfoButton.className = "info-button"
    deleteFish.className = "delete-fish"

    ufInfoButton.addEventListener('click', (event) => {
        displayFishInfo(fish)
    })

    deleteFish.addEventListener('click', (event)=>{
        event.target.parentNode.remove()
        findUserFish(fish)
    })

    userfishLi.append(ufInfoButton, deleteFish)
    userfishList.appendChild(userfishLi)
}

function findUserFish(fish){
    fetch('http://localhost:3000/user_fishes')
        .then(response=>response.json())
        .then(userfishes=>userfishes.find(userfish =>{
            if (userfish.fish_id == fish.id && userfish.user_id == localStorage.getItem('user')){
                deleteUserFish(userfish.id)
            }
        }))
}

function deleteUserFish(ufid){
    fetch(`http://localhost:3000/user_fishes/${ufid}`, {
        method: 'DELETE',
        headers: {
            'authorization': `bearer ${localStorage.getItem('token')}`
        }
    })
}

updateRegion.addEventListener('submit', (event)=>{
    event.preventDefault()

    const newRegionFormData = new FormData(updateRegion)
    const newRegionman = newRegionFormData.get('region')
    console.log(newRegionman)

    fetch(`http://localhost:3000/users/${localStorage.getItem('user')}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({user:{region_id: newRegionFormData.get('region')}})
    })
    .then(localStorage.setItem('region', newRegionman))
    .then(refreshPage)
})

}

function regionFish(fish){
    fetch('http://localhost:3000/regions')
        .then(response=>response.json())
        .then(regions=>regions.find(region=>{
            if (region.id == localStorage.getItem('region')){
                if (fish.region.includes(`${region.name}`)){
                    const regionalfishLi = document.createElement('li')
                    regionalfishLi.innerText = fish.name
                    regionalSeafood.appendChild(regionalfishLi)
                }
            }
        })
    )
}

})