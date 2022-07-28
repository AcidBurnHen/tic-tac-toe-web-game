const X = 'x';
const CIRCLE = "circle"

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 9],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board')
const winningMessage = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById("winning-message")
const restartButton = document.getElementById("restartButton")

let circleTurn

startGame();

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X)
        cell.classList.remove(CIRCLE)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE : X
    placeMark(cell, currentClass)

    if (checkWin(currentClass)) {
       endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
    setBoardHoverClass()
    }
}

function endGame(draw) {
    if (draw) {
        winningMessage.innerText = 'Draw!'
    } else {
        winningMessage.innerText = `${circleTurn ? "O" : "X"} won `
    }
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X) || cell.classList.contains(CIRCLE)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X);
    board.classList.remove(CIRCLE);
    if (circleTurn) {
        board.classList.add(CIRCLE);
    } else {
        board.classList.add(X)
    }
}

function checkWin(currentClass) {
 return winningCombinations.some(combination => {
    return combination.every(index => {
        return cellElements[index].classList.contains(currentClass)
    })
 } )
}