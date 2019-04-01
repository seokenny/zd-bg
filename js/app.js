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

var activePlayer, scores;

init();

//When clicked, go to next player
document.querySelector(".zd-player-actions").addEventListener("click",function(){
    nextPlayer();
});

function init(){
    scores = [0,0,0,0];
    activePlayer = 0;

    document.querySelector(".player-card-" + activePlayer).classList.add("player_active_border");
}

function rollAllDice(){

}

function nextPlayer(){
    document.querySelector(".player-card-" + activePlayer).classList.remove("player_active_border");
    if(activePlayer == 3){
        activePlayer = 0;
    }
    else activePlayer += 1;
    document.querySelector(".player-card-" + activePlayer).classList.add("player_active_border");

    document.querySelector(".cpd_text").innerHTML = "PLAYER<br>" + (activePlayer + 1);
}