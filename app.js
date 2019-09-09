/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// *********************************************************************************************

// Defining variables
var scores, roundScore, activePlayer, gamePlaying;

//Setting variable parameters
init();

/*
//rf Note 1.
dice = Math.floor(Math.random() * 6) + 1 
console.log(dice)

//rf Note 2.
//document.querySelector('#current-' + activePlayer).textContent = dice;

//rf Note 3.
document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'


//Assigning an html value to a javascript variable:
var x = document.querySelector('#score-0').textContent;
console.log(x)
*/


//rf Note 4.
// document.querySelector('.dice').style.display = 'none' // in the init function now.

// Note 1. Making randomised dice element - Math.random() will create a random number between 0 and 1. to make it out of 6 like a dice, we times Math.random by 6 and + 1 (because otherwise it would be between 0 and 5). then, to make them whole numbers, we use Math.floor. so part of the function for dice is: Math.floor(Math.random() * 6)

// Note 2. document.querySelector() is a way of accessing the DOM. The '#' is a way to access id. .textContent is necessary to refer it to the dice variable.

// Note 3. '.innerHTML' must be used to input html, otherwise if it is just text in javascript then you can use '.textContent'. you must put the innerhtml text afterward in a string!

// Note 4. Trying to change the dice image icon in CSS - '.' is the selector for classes in html, whereas '#' is for IDs. you use '.style' for the css method. then you select the type of css property you are changing, here it is 'display', then set it to 'none'.

// *********************************************************************************************

// Note 5. Events and Event listeners - take place when there are no awaiting execution contexts, click events (e.i. a function), can call there own execution contexts (a click handler). You can add a callback function, where you only call the function out in the 'addEventListener' by its name (i.e. btn) or have an anonymous function, where you the function directly into the 'addEventListener', (note that you can only use the function there, and cannot refer to it elsewhere, here it works well as we only want the btn function to work for this roll btn). remember we can delete the dice variable in the global context, because we don't need it there.

/*
//Setting values on the program to 0 - also using 'getElementById' to directly grab the id from the html file without a '#' sign.
document.getElementById('score-0').textContent = 0
document.getElementById('score-1').textContent = 0
document.getElementById('current-0').textContent = 0
document.getElementById('current-1').textContent = 0 *///Part of init function now

//rf Note 5.
document.querySelector('.btn-roll').addEventListener('click', function() {
 if(gamePlaying) { //gameplaying is set to false when the player reaches the winning score.
   
  // 1. Random Number
  var dice = Math.floor(Math.random() * 6) + 1;

  // Display result
  var diceDOM = document.querySelector('.dice'); //Setting variable for the dice search
  diceDOM.style.display = 'block';
  diceDOM.src = 'dice-' + dice + '.png';
  
  //Update round score IF the rolled number is not a 1
  if (dice > 1) { // here we could also use the 'different operator' aka '!=='
    //Add score
    roundScore += dice; // same as 'roundScore = roundScore + dice'. note also that roundScore is global variables and due to scope chain we have access to it in this function. 
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    //Next player
    nextPlayer();
  }
 }
});


// *********************************************************************************************

document.querySelector('.btn-hold').addEventListener('click', function() {
   if(gamePlaying) {
 //Add current score to global score
 scores[activePlayer] += roundScore;
 
 //Update the UI
 document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

 //Check if player won the game
   if (scores[activePlayer] >= 100) {
     document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
     document.querySelector('.dice').style.display = 'none';
     document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
     document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
     gamePlaying = false;//here we set it to false, to stop the earlier function from working.
   } else { 
     nextPlayer(); //putting this here continues the game if it ins't over 100, if it is it wont switch the player.
   }

 //Next Player 
 //now we literally have code in the other function that assigns the next player, but DRY DO NOT REPEAT YOURSELF. So we are going to make a function that has the earlier code, and simply call it in both event listeners.
 nextPlayer();
   };
});

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //instead of the terniary operator you could also do this in another if/else statement too.
    roundScore = 0; //this is to make sure it counts the other player from anew.

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
/*
    document.querySelector('.player-0-panel').classList.remove('active'); //so there is the 'active' in the html file of the 'player-0-panel' that is making it look like it is player 0's turn in css. we need to toggle it out and in through javascript, this is the way to remove it. It is similar technique for adding matieral...
    document.querySelector('.player-1-panel').classList.add('active'); 
    */
   document.querySelector('.player-1-panel').classList.toggle('active'); 
   document.querySelector('.player-0-panel').classList.toggle('active'); 
   //toggle removes the matieral if it is there or adds it if it isn't.

   document.querySelector('.dice').style.display = 'none';

}

// *********************************************************************************************

document.querySelector('.btn-new').addEventListener('click', init); //so instead of building an anonymous function to call the init function, we can just call the init fucntion directly. however you can to not put the brackets there.

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;

gamePlaying = true;

  document.querySelector('.dice').style.display = 'none'

  document.getElementById('score-0').textContent = 0
  document.getElementById('score-1').textContent = 0
  document.getElementById('current-0').textContent = 0
  document.getElementById('current-1').textContent = 0
  document.getElementById('name-0').textContent = 'Player 1'
  document.getElementById('name-1').textContent = 'Player 2'
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');// you want to remove the active player from both and then add it again as otherwise you might have the active player duplicated on a player, meaning both could be active at one point in future games i think.
  document.querySelector('.player-0-panel').classList.add('active');
  
} // a function for initalising the game, and setting variables to 0. called at the beginning too.

// **********************************************************************************************
//CODING CHALLENEGE 6