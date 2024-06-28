import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateProperty.js"

const speed =0.05
const cactus_interval_min=500
const cactus_interval_max=1500
const worldData=document.querySelector("[data-world]")
var nextCactusTime
export function setupCactus(){
nextCactusTime=cactus_interval_min
document.querySelectorAll("[data-cactus]").forEach(cactus =>{
    cactus.remove()
})

}
export function updateCactus(diff,speedincrease){
document.querySelectorAll("[data-cactus]").forEach(cactus=>{
    incrementCustomProperty(cactus,"--left",diff*speedincrease*speed*-1)
    if(getCustomProperty(cactus,"--left")<=-10){
        cactus.remove();
    }
})
    if(nextCactusTime<=0){
        createNewCactus()
        nextCactusTime=randomNumberBetween(cactus_interval_min,cactus_interval_max)
        nextCactusTime/=speedincrease
    }
    nextCactusTime-=diff
}
function createNewCactus(){
    const cactus=document.createElement("img")
    cactus.dataset.cactus=true
    cactus.src="/cactus.png"
    cactus.classList.add("cactus")
    setCustomProperty(cactus,"--left",100)
    worldData.append(cactus)
}

function randomNumberBetween(mn,mx){
    return Math.floor(Math.random()*(mx-mn+1)+mn)
}
// to get rectangle ->of a img
export function getCactusbox(){
return [...document.querySelectorAll("[data-cactus]")].map(cactus=>{
    return cactus.getBoundingClientRect()
})
}