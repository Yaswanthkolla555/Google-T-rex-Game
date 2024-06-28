import { incrementCustomProperty,getCustomProperty,setCustomProperty } from "./updateProperty.js"

const dinoElem=document.querySelector("[data-dino]")
const jumpSpeed=0.30
const gravity=.001



let isJumping
let yVelocity
export function setupDino(){
    dinoElem.src="dino-stationary.png"
    isJumping=false
    setCustomProperty(dinoElem,"--bottom",0)
    document.removeEventListener("keydown",onJump)
    document.addEventListener("keydown",onJump)

}
export function updateDino(diff,speedincrease){
handleJump(diff)
}
function handleJump(diff){
if(!isJumping) return 

incrementCustomProperty(dinoElem,"--bottom",yVelocity*diff)
if(getCustomProperty(dinoElem,"--bottom")<=0)
{
    setCustomProperty(dinoElem,"--bottom",0)
    isJumping=false
}

yVelocity-=gravity*diff
}

function onJump(key){
    if(key.code !== 'Space' || isJumping )return 
    yVelocity=jumpSpeed
    isJumping=true
}
export function getDinoBox(){
    return dinoElem.getBoundingClientRect()
}
export function setDinoDead(){
    dinoElem.src="dino-lose.png"
}