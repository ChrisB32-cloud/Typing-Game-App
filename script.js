// 1 start
const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// 2 list or words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

// 3 Init word
let randomWord;

// 4 Init score
let score = 0;

// 5 Init time

let time = 10;

// 22 / 24 Set difficulty to value in ls or medium
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// 25 set difficulty select value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// 12 Focus on text on Load/Start
text.focus();

// 13 Start counting down
const timeInterval = setInterval(updateTime, 1000);
// setInterval allows us to run a spiecfic function, seocnd parm is for time interval

// 6 Generate Random word from Array / create function to get random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// 7 Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// 11 update Score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// 14 Update Time
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  // 15
  if (time === 0) {
    clearInterval(timeInterval);

    // 16 call game over
    gameover();
  }
}

// 17 game over, show end screen
function gameover() {
  endgameEl.innerHTML = `
    <h1>TIme ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = 'flex';
}

addWordToDOM();

// 8 Event listener

// typing
text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    // 10 call updateScore
    updateScore();

    // 9 clear
    e.target.value = '';

    // 19 appending 5 seconds for each time a word is correct
    // time += 5;

    // 26
    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// 20 Settings btn click
settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('hide');
});

// 21 settings select
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  // 23
  localStorage.setItem('difficulty', difficulty);
});
