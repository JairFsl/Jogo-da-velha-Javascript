const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessage = document.querySelector("[data-winning-message]");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const restartButton = document.querySelector("[data-restart-button]");

let xTurn = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  xTurn = true;

  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
  winningMessage.classList.remove("show-winning-message");
};

const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = "Empate!";
  } else {
    winningMessageTextElement.innerText = xTurn
      ? "X Venceu!"
      : "O Venceu!";
  }

  winningMessage.classList.add("show-winning-message");
};

const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (xTurn) {
    board.classList.add("x");
  } else {
    board.classList.add("circle");
  }
};

const swapTurns = () => {
  xTurn = !xTurn;

  setBoardHoverClass();
};

const handleClick = (e) => {
  // Colocar X ou O na jogada
  const cell = e.target;

  // Define a variável de acordo com a condição do "xTurn" ser True ou False
  // if (xTurn === true) "x"
  // if (xTurn === false) "circle"
  // xTurn ? "true" : "false"
  const classToAdd = xTurn ? "x" : "circle";
  placeMark(cell, classToAdd);

  // Verificar por vitória
  // Verficiar por empate
  const isWin = checkForWin(classToAdd);
  const isDraw = checkForDraw();
  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    // Mudar o símbolo
    swapTurns();
  }
};

startGame();

restartButton.addEventListener("click", startGame);
