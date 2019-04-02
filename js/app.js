/**ZOMBIE DICE RULES 
13 Custom Dice
Win Condition: First to 13 brains wins.
You take 3 random dice from the box and roll them.

A brain is worth 1 point at the end of the round.
Footsteps allow you to reroll that dice.
If you collect 3 shotgun blasts, you lose all the points for that round.

After rolling 3 dice, you can choose to hold and save the points, or
keep pushing and roll 3 more dice.
**/

var activePlayer, scores, allDice, greenDice, yellowDice, redDice, usedDice;

//GREEN DICE = TOTAL 6 = INDEX: 0-5
//YELLOW DICE = TOTAL 4 = INDEX: 6-9
//RED DICE = TOTAL 3 = INDEX: 10-12
allDice = ["green-dice", "green-dice", "green-dice", "green-dice", "green-dice", "green-dice", "yellow-dice", "yellow-dice", "yellow-dice", "yellow-dice", "red-dice", "red-dice", "red-dice"];

greenDice = ["green-brain", "green-brain", "green-brain", "green-walk", "green-walk", "green-bullet"];

yellowDice = ["yellow-brain", "yellow-brain", "yellow-walk", "yellow-walk", "yellow-bullet", "yellow-bullet"];

redDice = ["red-brain", "red-walk", "red-walk", "red-bullet", "red-bullet", "red-bullet"];

usedDice = [];

usedColorDice = [];

init();

//When clicked, go to next player
document.querySelector(".zd-player-actions").addEventListener("click",function(){
    nextPlayer();
});

function init(){
    scores = [0,0,0,0];
    activePlayer = 0;

    gamePlaying = true;

    document.querySelector(".player-card-" + activePlayer).classList.add("player_active_border");
}

function chooseDice(){
    var chosenThree = [];
    for(var i = 0; i < 3; i++){
        chosenThree.push(Math.floor(Math.random() * 13));
    }
    allDice.splice(i, 1);
}

function rollAllDice(){
    
}

function nextPlayer(){
    document.querySelector(".player-card-" + activePlayer).classList.remove("player_active_border");

    activePlayer == 3 ? activePlayer = 0 : activePlayer += 1;
    document.querySelector(".player-card-" + activePlayer).classList.add("player_active_border");

    document.querySelector(".cpd_text").innerHTML = "PLAYER<br>" + (activePlayer + 1);
}

//RECHECK WHY THIS WONT WORK (FIRST FOR LOOP)
//THIS WONT WORK BECAUSE IT USES THE GLOBAL ARRAY
//I NEED TO MAKE AN ARRAY FOR EACH COLORED DICE
function resetDice(){
    for(var i = 0; i < usedColorDice.length; i++){
        if(usedColorDice[i] == "green-brain" || usedColorDice[i] == "green-walk" || usedColorDice[i] == "green-bullet"){
            greenDice.push(usedColorDice[i]);
        }
        else if(usedColorDice[i] == "yellow-brain" || usedColorDice[i] == "yellow-walk" || usedColorDice[i] == "yellow-bullet"){
            yellowDice.push(usedColorDice[i]);
        }
        else redDice.push(usedColorDice[i]);
    }
    //Return all used dice to allDice array
    for(var i = 0; i < usedDice.length; i++){
        allDice.push(usedDice[i]);
    }
}