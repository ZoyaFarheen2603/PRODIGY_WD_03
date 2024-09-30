const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (board[cellIndex] !== '' || !isGameActive) return;

  board[cellIndex] = currentPlayer;
  cell.innerText = currentPlayer;
  cell.classList.add(currentPlayer === 'X' ? 'playerX' : 'playerO');

  checkWinner();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();
}

function checkWinner() {
  let won = false;

  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      won = true;
      cells[a].classList.add('winning-cell');
      cells[b].classList.add('winning-cell');
      cells[c].classList.add('winning-cell');
      isGameActive = false;
      break;
    }
  }

  if (won) {
    statusText.innerText = `Player ${currentPlayer} wins!`;
  } else if (!board.includes('')) {
    statusText.innerText = `It's a draw!`;
    isGameActive = false;
  }
}

function updateStatus() {
  if (isGameActive) {
    statusText.innerText = `Player ${currentPlayer}'s turn`;
  }
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('winning-cell');
  });
  currentPlayer = 'X';
  isGameActive = true;
  updateStatus();
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);

updateStatus();
