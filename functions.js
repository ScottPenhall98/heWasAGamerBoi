// convert USD to NZD
//nzd = 1.53 us atm

//name, price, platform

//make a graph that displays all data by a given platform

//remove pal
var myData = data

var allConsoles = []

function getAllConsoles(){
    for (var i = 0; i < data.length; i ++){
        var currentConsole = myData[i]["console-name"]
        addConsoleIfNoExist(currentConsole)
    }
    console.log(allConsoles)
}

function addConsoleIfNoExist(pointerConsole){
    if (allConsoles.length === 0){
        allConsoles.push(pointerConsole)
    }else{
        for (var i = 0; i < allConsoles.length; i++) {
            if (allConsoles[i] === pointerConsole) {
                break
            } else if (i === allConsoles.length - 1) {
                allConsoles.push(pointerConsole)
            }
        }    
    }
}