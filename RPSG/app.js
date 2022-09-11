const playerScore = document.getElementById('player-score');  //player score
const computerScore = document.getElementById('computer-score');  //computer score

const result = document.querySelector('.result'); // result of each round

const start = document.querySelector('.start'); //start button
const choices = document.querySelectorAll('.choice'); //three choices (rock, paper, scissors)
const covers = document.querySelectorAll('.cover'); // three covers
const actionMsg = document.getElementById('action-msg'); //instruction

const strategyToggle = document.querySelector('.toggle'); // toggle to show strategies
const surrenderBtn = document.querySelector('.surrender');
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
    switch(gameStatus.userMove.slice(-1)) {
      case 'r':
        return 'p';
      case 'p':
        return 's';
      case 's':
        return 'r';
    }
  },
  'one step forward' : function() {
    if(gameStatus.userMove.length <= 1) {
      return compStrategies.random();
    } else {
      switch (gameStatus.userMove.slice(-2,-1)) {
        case 's':
          return 'r';
        case 'r':
          return 'p';
        case 'p':
          return 's';
      }
    }
  }
}; // strategies

const gameStatus = {
  computerScore : 0,
  playerScore : 0,
  strategy: '',
  userMove: '',
};

loadPage();

/*
 Event Listener 
*/

//game start button
start.addEventListener('click', () => {
    defaultStatus();
    closeToggle();
    switchToggle();
})

//toggle strategies
strategyToggle.addEventListener('click', () => strategyContainer.classList.toggle('show-strategies'));

//select strategy
strategies.forEach((strategy) => {

  strategy.addEventListener('click', () => {
    document.querySelector('.strategy.active').classList.remove('active');
    strategy.classList.add('active');
    choseStrategy.textContent = checkStrategy().textContent;
    gameStatus.strategy = checkStrategy().textContent;
    console.log(gameStatus.strategy) //delete
    closeToggle()
  });

});

//surrender Button
surrenderBtn.addEventListener('click', () => {
  result.textContent = "You surrendered?"
  defaultStatus();
  switchToggle();
})

//action choices listener
choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    gameStatus.userMove += e.currentTarget.id;
    roundResult(e.currentTarget.id, gameStatus.strategy);
    matchResult();
  });
});

/* 
Function 
*/

//return round result
function roundResult(playerAction, strategy) {
  const compAction = compStrategies[strategy]();
  let msg = '';

  switch (playerAction + compAction) {
    case 'rs':
    case 'sp':
    case 'pr':
      msg = 'Player Wins';
      break;
    case 'rp':
    case 'ps':
    case 'sr':
      msg = 'Player Loses';
      break;
    case 'rr':
    case 'pp':
    case 'ss':
      msg = 'It\'s a Draw';
      break;
  }

  renderResult(playerAction, compAction, msg);
}

//return chose strategy
function checkStrategy() {
  return document.querySelector('.strategy.active');
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

//close toggle
function closeToggle() {
  strategyContainer.classList.remove('show-strategies');
}

//switch toggle and surrender, action msg and start button
function switchToggle() {
  start.classList.toggle('hide-start');
  actionMsg.classList.toggle('show-msg');
  strategyToggle.classList.toggle('hide-toggle');
  surrenderBtn.classList.toggle('show-surrender');
  choices.forEach(choice => choice.classList.toggle('show-choice'));
  covers.forEach(cover => cover.classList.toggle('hide-cover'));
}

//match result
function matchResult() {

  if(gameStatus.playerScore === 3) {
    result.innerHTML = `You win the match!`;
    switchToggle();
  } else if(gameStatus.computerScore === 3) {
    result.innerHTML = `You lose the match~`;
    switchToggle();
  }
  
}

//default game status
function defaultStatus() {
  gameStatus.computerScore = 0;
  gameStatus.playerScore = 0;
  gameStatus.userMove= '';
  playerScore.textContent = 0;
  computerScore.textContent = 0;
}

//default strategy 
function loadPage() {
  choseStrategy.textContent = checkStrategy().textContent; 
  gameStatus.strategy = checkStrategy().textContent;
}
