const timeLeftDisplay = document.querySelector("#time-left");
const resultDisplay = document.querySelector("#result");
const startPauseButton = document.querySelector("#start-pause-button");
const squares = document.querySelectorAll(".grid div");
const logsLeft = document.querySelectorAll(".log-left");
const logsRight = document.querySelectorAll(".log-right");
const carsLeft = document.querySelectorAll(".car-left");
const carsRight = document.querySelectorAll(".car-right");

let currentIndex = 76;
const width = 9;
const totalSquares = width * width;
let timeLeft = 15;
let timeInterval;
let moveElementsInterval;
let outcomeInterval;
let isPaused = true;

function moveFrog(e) {
    squares[currentIndex].classList.remove('frog');
    switch (e.key) {
        case "ArrowLeft":
            if (currentIndex % width !== 0)
                currentIndex--;
            break;

        case "ArrowRight":
            if (currentIndex % width !== 8)
                currentIndex++;
            break;

        case "ArrowUp":
            if (currentIndex > width)
                currentIndex -= width;
            break;

        case "ArrowDown":
            if (currentIndex < totalSquares - width)
                currentIndex += width;
            break;
    }
    squares[currentIndex].classList.add('frog');
}

function autoMoveElements() {
    logsLeft.forEach(logLeft => moveLogLeft(logLeft));
    logsRight.forEach(logRight => moveLogRight(logRight));
    carsLeft.forEach(carLeft => moveCarLeft(carLeft));
    carsRight.forEach(carRight => moveCarRight(carRight));
}

function checkOutcome(){
    lose();
    win();
}

function decrementAndCheckTime() {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft.toString();
}

function moveLogLeft(logLeft) {
    if (logLeft.classList.contains("l1")) {
        logLeft.classList.remove("l1");
        logLeft.classList.add("l2");
    } else if (logLeft.classList.contains("l2")) {
        logLeft.classList.remove("l2");
        logLeft.classList.add("l3");
    } else if (logLeft.classList.contains("l3")) {
        logLeft.classList.remove("l3");
        logLeft.classList.add("l4");
    } else if (logLeft.classList.contains("l4")) {
        logLeft.classList.remove("l4");
        logLeft.classList.add("l5");
    } else if (logLeft.classList.contains("l5")) {
        logLeft.classList.remove("l5");
        logLeft.classList.add("l1");
    }
}

function moveLogRight(logRight) {
    if (logRight.classList.contains("l1")) {
        logRight.classList.remove("l1");
        logRight.classList.add("l5");
    } else if (logRight.classList.contains("l2")) {
        logRight.classList.remove("l2");
        logRight.classList.add("l1");
    } else if (logRight.classList.contains("l3")) {
        logRight.classList.remove("l3");
        logRight.classList.add("l2");
    } else if (logRight.classList.contains("l4")) {
        logRight.classList.remove("l4");
        logRight.classList.add("l3");
    } else if (logRight.classList.contains("l5")) {
        logRight.classList.remove("l5");
        logRight.classList.add("l4");
    }
}

function moveCarLeft(carLeft) {
    if (carLeft.classList.contains("c1")) {
        carLeft.classList.remove("c1");
        carLeft.classList.add("c2");
    } else if (carLeft.classList.contains("c2")) {
        carLeft.classList.remove("c2");
        carLeft.classList.add("c3");
    } else if (carLeft.classList.contains("c3")) {
        carLeft.classList.remove("c3");
        carLeft.classList.add("c1");
    }
}

function moveCarRight(carRight) {
    if (carRight.classList.contains("c1")) {
        carRight.classList.remove("c1");
        carRight.classList.add("c3");
    } else if (carRight.classList.contains("c2")) {
        carRight.classList.remove("c2");
        carRight.classList.add("c1");
    } else if (carRight.classList.contains("c3")) {
        carRight.classList.remove("c3");
        carRight.classList.add("c2");
    }
}

function lose() {
    if (squares[currentIndex].classList.contains("c1") ||
        squares[currentIndex].classList.contains("l4") ||
        squares[currentIndex].classList.contains("l5") ||
        timeLeft <= 0) {
        resultDisplay.textContent = "You Lost!";
        clearInterval(timeInterval);
        clearInterval(outcomeInterval);
        clearInterval(moveElementsInterval);
        squares[currentIndex].classList.remove("frog");
        document.removeEventListener('keyup', moveFrog);
    }
}

function win() {
    if (squares[currentIndex].classList.contains("ending-block")) {
        resultDisplay.textContent = "You Won!";
        clearInterval(timeInterval);
        clearInterval(outcomeInterval);
        clearInterval(moveElementsInterval);
        document.removeEventListener("keyup", moveFrog);
    }
}

startPauseButton.addEventListener("click", () => {
    if (isPaused) {
        isPaused = false;
        clearInterval(moveElementsInterval);
        clearInterval(timeInterval);
        clearInterval(outcomeInterval);
        document.removeEventListener("keyup", moveFrog);
    } else {
        isPaused = true;
        moveElementsInterval = setInterval(autoMoveElements, 600);
        timeInterval = setInterval(decrementAndCheckTime, 1000);
        outcomeInterval = setInterval(checkOutcome,50);
        document.addEventListener("keyup", moveFrog);
    }
})