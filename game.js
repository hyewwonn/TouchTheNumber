var cells = document.getElementsByTagName('td');
var numbers = [];
var currentIndex = 0;
var startTime, gameInterval;

var restartbtn = document.getElementById("restart");
var startbtn = document.getElementById("start");
var gametime = document.getElementById("game-time");
var besttime = document.getElementById("best-time");

var bestTime = Number.MAX_SAFE_INTEGER;
besttime.innerHTML = 'best time :';
var savedBestTime = localStorage.getItem('bestTime');

if (savedBestTime) {
  bestTime = parseInt(savedBestTime);
  besttime.innerHTML = 'best time : ' + (bestTime / 1000).toFixed(2) + '초';
}

numbers = [];
currentIndex = 0;
startTime = null;
gameInterval = null;

function set() {
  numbers = [];
  currentIndex = 0;
  startTime = new Date();
  gametime.innerHTML = 'game time : 0.00초';

  for (var i = 1; i <= 25; i++) {
    numbers.push(i);
  }

  // 숫자 랜덤 배치
  for (var i = cells.length - 1; i >= 0; i--) {
    var randomNumber = Math.floor(Math.random() * (i + 1));
    cells[i].textContent = numbers[randomNumber];
    numbers.splice(randomNumber, 1);
  }

  // 클릭 이벤트 리스너 다시 추가
  for (var i = 0; i < cells.length; i++) {
    cells[i].style.backgroundColor = '';
    cells[i].addEventListener('click', handleClick);
  }
  startbtn.style.display = "none";
  clearInterval(gameInterval); // 기존 게임 인터벌 제거
  gameInterval = setInterval(updateGameTime, 100); // 0.1초마다 게임 시간 업데이트
}

function reset() {
  var confirmation = confirm("초기화 하시겠습니까?");
  if (confirmation) {
    set();
    besttime.innerHTML = 'best time : ' + (bestTime / 1000).toFixed(2) + '초';
  }
}

startbtn.onclick = set;
restartbtn.onclick = reset;

// 클릭 이벤트
for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', handleClick);
}

function handleClick() {
  if (parseInt(this.textContent) === currentIndex + 1) {
    this.style.backgroundColor = 'lightblue';
    this.removeEventListener('click', handleClick);
    currentIndex++;

    if (currentIndex === 25) {
      var endTime = new Date();
      var gameTime = endTime - startTime;
      gametime.innerHTML = 'game time : ' + (gameTime / 1000).toFixed(2) + '초';

      if (gameTime < bestTime) {
        bestTime = gameTime;
        besttime.innerHTML = 'best time : ' + (bestTime / 1000).toFixed(2) + '초';
        localStorage.setItem('bestTime', bestTime.toString());
      }

      clearInterval(gameInterval); // 게임 종료 시 게임 인터벌 제거
      gameInterval = null;
    }
  }
}

function updateGameTime() {
    var currentTime = new Date();
    var gameTime = currentTime - startTime;
    gametime.innerHTML = 'game time : ' + (gameTime/1000).toFixed(2) + '초';
}
