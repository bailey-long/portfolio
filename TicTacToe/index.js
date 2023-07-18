const X_CLASS = "X";
const O_CLASS = "O";
let xScore = 0;
let oScore = 0;
const cellElements = document.querySelectorAll('[data-cell]');
//Display score count in html page
document.getElementById("xScore").innerHTML = "X: " + xScore;
document.getElementById("oScore").innerHTML = "O: " + oScore;
//Define a starting turn
let circleTurn;
//Array to determine winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
function startGame(){
    //Allow X to start first
    circleTurn = false;
    //initialize tiles
    cellElements.forEach(Square => {
        //Clear tiles
        Square.classList.remove(X_CLASS);
        Square.classList.remove(O_CLASS);
        Square.innerHTML = "";
        //remove eventlistener from tiles to prevent multiple clicks
        Square.removeEventListener('click', clickTlie)
        Square.addEventListener('click', clickTlie, { once: true })
    });
};

function clickTlie(e){
    const Square = e.target;
    //handle click
    console.log("clicked");
    //define current class
    const currentClass = circleTurn ? O_CLASS : X_CLASS;
    placeMark(Square, currentClass);
    //Check for win
    if (checkWin(currentClass)) {
        endGame(false)
      } else if (isDraw()) {
        endGame(true)
      } else {
        swapTurns()
      }
}

//Change the active turn
function swapTurns(){
    circleTurn = !circleTurn;
}

//Place marks on clicked tile
function placeMark(Square, currentClass){
    //Add class to clicked tile based on current turn
    Square.classList.add(currentClass);
    cellElements.forEach(Square => {
        if (Square.classList.contains(X_CLASS)) {
            Square.innerHTML = "X";
        } else if (Square.classList.contains(O_CLASS)) {
            Square.innerHTML = "O";
        };
    });
}

//Go through winning combinations to check for win
function checkWin(currentClass){
    return winningCombinations.some(combination => {
        //test whether all elements in the array pass the test
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

//Check for a draw
function isDraw() {
    //test whether all elements in the array pass the test
    return [...cellElements].every(Square => {
      return Square.classList.contains(X_CLASS) || Square.classList.contains(O_CLASS)
    })
  }

//Display draw or win
function endGame(draw) {
    if (draw) {
        alert("Draw!")
    } else {
        circleTurn ? oScore++ : xScore++;
        document.getElementById("xScore").innerHTML = "X: " + xScore;
        document.getElementById("oScore").innerHTML = "O: " + oScore;
        alert(`${circleTurn ? "O's" : "X's"} Wins!`);
}};