let currentPlayer = "X";
let board = Array(9).fill(null);
let gameOver = false;

function showSection(id) {
  document.querySelectorAll("main section").forEach(sec => sec.style.display = "none");
  document.getElementById(id).style.display = "block";
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  document.documentElement.setAttribute("data-theme", current === "dark" ? "light" : "dark");
}

function makeMove(tile, index) {
  if (board[index] || gameOver) return;

  board[index] = currentPlayer;
  tile.textContent = currentPlayer;

  if (checkWinner()) {
    document.getElementById("winner").textContent = `${currentPlayer} wins!`;
    gameOver = true;
  } else if (!board.includes(null)) {
    document.getElementById("winner").textContent = "It's a tie!";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winPatterns.some(pattern => 
    pattern.every(i => board[i] === currentPlayer)
  );
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = "X";
  gameOver = false;
  document.getElementById("winner").textContent = "";

  // Clear the tiles
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach(tile => {
    tile.textContent = "";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  showSection('home');
});

let darkModeOn = false;

function toggleThemeSheet() {
  const head = document.head;
  const existingTheme = document.getElementById("theme-style");
  if (existingTheme) {
    existingTheme.remove(); 
  }
  if (darkModeOn) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "css/theme.css";
    link.id = "theme-style";
    head.appendChild(link); 
    darkModeOn = false;
  } else {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "theme.css";
    link.id = "theme-style";
    head.appendChild(link); 
    darkModeOn = true;
  }
}