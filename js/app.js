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

var activePlayer, scores, allDice, greenDice, yellowDice, redDice, usedDice, allDiceSrc, latestDice, currentShots, currentBrains;

//GREEN DICE = TOTAL 6 = INDEX: 0-5
//YELLOW DICE = TOTAL 4 = INDEX: 6-9
//RED DICE = TOTAL 3 = INDEX: 10-12
allDice = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

//GREEN-BRAIN = TOTAL 3 = 0 - 2
//GREEN-WALK = TOTAL 2 = 3 - 4
//GREEN-BULLET = TOTAL 1 = 5
greenDice = [0, 1, 2, 3, 4, 5];

//YELLOW-BRAIN = TOTAL 2 = 0 - 1
//YELLOW-WALK = TOTAL 2 = 2 - 3
//YELLOW-BULLET = TOTAL 2 = 4 - 5
yellowDice = [0, 1, 2, 3, 4, 5];

//RED-BRAIN = TOTAL 1 = 0
//RED-WALK = TOTAL 2 = 1 - 2
//RED-BULLET = TOTAL 3 = 3 - 5
redDice = [0, 1, 2, 3, 4, 5];

usedDice = [];

latestDice = [];

currentShots = 0;

currentBrains = 0;

scores = [0, 0, 0, 0];

init();


//When clicked, go to next player
document.querySelector(".hold_actions").addEventListener("click",function(){
    holdBrains();
});

function init(){
    scores = [0,0,0,0];
    activePlayer = 0;

    gamePlaying = true;

    document.querySelector(".player-card-" + activePlayer).classList.add("player_active_border");
}


document.querySelector(".load_actions").addEventListener("click", function(){
    chooseDice();
});

function chooseDice(){
    var counter = 0;
    latestDice = [];
    while(counter < 3){
        var chosenDice = Math.floor(Math.random() * allDice.length);
        var indexValue = allDice[chosenDice];

        var indexHolder = parseInt(allDice.splice(chosenDice, 1));
        if(indexValue >= 0 && indexValue < 6){
            document.querySelector(".dice-" + indexValue).src = "images/gray-brain.jpg";
            document.querySelector(".active-dice-" + counter).src = "images/green-question.jpg";
        }
        else if((indexValue > 5 && indexValue < 10) || indexValue == 7){
            document.querySelector(".dice-" + indexValue).src = "images/gray-walk.jpg";
            document.querySelector(".active-dice-" + counter).src = "images/yellow-question.jpg";
        }
        else if (indexValue >= 10 && indexValue < 13){
            document.querySelector(".dice-" + indexValue).src = "images/gray-bullet.jpg";
            document.querySelector(".active-dice-" + counter).src = "images/red-question.jpg";
        }
        usedDice.push(indexHolder);
        latestDice.push(indexHolder);
        counter++;
    }
}

document.querySelector(".roll_actions").addEventListener("click",function(){
    rollAllDice();
});

//TO DO: Make a new array that stores the latest 3 dice chosen.
//Then use those indexes instead of using .src

function rollAllDice(){
    for(var i = 0; i < latestDice.length; i++){
        var diceRoll = Math.floor(Math.random() * 6);
        var activeDice = document.querySelector(".active-dice-" + i);
        //If green
        if(latestDice[i] >= 0 && latestDice[i] < 6){
            if(diceRoll >= 0 && diceRoll < 3){
                activeDice.src = "images/green-brain.jpg";
                currentBrains++;
                displayBrains()
            }
            else if(diceRoll == 3 || diceRoll == 4){
                activeDice.src = "images/green-walk.jpg";
            }
            else {
                activeDice.src = "images/green-bullet.jpg";
                currentShots++;
                document.querySelector(".bullet-" + currentShots).src = "images/white-bullet.jpg";
                checkBullets();
            }
        }
        //If yellow
        else if (latestDice[i] >= 6 && latestDice[i] < 10){
            if(diceRoll == 0 && diceRoll == 1){
                activeDice.src = "images/yellow-brain.jpg";
                currentBrains++;
                displayBrains()
            }
            else if(diceRoll == 2 || diceRoll == 3){
                activeDice.src = "images/yellow-walk.jpg";
            }
            else {
                activeDice.src = "images/yellow-bullet.jpg";
                currentShots++;
                document.querySelector(".bullet-" + currentShots).src = "images/white-bullet.jpg";
                checkBullets();
            }
        }
        //If red
        else if (latestDice[i] >= 10 && latestDice[i] < 13){
            if(diceRoll == 0){
                activeDice.src = "images/red-brain.jpg";
                currentBrains++;
                displayBrains()
            }
            else if(diceRoll == 1 || diceRoll == 2){
                activeDice.src = "images/red-walk.jpg";
            }
            else {
                activeDice.src = "images/red-bullet.jpg";
                currentShots++;
                document.querySelector(".bullet-" + currentShots).src = "images/white-bullet.jpg";
                checkBullets();
            }
        }
    }
}

function checkBullets(){
    if(currentShots >= 3){
        currentShots = 0;
        resetDice();
        nextPlayer();
    }
}

function displayBrains(){
    document.querySelector(".zd-brains-count").textContent = currentBrains;
}

function holdBrains(){
    checkWin();
    scores[activePlayer] += currentBrains;
    document.querySelector(".player-brain-" + activePlayer).textContent = scores[activePlayer];
    document.querySelector(".zd-brains-count").textContent = 0;
    resetDice();
    nextPlayer();
}

function checkWin(){
    if(scores[activePlayer] >= 13){
        document.querySelector(".cpd_text").innerHTML = "WINNER!!!!!";
        document.querySelector(".zd-player-actions").style.visibility = "hidden";
    }
}

function nextPlayer(){
    currentBrains = 0;
    currentShots = 0;
    //Change active player border
    document.querySelector(".player-card-" + activePlayer).classList.remove("player_active_border");

    activePlayer == 3 ? activePlayer = 0 : activePlayer += 1;
    document.querySelector(".player-card-" + activePlayer).classList.add("player_active_border");

    //Change Player number displayer
    document.querySelector(".cpd_text").innerHTML = "PLAYER<br>" + (activePlayer + 1);

}

function resetDice(){
    //Reset dice
    allDice = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    usedDice = [];
    //Reset src
    for(var i = 0; i < allDice.length; i++){
        if(i >= 0 && i < 6){
            document.querySelector(".dice-" + i).src = "images/green-brain.jpg";
        }
        else if (i >= 6 && i < 10){
            document.querySelector(".dice-" + i).src = "images/yellow-walk.jpg";
        }
        else document.querySelector(".dice-" + i).src = "images/red-bullet.jpg";
    }
    //Reset bullets
    for(var i = 1; i < 4; i++){
        document.querySelector(".bullet-" + i).src = "images/gray-bullet.jpg";
    }
    //Reset Active dice to gray-brain
    // document.querySelectorAll(".active_dice_img").src = "images/gray-brain.jpg";
}


