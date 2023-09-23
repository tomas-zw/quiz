import { makeStartGameButton, getAllShapes } from "./boxes.mjs";
import { shuffleItems, testWelcome } from "./helpers.mjs";
import { imDoneStartNextTest } from "./main.js";
import { reportTestScore } from "./score.mjs";

const testName = "Visuellt test";
const testHeader = "Visuellt test";
const testText = `Du kommer få en numrerad lista som beskriver olika former. Du får 1 poäng om du klickar på bilden listan beskriver, 0 poäng om du klickar fel. Du får ett försök per text i listan, därefter är det nästa text i listan som du ska följa. Du har 10 sekunder på dig.`;

let testContainer = "";
let score = 0;
const maxScore = 10;
// let header = ""; // HTMLElement set in startTest()
let bodyText = ""; // HTMLElement set in startTest()
let startGameButton = ""; // HTMLElement set in startTest()

/** ------------------------------test---------------------------------------- */

const visualContainer = document.createElement("div");
const shapeContainer = document.createElement("div");
const textContainer = document.createElement("div");
visualContainer.style.display = "grid";
visualContainer.style.gridTemplateColumns = "140px 1fr";
textContainer.style.textAlign = "left";
let allShapes = [];
let currentShape = 0;
let tenSecTimer = "";
let allTextElements = "";

/**
 * starts the test
 * @function startVisualTest
 * @returns void
 */
function startVisualTest () {
    startGameButton.removeEventListener("click", startVisualTest);
    startGameButton.style.display = "none";
    bodyText.innerHTML = "";
    visualContainer.appendChild(textContainer);
    visualContainer.appendChild(shapeContainer);
    testContainer.appendChild(visualContainer);
    allShapes = getAllShapes();
    showShapes();
    showText();
    allTextElements[currentShape].style.opacity = "1";
    tenSecTimer = setTimeout(timeOutDone, 10000);
};

/**
 * clears timeout
 * @function timeOutDone
 * @returns void
 */
function timeOutDone () {
    const result = `Du fick ${score} av ${maxScore} möjliga poäng.`;
    clearListenersOnShapes();
    testDone(result);
};

/**
 * clears all eventListeners
 * @function clearListenersOnShapes
 * @returns void
 */
function clearListenersOnShapes () {
    const shapes = shapeContainer.getElementsByTagName("div");
    for (const shape of shapes) {
        shape.removeEventListener("click", checkIfCorrectAnswer);
    };
};

/**
 * shows shapes
 * @function showShapes
 * @returns void
 */
function showShapes () {
    shuffleItems(allShapes);
    for (const shape of allShapes) {
        addEventListenerToShapes(shape.box);
        shapeContainer.appendChild(shape.box);
    };
};

/**
 * shows text for the shapes
 * @function showText
 * @returns void
 */
function showText () {
    shuffleItems(allShapes);
    let counter = 0;
    for (const shape of allShapes) {
        counter += 1;
        const tempText = document.createElement("p");
        tempText.style.paddingBottom = "5px";
        tempText.style.opacity = "0.1";
        tempText.innerHTML = `${counter}.${shape.description}`;
        textContainer.appendChild(tempText);
    };
    allTextElements = textContainer.getElementsByTagName("p");
};

/**
 * check if user picked the correct answer
 * @function checkIfCorrectAnswer
 * @returns void
 */
function checkIfCorrectAnswer () {
    if (currentShape < allShapes.length) {
        allTextElements[currentShape].style.opacity = "0.1";
        if (this.id === allShapes[currentShape].id) {
            score += 1;
        };
        if (currentShape === allShapes.length - 1) {
            clearListenersOnShapes();
        } else {
            currentShape += 1;
            allTextElements[currentShape].style.opacity = "1";
        };
    };
};

/**
 * adds eventlisteners to a shape
 * @function addEventListenerToShapes
 * @param {HTMLElement} shape
 * @returns void
 */
function addEventListenerToShapes (shape) {
    shape.addEventListener("click", checkIfCorrectAnswer);
};

/** -------------------------------------------------------------------------- */

/**
 * show test start screen
 * @function startTest
 * @returns void
 */
function startTest () {
    testWelcome(testContainer, testHeader, testText);
    // header = document.getElementById("testheader");
    bodyText = document.getElementById("testtext");
    startGameButton = makeStartGameButton("Starta test");
    testContainer.appendChild(startGameButton);
    addEventListenerToStartButton();
}

/**
 * adds listener to startbutton
 * @function addEventListenerToStartButton
 * @returns void
 */
function addEventListenerToStartButton () {
    startGameButton.addEventListener("click", startVisualTest);
};

/**
 * show result and notify main that test is done
 * @function testDone
 * @param {string} result
 * @returns void
 */
function testDone (result) {
    bodyText.innerHTML = result;
    imDoneStartNextTest();
};

/**
 * clears testcontainer
 * @function clearParentElement
 * @returns void
 */
function clearParentElement () {
    textContainer.innerHTML = "";
    shapeContainer.innerHTML = "";
    testContainer.innerHTML = "";
};

/**
 * clears and resets test
 * @function resetTest
 * @returns void
 */
function resetTest () {
    clearParentElement();
    score = 0;
    allShapes.length = 0;
    currentShape = 0;
    clearTimeout(tenSecTimer);
    startTest();
};

/**
 * start() to show test.
 * done() to clear div when test is done.
 * reset() for window.reset().
 * reportScore() report score to scoreboard.
 */
const visual = {
    name: testName,
    start: function (parentElement) {
        testContainer = parentElement;
        startTest();
    },
    done: function () {
        clearParentElement();
    },
    reset: function () {
        resetTest();
    },
    reportScore: function () {
        reportTestScore(testName, score, maxScore);
    }
};

export { visual };
