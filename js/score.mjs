import { testWelcome } from "./helpers.mjs";

const testName = "Resultat";
const resultHeader = "Ditt resultat blev";
let resultText = "placeholder fiskpinne";
let testContainer = "";

const parentElement = document.getElementById("result");
const scoreBoards = [];

const totalScore = {
    testName: "Totalt",
    score: 0,
    maxScore: 0
};

/**
 * Updates total score and total possible max score
 * @function updateTotalScore
 * @param {number} score
 * @param {number} maxScore
 * @returns void
 */
function updateTotalScore (score, maxScore) {
    totalScore.score += score;
    totalScore.maxScore += maxScore;
};

/**
 * Draws the actual scoreboard to parent with id="result".
 * @function addScoreElementToParent
 * @param {object} element single scoreboard or total score.
 * @returns void
 */
function addScoreElementToParent (element) {
    const testNameElement = document.createElement("h3");
    const testScoreElement = document.createElement("p");
    testNameElement.innerHTML = `${element.testName}`;
    testNameElement.style.paddingTop = "10px";
    testScoreElement.innerHTML = `${element.score} av ${element.maxScore} poäng`;
    parentElement.appendChild(testNameElement);
    parentElement.appendChild(testScoreElement);
};

/**
 * Display score for all completed tests and total score.
 * @function displayScoreBoards
 * @returns void
 */
function displayScoreBoards () {
    deleteScoresFromPage();
    for (const test of scoreBoards) {
        addScoreElementToParent(test);
    }
    addScoreElementToParent(totalScore);
};

/**
 * clears all elements from div with id="result".
 * @function deleteScoresFromPage
 * @returns void
 */
function deleteScoresFromPage () {
    parentElement.innerHTML = "";
};

/**
 * Used by tests to report test score
 * @function reportTestScore
 * @param {string} testName
 * @param {number} score
 * @param {number} maxScore
 * @returns void
 */
function reportTestScore (testName, score, maxScore) {
    const scoreBoard = {
        testName: testName,
        score: score,
        maxScore: maxScore
    };
    scoreBoards.push(scoreBoard);
    updateTotalScore(score, maxScore);
    displayScoreBoards();
};

/** ------------------------Final test results------------------------------- */

/**
 * Super advanced algoritm to calculate IQ.
 * @function calculateIq
 * @returns void
 */
function calculateIq () {
    const score = totalScore.score;
    const maxScore = totalScore.maxScore;
    resultText = `Du fick ${score} av ${maxScore} poäng, det motsvarar.. IQ = `;
    if (score < maxScore / 3) {
        resultText += "Men herregud! Om Darwin levt hade han skrivit ett eget kapitel om dig. 1 av 4 p fick du din stackare.";
    } else if (score < maxScore / 2) {
        resultText += "Hmmm. Det var ganska så kasst. 2 av 4 p skrapade du ihop.";
    } else if (score < maxScore / 3 * 2) {
        resultText += "Helt OK. 3 av 4 p.";
    } else {
        resultText += "Gigantisk!!! så stor måste din hjärna vara! 4 av 4 p, full pott!";
    };
};

/**
 * Shows result screen.
 * @function startTest
 * @returns void
 */
function startTest () {
    calculateIq();
    testWelcome(testContainer, resultHeader, resultText);
};

/**
 * Clears result screen.
 * @function clearParentElement
 * @returns void
 */
function clearParentElement () {
    testContainer.innerHTML = "";
};

/**
 * Resets result screen.
 * @function resetTest
 * @returns void
 */
function resetTest () {
    clearParentElement();
    startTest();
};

/**
 * Makes the result screen just as any other test.
 * start() to show test.
 * done() to clear div when test is done. (this is last test so never happens)
 * reset() for window.reset().
 * reportScore() not used in this test module.
 */
const resultForAllTests = {
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
        console.log("Stop staring at the console, look at the test instead!");
    }
};

export { resultForAllTests, reportTestScore };
