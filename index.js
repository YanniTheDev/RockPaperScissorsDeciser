const firstPageContinueButton = document.querySelector("#first-page-continue-button");

firstPageContinueButton.addEventListener("click", getChoices);

function getChoices() {
    const choices = [];
    choices[0] = document.querySelector("#choice1");
    choices[1] = document.querySelector("#choice2");

    const selectedChoice = document.querySelector("#selected-choice")
    
    checkChoices(choices, selectedChoice);
}

function checkChoices(userChoices, selectedChoice) {
    const warningText = document.querySelector("#user-choice-input-warning");

    for (i = 0; i < userChoices.length; i++)
    {
        if (userChoices[i].value === "") //Empty string
        {
            userChoices[i].style.borderColor = "red";
            warningText.style.display = "block"; //Shows warning to user to input TWO choices
        }
        else {
            userChoices[i].style.borderColor = "rgb(30, 30, 30)";
        }
    }

    const selectedChoiceWarning = document.querySelector("#user-selected-choice-warning");

    if (selectedChoice.value != userChoices[0].value || selectedChoice.value != userChoices[1].value) {
        selectedChoice.style.borderColor = "red";
        selectedChoiceWarning.style.display = "block"; //Shows warning to user to match the selected choice to one of the above to choices
    }
    if (selectedChoice.value == userChoices[0].value || selectedChoice.value == userChoices[1].value) {
        selectedChoice.style.borderColor = "rgb(30, 30, 30)";
        selectedChoiceWarning.style.display = "none";
    }

    checkIfValidToProceed([userChoices[0].value, userChoices[1].value], selectedChoice);
}

let userSelectedChoice;
let userNotSelectedChoice;

function checkIfValidToProceed(userChoiceValues, selectedChoice) {
    validToProceed = false;
    if (userChoiceValues[0] !== "" && userChoiceValues[1] !== "")
    {
        if (userChoiceValues.includes(selectedChoice.value)) {
            validToProceed = true;
        }
    }

    if (validToProceed) {
        userSelectedChoice = selectedChoice.value; //Assigning the verified selected choice to a global variable

        let indexOfUserSelectedChoice = userChoiceValues.indexOf(userSelectedChoice); //Assigns the index of the selected value
        userChoiceValues.splice(indexOfUserSelectedChoice, 1); //Deletes the choice

        userNotSelectedChoice = userChoiceValues[0]; //Assings the remaining item as the choice the user did not select

        proceedToNextSection("rockPaperScissors");
    }
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

function gameOn(userWeapon) {
    const computerWeapon = generateComputerWeapon();

    const userWeaponDisplay = document.querySelector("#user-weapon");
    const computerWeaponDisplay = document.querySelector("#computer-weapon");
    const outcomeDisplay = document.querySelector("#outcome-display-text");

    switch (computerWeapon) {
        case "rock":
            if (userWeapon === "scissors") {
                gameState = "YOU LOSE!";

                userWeaponDisplay.textContent = "✂️";
                computerWeaponDisplay.textContent = "✊";
                outcomeDisplay.textContent = gameState;
                outcomeDisplay.style.visibility = "visible";

                break;
            }
            else if (userWeapon === "paper") {
                gameState = "YOU WON!";

                userWeaponDisplay.textContent = "✋";
                computerWeaponDisplay.textContent = "✊";
                outcomeDisplay.textContent = gameState;
                outcomeDisplay.style.visibility = "visible";

                break;
            }
            else if (userWeapon === "rock") {
                gameState = "TIE! TRY AGAIN";

                userWeaponDisplay.textContent = "✊";
                computerWeaponDisplay.textContent = "✊";
                outcomeDisplay.textContent = gameState;
                outcomeDisplay.style.visibility = "visible";

                break;
            }
        case "paper":
            if (userWeapon === "scissors") {
                gameState = "YOU WON!";

                userWeaponDisplay.textContent = "✂️";
                computerWeaponDisplay.textContent = "✋";
                outcomeDisplay.textContent = gameState;
                outcomeDisplay.style.visibility = "visible";

                break;
            }
            else if (userWeapon === "paper") {
                gameState = "TIE! TRY AGAIN";

                userWeaponDisplay.textContent = "✋";
                computerWeaponDisplay.textContent = "✋";
                outcomeDisplay.textContent = gameState;
                outcomeDisplay.style.visibility = "visible";

                break;
            }
            else if (userWeapon === "rock") {
                gameState = "YOU LOSE!";

                userWeaponDisplay.textContent = "✊";
                computerWeaponDisplay.textContent = "✋";
                outcomeDisplay.textContent = gameState;
                outcomeDisplay.style.visibility = "visible";

                break;
            }
        case "scissors":
            if (userWeapon === "scissors") {
                gameState = "TIE! TRY AGAIN";

                userWeaponDisplay.textContent = "✂️";
                computerWeaponDisplay.textContent = "✂️";
                outcomeDisplay.textContent = gameState;
                outcomeDisplay.style.visibility = "visible";

                break;
            }
            else if (userWeapon === "paper") {
                gameState = "YOU LOSE!";

                userWeaponDisplay.textContent = "✋";
                computerWeaponDisplay.textContent = "✂️";
                outcomeDisplay.textContent = gameState;
                outcomeDisplay.style.visibility = "visible";

                break;
            }
            else if (userWeapon === "rock") {
                gameState = "YOU WON!";

                userWeaponDisplay.textContent = "✊";
                computerWeaponDisplay.textContent = "✂️";
                outcomeDisplay.textContent = gameState;
                outcomeDisplay.style.visibility = "visible";

                break;
            }
    }

    const weaponButtons = document.querySelector(".weapons");
    const toResultsButton = document.querySelector(".to-results");

    switch (gameState) {
        case "YOU WON!":
            weaponButtons.style.display = "none"; //Hides weapons, users can no longer pick rock paper or scissors
            toResultsButton.style.display = "flex"; //Shows proceed button

            toResultsButton.addEventListener("click", () => {
                proceedToNextSection("showResults");
            });

            break;
        case "YOU LOSE!":
            weaponButtons.style.display = "none"; //Hides weapons, users can no longer pick rock paper or scissors
            toResultsButton.style.display = "flex"; //Shows proceed button

            toResultsButton.addEventListener("click", () => {
                proceedToNextSection("showResults");
            });

            break
    }
}

const resultChoiceText = document.querySelector("#final-choice-text");

function showResult () {
    if (gameState === "YOU WON!") {
        resultChoiceText.textContent = userSelectedChoice;
    }
    else {
        resultChoiceText.textContent = userNotSelectedChoice;
    }
}

function generateComputerWeapon() {
    let random = Math.floor(Math.random() * 3) + 1;
    let computerWeapon;

    switch (random) {
        case 1:
            computerWeapon = "rock";
            break;
        case 2:
            computerWeapon = "paper";
            break;
        case 3:
            computerWeapon = "scissors";
            break;
    }

    return computerWeapon;
}

const firstSection = document.querySelector("#first-section");
const rockPaperScissorsSection = document.querySelector("#rock-paper-scissors-section");
const resultsSection = document.querySelector("#results-section");

function proceedToNextSection(section) {
    if (section === "rockPaperScissors") {
        firstSection.style.transform = "translateX(100%)";
        
        rockPaperScissorsSection.style.display = "block";
        setTimeout(() => {
            rockPaperScissorsSection.style.transform = "translateY(-122%)";
            rockPaperScissorsSection.style.opacity = "1";
        }, 10);

        userSelectsWeapon();
    }
    else if (section === "showResults") {
        rockPaperScissorsSection.style.translate = "100% 0px 0px";

        resultsSection.style.display = "flex";
        setTimeout(() => {
            resultsSection.style.transform = "translateY(-600%)";
            resultsSection.style.opacity = "1";
        }, 10);

        showResult();
    }
}