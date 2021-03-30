'use strict';
const playersEls = document.querySelectorAll('.player');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const scoreEls = document.querySelectorAll('.score');
const currentEls = document.querySelectorAll('.current-score');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let currentScore, activePlayer, scores;

const init = function () {
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  for (const i of scoreEls) {
    i.textContent = 0;
  }

  for (const i of currentEls) {
    i.textContent = 0;
  }

  for (const i of playersEls) {
    if (i.classList.contains('player--winner')) {
      i.classList.remove('player--winner');
    }

    diceEl.classList.add('hidden');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
  }
};

const switchPlayer = function () {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
};

init();

btnRoll.addEventListener('click', function () {
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(
      `current--${activePlayer}`
    ).textContent = currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  scores[activePlayer] += currentScore;
  if (scores[activePlayer] >= 100) {
    document.querySelector('.player--active').classList.add('player--winner');
  }
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  switchPlayer();
});

btnNew.addEventListener('click', init);
