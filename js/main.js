import { makeBox } from "./boxes.mjs";
import { welcome } from "./welcome.mjs";
import { resultForAllTests } from "./score.mjs";
import { quiz } from "./testOne.mjs";
import { fizzBuzz } from "./testTwo.mjs";
// import { memory } from "./testThree.mjs";
import { visual } from "./testFour.mjs";
import { perception } from "./testFive.mjs";

const bottomDiv = document.getElementById("bottom");
const testDiv = document.getElementById("test");

/** Load welcome screen on startup */
welcome.start(testDiv);

/** List with all tests */
// const testOrder = [welcome, memory, resultForAllTests];
const testOrder = [welcome, quiz, fizzBuzz, visual, perception, resultForAllTests];
let currentTest = 0;
let nextTest = currentTest + 1;

/** Create and append button */
const nextButton = makeBox(
    { width: "250px", height: "60px" },
    "1px solid black",
    "yellow",
    "0",
    testOrder[nextTest].name
);
bottomDiv.appendChild(nextButton);

/**
 * game loop to do all available tests
 * @function startNextTest
 * @returns void
 */
function startNextTest () {
    testOrder[currentTest].reportScore();
    testOrder[currentTest].done();
    testOrder[nextTest].start(testDiv);
    /** stop updating nextTest when at last test */
    currentTest = nextTest;
    if (currentTest < (testOrder.length - 1)) {
        nextTest += 1;
    };
    nextButton.innerHTML = testOrder[nextTest].name;
    nextButton.style.display = "none";
};

/** eventListener function */
nextButton.addEventListener("click", startNextTest);

/**
 * resets current test from the console
 */
window.reset = function () {
    console.log("reset");
    testOrder[currentTest].reset();
    if (testOrder[currentTest] !== welcome) {
        nextButton.style.display = "none";
    };
};

/**
 * shows next test button. used by tests to notify that they are done
 * @function imDoneStartNextTest
 * @returns void
 */
function imDoneStartNextTest () {
    nextButton.style.display = "inline-block";
};

export { imDoneStartNextTest };
