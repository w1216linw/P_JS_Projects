const strategyToggle = document.querySelector('.toggle');
const strategyContainer = document.querySelector('.strategies-container');
const strategies = document.querySelectorAll('.strategy');
const start = document.querySelector('.start');
const choices = document.querySelectorAll('.choice');
const actionMsg = document.getElementById('action-msg');
const choseStrategy = document.getElementById('chose-strategy');

let gameStatus = false;

/* Event Listener */
//choose strategy button
strategyToggle.addEventListener('click', () => {
  strategyContainer.classList.toggle('show-strategies');

  strategies.forEach((strategy) => {
    strategy.classList.remove('active');

    strategy.addEventListener('click', () => {
      strategy.classList.add('active');
      choseStrategy.innerText = checkStrategy().textContent;
      strategyContainer.classList.remove('show-strategies');
    });

  });
})

//game start button
start.addEventListener('click', () => {

  if(checkStrategy()){
    start.classList.add('hide-start');
    actionMsg.classList.add('show-msg');
    startGame();
  } else {
    alert("Choose a strategy");
  }

})

/* Function */
function startGame() {

  choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
      console.log(e.currentTarget);
    });
  });

}

function roundResult(playerAction, strategy) {
  const compAction = getCompAction(strategy);

  switch (playerAction + compAction) {
    case 'rs':
    case 'sp':
    case 'pr':
      console.log('player wins');
      break;
    case 'rp':
    case 'ps':
    case 'sr':
      console.log(`comp wins`);
      break;
  }

}

//return there is a strategy
function checkStrategy() {
  let strategy = document.querySelector('.strategy.active');
  return strategy;
}

