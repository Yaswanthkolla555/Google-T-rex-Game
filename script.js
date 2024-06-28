import { infinteground, updateGround } from "./ground.js"
import {updateDino,setupDino,getDinoBox,setDinoDead} from "./dino.js"
import { updateCactus,setupCactus,getCactusbox } from "./cactus.js"
const world_width=100
const world_height=40
const speed_increment=.000005
const worldData=document.querySelector("[data-world]")
const ScoreElem=document.querySelector("[data-score]")
const textDisappearElem=document.querySelector("[data-text-disappear]")


setScaleToWorldScale()
window.addEventListener("resize",setScaleToWorldScale)
document.addEventListener("keydown",gamestart,{once:true})


// looping 
var prevTime
var speedincrease
var score
function update(currTime){
    if(prevTime==null){
        prevTime=currTime
        window.requestAnimationFrame(update)
        return 
    }
    var diff=currTime-prevTime;
    // callingthe function from ground js -->using module type
    updateGround(diff,speedincrease)
    updateDino(diff,speedincrease)
    updateCactus(diff,speedincrease)
    updateSpeedIncrease(diff)
    updateScore(diff)
    // if checklost is true game over 
    if(checkLost())return gameLost()
    prevTime=currTime
    window.requestAnimationFrame(update)
}
function updateSpeedIncrease(diff){
    speedincrease+=diff*speed_increment
}
function updateScore(diff){
    score+=diff*0.01 
    ScoreElem.textContent=Math.floor(score)
}
function gamestart(){
    prevTime=null
    speedincrease=1
    score=0
    textDisappearElem.classList.add("hide");
    // we can also write->tetxdisapperelem.classList.add("hide")
    setupDino()
    setupCactus()
    infinteground()

    window.requestAnimationFrame(update)
}


// For responsiveness ->
function setScaleToWorldScale(){
   let tempsize;
    if(window.innerWidth/window.innerHeight<world_width/world_height){
            tempsize=window.innerWidth/ world_width
    }
    else{
        tempsize=window.innerHeight/world_height
    }
    worldData.style.width=`${world_width*tempsize}px`
    worldData.style.height=`${world_height*tempsize}px`
}

// Game losing logic
function checkLost(){
    const dinoBox=getDinoBox()
    return getCactusbox().some(eachbox=>isCollised(eachbox,dinoBox))
}
function isCollised(cactusbox,dinoBox){
    return (cactusbox.left<dinoBox.right && cactusbox.right>dinoBox.left && cactusbox.top<dinoBox.bottom && cactusbox.bottom>dinoBox.top)
}

function gameLost(){
    setDinoDead()
    setTimeout(()=>{
        document.addEventListener("keydown",gamestart,{once:true})
        textDisappearElem.classList.remove("hide");
    },100)
}