const start = document.querySelector('.start');
const actionMsg = document.getElementById('action-msg');
let gameStatus = false;

start.addEventListener('click', () => {
  start.classList.add('hide-start');
  actionMsg.classList.add('show-msg');
})
console.log(start, actionMsg);