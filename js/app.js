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

function init(){
    scores = [0,0,0,0];
    activePlayer = 0;
}