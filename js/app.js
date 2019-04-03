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

var activePlayer, scores, allDice, greenDice, yellowDice, redDice, usedDice, allDiceSrc;

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

// function chooseDice(){
//     var chosenThree;
//     chosenThree = [];
//     var bothHave, usedHave, chosenHave, rechosenDice;
//     while(chosenThree.length < 3){
//         var chosenDice = Math.floor(Math.random()*allDice.length);
//         //First roll ever - automatically push
//         //Skips second time
//         if(chosenThree.length == 0 && usedDice.length == 0){
//             chosenThree.push(chosenDice);
//             usedDice.push(chosenDice);
//         }
//         //If usedDice has but chosenThree is empty
//         else if(chosenThree.length == 0){
//             var count = 0;
//             for(var i = 0; i < usedDice.length; i++){
//                 if(chosenDice == usedDice[i]){
//                     count++;
//                 }
//             }
//             if(count < 1){
//                 chosenThree.push(chosenDice);
//                 usedDice.push(chosenDice);
//             }
//         }
//         else {
//             for(var i = 0; i < chosenThree.length; i++){
//                 if(chosenDice != chosenThree[i]){
//                     chosenHave = true;
//                 }
//                 else {
//                     choseHave = false;
//                     while(chosenHave == false){
//                         rechosenDice = rerollUntilNew(chosenThree, usedDice);
//                     }
//                 }
//             }
//             for(var i = 0; i < usedDice.length; i++){
//                 if(chosenDice != usedDice[i]){
//                     usedHave = true;
//                 } else usedHave = false;
//                 console.log(usedHave);
//             }
//             if(usedHave == true && chosenHave == true){
//                 chosenThree.push(chosenDice);
//                 usedDice.push(chosenDice);
//             }
//         }
//     }
//     console.log(chosenThree);
// }

document.querySelector(".zd-title").addEventListener("click", function(){
    chooseDice();
});

function chooseDice(){
    var counter = 0;
    if(allDice.length > 1){}
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
        
        counter++;
    }
}


// function rerollUntilNew(chosenThree, usedDice){
//     var rechosenDice = Math.floor(Math.random()*allDice.length);
//     var ifTrue = true;
//     while(ifTrue){
//         var counter = 0;
//         for(var i = 0; i < chosenThree.length; i++){
//             if(rechosenDice != chosenThree[i]){
//                 counter++;
//             }
//         }
//         for(var i = 0; i < usedDice.length; i++){
//             if(rechosenDice != usedDice[i]){
//                 counter++;
//             }
//         }
//         if(counter = 2){
//             ifTrue = false;
//         }
//         else rechosenDice = Math.floor(Math.random()*allDice.length);
//     }
//     return rechosenDice;
// }

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