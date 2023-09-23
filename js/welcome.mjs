import { testWelcome } from "./helpers.mjs";

const testName = "Välkommen";
const welcomeHeader = "Felande länken eller Geni?";
const welcomeText = "Du kommer få ta fem test och din slutpoäng körs igenom den mest avancerade algoritm världen har skådat. Resultatet visar med 100% säkerhet din IQ. Jag lovar.";

let testContainer = "";

/**
 * Shows welcome screen.
 * @function startTest
 * @returns void
 */
function startTest () {
    testWelcome(testContainer, welcomeHeader, welcomeText);
};

/**
 * Clears parentElement.
 * @function clearParentElement
 * @returns void
 */
function clearParentElement () {
    testContainer.innerHTML = "";
};

/**
 * Resets welcome screen.
 * @function resetTest
 * @returns void
 */
function resetTest () {
    clearParentElement();
    startTest();
};

/**
 * Makes the welcome screen just as any other test.
 * start() to show test.
 * done() to clear div when test is done.
 * reset() for window.reset().
 * reportScore() not used in this test module.
 */
const welcome = {
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
        console.log("No scores to report.");
    }
};

export { welcome };
