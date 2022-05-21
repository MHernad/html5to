const X_CLASS = 'x'
const O_CLASS = 'o'
const WINNING = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const tablero = document.getElementById('tablero')
const winningMessageElement = document.getElementById('ganador')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')

let xTurn

startGame()

function resetButton() {
    startGame()
}

function startGame() {
    xTurn = true
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('mostrar')
}

function handleClick(e){
    const cell = e.target
    const currentClass = xTurn ? X_CLASS : O_CLASS
    placeMark(cell, currentClass)
    if(checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
    swapTurns()
    setBoardHoverClass()
    }
}

function endGame(draw) {
    if(draw) {
        winningMessageTextElement.innerText = 'Empate'
    } else {
        winningMessageTextElement.innerText = `${xTurn ? "X" : "O"} Gana!`
    }
    winningMessageElement.classList.add('mostrar')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns() {
    xTurn = !xTurn
}

function setBoardHoverClass() {
    tablero.classList.remove(X_CLASS)
    tablero.classList.remove(O_CLASS)
    if(xTurn) {
        tablero.classList.add(X_CLASS)
    } else {
        tablero.classList.add(O_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}