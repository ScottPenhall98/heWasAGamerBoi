// convert USD to NZD
//nzd = 1.53 us atm

//name, price, platform

//make a graph that displays all data by a given platform

//remove pal
var myData = data
var displayObject = {}
var allConsoles = []
var canvasWidth = 1600
var canvasHeight = 800

function getAllConsoles(){
    for (var i = 0; i < data.length; i ++){
        var currentConsole = myData[i]["console-name"]
        splitArray = currentConsole.split("PAL ")
        if(splitArray.length > 1){
            addConsoleIfNoExist(splitArray[1],myData[i])    
        }else{
            addConsoleIfNoExist(splitArray[0], myData[i])    
        }   
    }
    displayGames()
}

function addConsoleIfNoExist(pointerConsole, currentGame){
    if (allConsoles.length === 0){
        allConsoles.push(pointerConsole)
        displayObject[pointerConsole] = currentGame["price-in-pennies"]
    }else{
        for (var i = 0; i < allConsoles.length; i++) {
            if (allConsoles[i] === pointerConsole) {
                //get current price add to it then set the new price
                currentPrice = displayObject[pointerConsole]
                newPrice = currentGame["price-in-pennies"] + currentPrice
                displayObject[pointerConsole] = newPrice
                break
            } else if (i === allConsoles.length - 1) {
                allConsoles.push(pointerConsole)
                displayObject[pointerConsole] = currentGame["price-in-pennies"]
            }
        }    
    }
}

function displayGames(){
    //first of all set the right prices
    totalCost = changePricesToDollars()
    //then make a canvas
    var canvas = document.createElement("canvas")
    attributes = {
        id: ["myCanvas"],
        width: [(canvasWidth + "px")],
        height: [(canvasHeight + "px")],
        style: ["border:2px solid #000000"]
    }
    canvas = setElementAttribute(canvas, attributes)
    addTextToCanvas(canvas, totalCost)
    addGraph(canvas)
    document.body.appendChild(canvas)
}

function addGraph(canvas, totalCost){
    var widthOfGraphCanvas = 1400
    var heightOfGraphCanvas = 700
    var widthOffset = 200
    var ctx = canvas.getContext("2d");
    ctx.beginPath()
    ctx.lineWidth = "2";
    ctx.strokeStyle = "Black";
    ctx.rect(widthOffset, 0, widthOfGraphCanvas, heightOfGraphCanvas)
    ctx.stroke()
}

function addTextToCanvas(canvas, totalCost){
    var ctx = canvas.getContext("2d");
    ctx.font = "20px Arial";
    ctx.fillText(("$" + totalCost), 10, 790);
    ctx.beginPath()
    ctx.lineWidth = "2";
    ctx.strokeStyle = "Black";
    ctx.rect(200, 0, 1400, 700)
    ctx.stroke()
}

function changePricesToDollars(){
    totalCost = 0
    for(gameConsole in displayObject){
        currentPrice = displayObject[gameConsole]
        usdPrice = currentPrice / 100
        nzd = getNZD()
        finalCost = usdPrice * nzd
        totalCost = totalCost + finalCost
        displayObject[gameConsole] = finalCost
    }
    return totalCost
}

function getNZD(){
    //eventually call an API
    return 1.53
}

function setElementAttribute(element, attributes) {
    for (key in attributes) {
        for (var i = 0; i < attributes[key].length; i++) {
            element.setAttribute(key, attributes[key][i])
        }
    };
    return element
}