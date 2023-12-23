const firstPageContinueButton = document.querySelector("#first-page-continue-button");

firstPageContinueButton.addEventListener("click", getChoices);

function getChoices() {
    const choices = [document.querySelector("#choice1"), document.querySelector("#choice2")];

    const selectedChoice = document.querySelector("#selected-choice")
    
    checkChoices(choices, selectedChoice);
}

const STYLE_BORDER_COLOR = {
    RED: "red",
    BACKGROUND_GREY: "rgb(30, 30, 30)"
}

const STYLE_VISIBILITY = {
    VISIBLE: "visible",
    HIDDEN: "hidden"
}

function checkChoices(userChoices, selectedChoice) {
    const warningText = document.querySelector("#user-choice-input-warning");

    for (i = 0; i < userChoices.length; i++)
    {
        if (!userChoices[i].value.toLowerCase().trim()) //Empty string
        {
            warningText.textContent = "Please input TWO choices"
            showWarning(userChoices[i], warningText, STYLE_BORDER_COLOR.RED, STYLE_VISIBILITY.VISIBLE); //Warning to user to input TWO choices
        }
        else {
            userChoices[i].style.borderColor = STYLE_BORDER_COLOR.BACKGROUND_GREY;
            if (userChoices[0].value.toLowerCase().trim() === userChoices[1].value.toLowerCase().trim()) {
                warningText.textContent = "Please input two UNIQUE choices";
                showWarning(userChoices[i], warningText, STYLE_BORDER_COLOR.RED, STYLE_VISIBILITY.VISIBLE);
            }
        }
    }

    const selectedChoiceWarning = document.querySelector("#user-selected-choice-warning");

    if (selectedChoice.value.toLowerCase().trim() !== userChoices[0].value.toLowerCase().trim() || selectedChoice.value.toLowerCase().trim() !== userChoices[1].value.toLowerCase().trim()) {
        showWarning(selectedChoice, selectedChoiceWarning, STYLE_BORDER_COLOR.RED, STYLE_VISIBILITY.VISIBLE); //Shows warning to user to match the selected choice to one of the above to choices
    }
    if (selectedChoice.value.toLowerCase().trim() === userChoices[0].value.toLowerCase().trim() || selectedChoice.value.toLowerCase().trim() === userChoices[1].value.toLowerCase().trim()) {
        selectedChoice.style.borderColor = STYLE_BORDER_COLOR.BACKGROUND_GREY;
        selectedChoiceWarning.style.visibility = STYLE_VISIBILITY.HIDDEN;
    }

    let validToProceed = checkIfValidToProceed([userChoices[0].value.toLowerCase().trim(), userChoices[1].value.toLowerCase().trim()], 
                                                selectedChoice.value.toLowerCase().trim());
    if (validToProceed) {
        displayNextSection("rockPaperScissors");
    }
}

function showWarning(choiceInputField, warningText, inputFieldBorderColor, visibility) {
    choiceInputField.style.borderColor = inputFieldBorderColor;
    warningText.style.visibility = visibility;
}

let userSelectedChoice;
let userNotSelectedChoice;

function checkIfValidToProceed(userChoiceValues, selectedChoice) {
    validToProceed = false;
    if (!(userChoiceValues[0] && userChoiceValues[1])) {  //Checks if both choices are filled in (guard clause)
        return;
    }
    if (!userChoiceValues.includes(selectedChoice)) { //Checks if one of the choices is the selectedChoice (guard clause)
        return;
    }
    if (userChoiceValues[0] !== userChoiceValues[1]) { //Checks if both choices are unique
        validToProceed = true;
    }

    if (!validToProceed) {
        return;
    }

    assignNotSelectedChoice(userChoiceValues, selectedChoice);

    return true;
}

function assignNotSelectedChoice(userChoiceValues, selectedChoice) {
    userSelectedChoice = selectedChoice; //Assigning the verified selected choice to a global variable

    let indexOfUserSelectedChoice = userChoiceValues.indexOf(userSelectedChoice); //Assigns the index of the selected value
    userChoiceValues.splice(indexOfUserSelectedChoice, 1); //Deletes the choice

    userNotSelectedChoice = userChoiceValues[0]; //Assings the remaining item as the choice the user did not select
}

function userSelectsWeapon() {
    //console.log(userSelectedChoice);

    const rockButton = document.querySelector("#rock-button");
    const paperButton = document.querySelector("#paper-button");
    const scissorsButton = document.querySelector("#scissors-button");

    rockButton.addEventListener("click", () => {
        gameOn("rock");
    });
    paperButton.addEventListener("click", () => {
        gameOn("paper");
    });
    scissorsButton.addEventListener("click", () => {
        gameOn("scissors");
    });
}

let gameState = "running";

const weapons = {
    ROCK: "rock",
    PAPER: "paper",
    SCISSORS: "scissors"
}
    
const outcome = {
    WIN: "YOU WON!",
    LOSE: "YOU LOSE!",
    TIE: "TIE! TRY AGAIN"
}

let computerWeapon = generateComputerWeapon();

const userWeaponDisplay = document.querySelector("#user-weapon");
const computerWeaponDisplay = document.querySelector("#computer-weapon");
const outcomeDisplay = document.querySelector("#outcome-display-text");

function gameOn(userWeapon) {
    switch (computerWeapon) {
        case weapons.ROCK:
            if (userWeapon === weapons.SCISSORS) {
                setGameStatus(outcome.LOSE, "✂️", "✊")

                break;
            }
            else if (userWeapon === weapons.PAPER) {
                setGameStatus(outcome.WIN, "✋", "✊");

                break;
            }
            else if (userWeapon === weapons.ROCK) {
                setGameStatus(outcome.TIE, "✊", "✊");
                computerWeapon = generateComputerWeapon();

                break;
            }
        case weapons.PAPER:
            if (userWeapon === weapons.SCISSORS) {
                setGameStatus(outcome.WIN, "✂️", "✋");

                break;
            }
            else if (userWeapon === weapons.PAPER) {
                setGameStatus(outcome.TIE, "✋", "✋");
                computerWeapon = generateComputerWeapon();

                break;
            }
            else if (userWeapon === weapons.ROCK) {
                setGameStatus(outcome.LOSE, "✊", "✋");

                break;
            }
        case weapons.SCISSORS:
            if (userWeapon === weapons.SCISSORS) {
                setGameStatus(outcome.TIE, "✂️", "✂️");
                computerWeapon = generateComputerWeapon();

                break;
            }
            else if (userWeapon === weapons.PAPER) {
                setGameStatus(outcome.LOSE, "✋", "✂️");

                break;
            }
            else if (userWeapon === weapons.ROCK) {
                setGameStatus(outcome.WIN, "✊", "✂️");

                break;
            }
    }

    const weaponButtons = document.querySelector(".weapons");
    const toResultsButton = document.querySelector(".to-results");

    if (gameState !== outcome.TIE) { 
        hideWeaponButtons(weaponButtons);
        showResultsButton(toResultsButton);

        toResultsButton.addEventListener("click", () => {
            displayNextSection("showResults");
        });
    }
}

function generateComputerWeapon() {
    let computerWeapons = ["rock", "paper", "scissors"];
    let random = generateRandomWholeNumber(0, computerWeapons.length);
    let computerWeapon = computerWeapons[random];

    return computerWeapon;
}

function generateRandomWholeNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function setGameStatus(gameStateString, userWeaponEmoji, computerWeaponEmoji) {
    gameState = gameStateString;

    userWeaponDisplay.textContent = userWeaponEmoji;
    computerWeaponDisplay.textContent = computerWeaponEmoji;
    outcomeDisplay.textContent = gameStateString;
    outcomeDisplay.style.visibility = STYLE_VISIBILITY.VISIBLE;
}

const STYLE_DISPLAY = {
    NONE: "none",
    FLEX: "flex",
    BLOCK: "block"
}

function hideWeaponButtons(weaponButtons) {
    weaponButtons.style.display = STYLE_DISPLAY.NONE;
}

function showResultsButton(resultButton) {
    resultButton.style.display = STYLE_DISPLAY.FLEX;
}

const resultChoiceText = document.querySelector("#final-choice-text");

function setResultTexts() {
    if (gameState === outcome.WIN) {
        resultChoiceText.textContent = userSelectedChoice; //User won; user gets selected choice
    }
    else {
        resultChoiceText.textContent = userNotSelectedChoice; //User lose; user gets not selected choice
    }
}


function displayNextSection(section) {
    const firstSection = document.querySelector("#first-section");
    const rockPaperScissorsSection = document.querySelector("#rock-paper-scissors-section");
    const resultsSection = document.querySelector("#results-section");

    if (section === "rockPaperScissors") {
        displayGameSection(firstSection, rockPaperScissorsSection);
    }
    else if (section === "showResults") {
        displayResultsSection(rockPaperScissorsSection, resultsSection);
    }
}

function displayGameSection(firstSection, rockPaperScissorsSection) {
    firstSection.style.transform = "translateX(100%)";
        
    rockPaperScissorsSection.style.display = STYLE_DISPLAY.BLOCK;
    setTimeout(() => {
        rockPaperScissorsSection.style.transform = "translateY(-122%)";
        rockPaperScissorsSection.style.opacity = "1";
    }, 10);

    userSelectsWeapon();
}

function displayResultsSection(rockPaperScissorsSection, resultsSection) {
    rockPaperScissorsSection.style.translate = "100% 0px 0px";

    resultsSection.style.display = STYLE_DISPLAY.FLEX;
    setTimeout(() => {
        resultsSection.style.transform = "translateY(-500%)";
        resultsSection.style.opacity = "1";
    }, 10);

    setResultTexts();
}
