const playerScore = document.getElementById('player-score');  //player score
const computerScore = document.getElementById('computer-score');  //computer score

const result = document.querySelector('.result'); // result of each round

const start = document.querySelector('.start'); //start button
const choices = document.querySelectorAll('.choice'); //three choices (rock, paper, scissors)
const actionMsg = document.getElementById('action-msg'); //instruction

const strategyToggle = document.querySelector('.toggle'); // toggle to show strategies
const strategyContainer = document.querySelector('.strategies-container'); //container
const strategies = document.querySelectorAll('.strategy');  //strategies
const choseStrategy = document.getElementById('chose-strategy'); //strategy being chose

const resultMsgImg = {
  'r': `<span class='in-word-icon'><i class="fa-regular fa-hand-back-fist"></i></span>`,
  's': `<span class='in-word-icon'><i class="fa-regular fa-hand-scissors"></i></span>`,
  'p': `<span class='in-word-icon'><i class="fa-regular fa-hand"></i></span>`,
}; // corresponded img to choice

const compStrategies = {
  'random' : function(){
    const chose = ['r', 'p', 's'];
    return chose[Math.floor(Math.random() * 3)];
  },
  'unwinnable' : function(){
    console.log('unwinnable');
  }
}; // strategies

const gameStatus = {
  status : true,
  computerScore : 0,
  playerScore : 0,
};

choseStrategy.textContent = checkStrategy().textContent; 

/*
 Event Listener 
*/

//choose strategy button
strategyToggle.addEventListener('click', () => {
  strategyContainer.classList.toggle('show-strategies');

  strategies.forEach((strategy) => {
    strategy.classList.remove('active');

    strategy.addEventListener('click', () => {
      strategy.classList.add('active');
      choseStrategy.textContent = checkStrategy().textContent;
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

/* 
Function 
*/
function startGame() {

    choices.forEach((choice) => {
      choice.addEventListener('click', (e) => {
        console.log(e.currentTarget);
        roundResult(e.currentTarget.id, checkStrategy().textContent.toLowerCase());
      });
  });

}

//return round result
function roundResult(playerAction, strategy) {
  const compAction = compStrategies[strategy]();
  switch (playerAction + compAction) {
    case 'rs':
    case 'sp':
    case 'pr':
      renderResult(playerAction, compAction, 'Player Wins');
      break;
    case 'rp':
    case 'ps':
    case 'sr':
      renderResult(playerAction, compAction, 'Player Loses');
      break;
    case 'rr':
    case 'pp':
    case 'ss':
      renderResult(playerAction, compAction, 'It\'s a Draw');
      break;
  }

}

//return there is a strategy
function checkStrategy() {
  let strategy = document.querySelector('.strategy.active');
  return strategy;
}

//render result
function renderResult(playerAction,compAction,resultStr) {
  result.innerHTML = `${resultMsgImg[playerAction] + ' ' + resultStr + ' ' + resultMsgImg[compAction]}`;
  calScore(resultStr);
  playerScore.textContent = gameStatus.playerScore;
  computerScore.textContent = gameStatus.computerScore;
}

//calculate score
function calScore(resultStr) {

  switch (resultStr) {
    case `Player Wins` :
      gameStatus.playerScore++;
      break;
    case `Player Loses` :
      gameStatus.computerScore++;
      break;
    default:
      break;
  };

}