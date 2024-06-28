import { getCustomProperty, incrementCustomProperty,setCustomProperty } from "./updateProperty.js"

const groundElems=document.querySelectorAll("[data-ground]")
const speed=0.05
export function infinteground(){
    setCustomProperty(groundElems[0],"--left",0)
    // these 2 increases the size of grd by 600..1st ground ends at 300 and 2dn groundelem starts at 300
    setCustomProperty(groundElems[1],"--left",300)
}
export function updateGround(diff,speedincrease){
        groundElems.forEach(ground => {
            incrementCustomProperty(ground,"--left",diff*speedincrease*speed*-1)
            // we are mul by diff ->bcz we need to scale the increment on the basis of worldscale and -1->to move backwords

            // infinite ground looping-->on grd adding 1st elem grd at the end of 2nd elem grd when 1st elem reaches -300
            if(getCustomProperty(ground,"--left")<=-300){
                incrementCustomProperty(ground,"--left",600)
            }
        });
}