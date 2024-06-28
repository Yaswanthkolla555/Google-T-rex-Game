export function getCustomProperty(element,property){
        return parseFloat(getComputedStyle(element).getPropertyValue(property)) || 0
       
}
export function setCustomProperty(element,property,value){
        // changing theprevous css value..
        element.style.setProperty(property,value)
}
export function incrementCustomProperty(element,property,increment){
    // this function is already written above
    setCustomProperty(element,property,getCustomProperty(element,property)+increment)
}