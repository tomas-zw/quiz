import { makeStartGameButton } from "./boxes.mjs";
import { shuffleItems, testWelcome } from "./helpers.mjs";
import { imDoneStartNextTest } from "./main.js";
import { reportTestScore } from "./score.mjs";

/** TODO */

const testName = "memory";
const testHeader = "Minne";
const testText = `Du kommer få se 9 bilder under 5 sekunder, därefter får du en lista
    med namnen på bilderna. Du skall då klicka på den rutan som motsvarar där bilden
    låg. Du får fortsätta så länge du gissar rätt, gissar du fel är testet över.`;

let testContainer = "";
let score = 0;
const maxScore = 9;
// let header = ""; // HTMLElement set in startTest()
let bodyText = ""; // HTMLElement set in startTest()
let startGameButton = ""; // HTMLElement set in startTest()

/** ---------------------------------test------------------------------------- */
const path = "./img";
const images = [
    { img: "danmark.png", alt: "danmarks flagga" },
    { img: "estland.png", alt: "estlands flagga" },
    { img: "frankrike.png", alt: "frankrikes flagga" },
    { img: "grekland.png", alt: "greklands flagga" },
    { img: "holland.png", alt: "hollands flagga" },
    { img: "island.png", alt: "islands flagga" },
    { img: "italien.png", alt: "italiens flagga" },
    { img: "katalonien.png", alt: "kataloniens flagga" },
    { img: "norge.png", alt: "norges flagga" }
];
let fiveSecTimer = "";
const visualContainer = document.createElement("div");
visualContainer.setAttribute("class", "visual");
const shapeContainer = document.createElement("div");
shapeContainer.setAttribute("class", "shape");
const textContainer = document.createElement("div");
textContainer.setAttribute("class", "text");
visualContainer.style.display = "grid";
visualContainer.style.gridTemplateColumns = "200px 1fr";
textContainer.style.textAlign = "left";

function startMemoryTest () {
    startGameButton.removeEventListener("click", startMemoryTest);
    startGameButton.style.display = "none";
    bodyText.innerHTML = "";
    visualContainer.appendChild(textContainer);
    visualContainer.appendChild(shapeContainer);
    testContainer.appendChild(visualContainer);
    showFlags();
    showText();
    fiveSecTimer = setTimeout(startTimer, 1000);
    /** --------remove. just to please linter--------------- */
    clearTimeout(fiveSecTimer);
    testDone("bla bla");
};

function startTimer () {
    console.log("timer");
    const allImages = shapeContainer.getElementsByTagName("img");
    console.log(allImages);
    for (const img of allImages) {
        img.setAttribute("opacity", "0.1");
    };
};

function showText () {
    shuffleItems(images);
    let counter = 1;
    for (const flag of images) {
        const textDiv = document.createElement("p");
        textDiv.innerHTML = `${counter}. ${flag.alt}`;
        textContainer.appendChild(textDiv);
        counter += 1;
    };
};

function showFlags () {
    shuffleItems(images);
    for (const flag of images) {
        const flagDiv = document.createElement("img");
        flagDiv.setAttribute("src", `${path}/${flag.img}`);
        flagDiv.setAttribute("alt", flag.alt);
        flagDiv.setAttribute("height", "140px");
        flagDiv.setAttribute("width", "140px");
        flagDiv.setAttribute("object-fit", "contain");
        shapeContainer.appendChild(flagDiv);
    };
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
    startGameButton.addEventListener("click", startMemoryTest);
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
    startTest();
    score = 0;
};

/**
 * start() to show test.
 * done() to clear div when test is done.
 * reset() for window.reset().
 * reportScore() report score to scoreboard.
 */
const memory = {
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

export { memory };
