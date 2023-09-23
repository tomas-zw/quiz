/**
 * draws a <h3> and <p> to div
 * @function testWelcome
 * @param {HTMLElement} container
 * @param {string} header gives header id="testheader"
 * @param {string} bodyText gives text id="testtext"
 * @returns void
 */
function testWelcome (container, header, bodyText) {
    const headerElement = document.createElement("h3");
    const textElement = document.createElement("p");
    headerElement.id = "testheader";
    headerElement.innerHTML = header;
    textElement.id = "testtext";
    textElement.innerHTML = bodyText;
    container.appendChild(headerElement);
    container.appendChild(textElement);
};

/**
 * shuffle items in list
 * @function shuffleItems
 * @param {array} listOfItems
 * @returns void
 */
function shuffleItems (listOfItems) {
    for (let i = listOfItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = listOfItems[i];
        listOfItems[i] = listOfItems[j];
        listOfItems[j] = temp;
    };
};

export { testWelcome, shuffleItems };
