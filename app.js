"use sctrict";
//Selecting Element
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEL = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnROll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
//Starting Condition
let scores, currentScore, activePlayer, playing;
const diceRollSound = new Audio("dice-roll.mp3");
const winningSound = new Audio("win-sound.mp3");
const switchPlayerSound = new Audio("light-switch.mp3");
const newGameSound = new Audio("new-game.mp3");
const init = function () {
  diceEL.classList.add("hidden");
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  switchPlayerSound.play();
};
//Rolling dice functionality

btnROll.addEventListener("click", function () {
  //1.Generating a number dice roll;
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display  dice

    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;

    //3.Check for rollef if true, switch the user;
    diceRollSound.play();
    if (dice !== 1) {
      //add a dice to current score;
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch the next player;
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1.Add current score to active plaler's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.check if player's score is >=100;
    if (scores[activePlayer] >= 100) {
      document
        .getElementById(`score--${activePlayer}`)
        .classList.add("score--winner");
      playing = false;
      diceEL.classList.add("hidden");
      winningSound.play();
      //Finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  init();
document.getElementById("score--0").classList.remove("score--winner");
  document.getElementById("score--1").classList.remove("score--winner");
  newGameSound.play();
});
