// convert USD to NZD
//nzd = 1.53 us atm

//name, price, platform

//make a graph that displays all data by a given platform

//remove pal
const MyData = data
let displayObject = {}
let allConsoles = []
const CanvasWidth = 1740
const CanvasHeight = 800

function getAllConsoles(){
    for (let i = 0; i < data.length; i ++){
        let currentConsole = MyData[i]["console-name"]
        splitArray = currentConsole.split("PAL ")
        if(splitArray.length > 1){
            addConsoleIfNoExist(splitArray[1],MyData[i])    
        }else{
            addConsoleIfNoExist(splitArray[0], MyData[i])    
        }   
    }
    displayGames()
}

function addConsoleIfNoExist(pointerConsole, currentGame){
    if (allConsoles.length === 0){
        allConsoles.push(pointerConsole)
        displayObject[pointerConsole] = currentGame["price-in-pennies"]
    }else{
        for (let i = 0; i < allConsoles.length; i++) {
            if (allConsoles[i] === pointerConsole) {
                //get current price add to it then set the new price
                currentPrice = displayObject[pointerConsole]
                newPrice = currentGame["price-in-pennies"] + currentPrice
                displayObject[pointerConsole] = newPrice
                break
            } else if (i === allConsoles.length - 1) {
                //it doesnt exist yet
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
    let canvas = document.createElement("canvas")
    attributes = {
        id: ["myCanvas"],
        width: [(CanvasWidth + "px")],
        height: [(CanvasHeight + "px")],
        style: ["border:2px solid #000000"]
    }
    canvas = setElementAttribute(canvas, attributes)
    addTextToCanvas(canvas, totalCost)
    addGraph(canvas,totalCost)
    document.body.appendChild(canvas)
}

function addGraph(canvas, totalCost){
    let widthOfGraphCanvas = 1400
    let heightOfGraphCanvas = 700
    let widthBetweenBars = 10
    let widthOffset = 200
    let ctx = canvas.getContext("2d");
    ctx.beginPath()
    ctx.lineWidth = "2";
    ctx.strokeStyle = "black";
    ctx.rect(widthOffset, 0, widthOfGraphCanvas + widthBetweenBars, heightOfGraphCanvas)
    ctx.stroke()
    //get the width of the canvas and split it up by the length of allConsoles
    addBars(heightOfGraphCanvas,widthOfGraphCanvas,widthBetweenBars,totalCost,ctx)
    
}

function addBars(heightOfGraphCanvas,widthOfGraphCanvas, widthBetweenBars, totalCost, ctx){
    let widthOfBars = widthOfGraphCanvas / allConsoles.length
    let startLeft = 140
    let startHeight = 650
    let heightIncrement = 10
    let highestPercentage = {
        consoleName : allConsoles[0],
        percentage: displayObject[allConsoles[0]] / (totalCost / 100)
    }
    let allPercentages = []
    for (let i = 0; i < allConsoles.length; i++) {
        let percentage = displayObject[allConsoles[i]] / (totalCost / 100)
        allPercentages[allConsoles[i]] = percentage
        if(percentage > highestPercentage.percentage){
            highestPercentage = {
                consoleName : allConsoles[i],
                percentage : percentage
            }
        }
    }
    //the biggest graph has to have 25 BELLOW the top bar
    let percentageHeightOfGraph = highestPercentage.percentage + (highestPercentage.percentage / 4)
    for(let i = 0; i < allConsoles.length; i++){
        //percentage = price from console / 1 percent of total cost (1 percent = total cost/100)
        let percentage = allPercentages[allConsoles[i]]
        //grab one percent of what the scale we use
        //scaler is to scale on the highest value as it might not be close to 100
        let scaler = heightOfGraphCanvas / percentageHeightOfGraph
        let heightOfBar = percentage * scaler
        ctx.beginPath()
        if (allConsoles[i] === "Nintendo Switch"){
            // checkIfItIsHighest. at this time it is the highest value in the data 
            ctx.fillStyle = "Blue";
        }else{
            ctx.fillStyle = "Red";
        }
        ctx.fillRect(startLeft + widthOfBars, heightOfGraphCanvas - heightOfBar, widthOfBars - widthBetweenBars, heightOfBar)
        startLeft += widthOfBars
        startHeight += heightIncrement
        ctx.stroke()
    }
}

function addTextToCanvas(canvas, totalCost){
    let ctx = canvas.getContext("2d");
    ctx.font = "20px Arial";
    ctx.fillText(("$" + totalCost), 10, 790);
    ctx.beginPath()
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
        for (let i = 0; i < attributes[key].length; i++) {
            element.setAttribute(key, attributes[key][i])
        }
    };
    return element
}