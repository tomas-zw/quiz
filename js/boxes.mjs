const defaultBorder = "1px solid black";

const squareDefaultSize = {
    width: "100px",
    height: "100px"
};

const rectangleDefaultSize = {
    width: "100px",
    height: "50px"
};

const circleDefaultSize = squareDefaultSize;

const triangleDefaultSize = {
    width: "50px solid transparent",
    height: "100px solid"
};

const allSquares = [
    {
        description: "Röd kvadrat",
        id: "square1",
        size: squareDefaultSize,
        border: defaultBorder,
        background: "red",
        radius: "0"
    },
    {
        description: "Grön kvadrat",
        id: "square2",
        size: squareDefaultSize,
        border: defaultBorder,
        background: "green",
        radius: "0"
    },
    {
        description: "Blå kvadrat",
        id: "square3",
        size: squareDefaultSize,
        border: defaultBorder,
        background: "blue",
        radius: "0"
    }
];

const allRectangles = [
    {
        description: "Gul rektangel",
        id: "rectangle1",
        size: rectangleDefaultSize,
        border: defaultBorder,
        background: "yellow",
        radius: "0"
    },
    {
        description: "Röd rektangel",
        id: "rectangle2",
        size: rectangleDefaultSize,
        border: defaultBorder,
        background: "red",
        radius: "0"
    },
    {
        description: "Blå rektangel",
        id: "rectangle3",
        size: rectangleDefaultSize,
        border: defaultBorder,
        background: "blue",
        radius: "0"
    }
];

const allCircles = [
    {
        description: "Gul cirkel",
        id: "circle1",
        size: circleDefaultSize,
        border: defaultBorder,
        background: "yellow",
        radius: "50%"
    },
    {
        description: "Röd cirkel",
        id: "circle2",
        size: circleDefaultSize,
        border: defaultBorder,
        background: "red",
        radius: "50%"
    }
];

const allTriangles = [
    {
        description: "Grön triangel",
        id: "triangle1",
        leftAndRightBorder: triangleDefaultSize.width,
        bottomBorder: triangleDefaultSize.height,
        background: "green"
    },
    {
        description: "Röd triangel",
        id: "circle2",
        leftAndRightBorder: triangleDefaultSize.width,
        bottomBorder: triangleDefaultSize.height,
        background: "red"
    }
];

/**
 * creates triangle HTMLelements and adds them to fullList
 * @function makeTriangle
 * @param {array} listOfTriangles
 * @param {array} fullList
 * @returns void
 */
function makeTriangle (listOfTriangles, fullList) {
    for (const triangle of listOfTriangles) {
        const tempTriangle = document.createElement("div");
        tempTriangle.id = triangle.id;
        tempTriangle.style.width = 0;
        tempTriangle.style.height = 0;
        tempTriangle.style.borderLeft = triangle.leftAndRightBorder;
        tempTriangle.style.borderRight = triangle.leftAndRightBorder;
        tempTriangle.style.borderBottom = `${triangle.bottomBorder} ${triangle.background}`;
        tempTriangle.style.display = "inline-block";
        tempTriangle.style.margin = "10px";
        const temp = {
            id: triangle.id,
            description: triangle.description,
            box: tempTriangle
        };
        fullList.push(temp);
    };
};

/**
 * creates HTMLelements and adds them to fullList
 * @function makeShapes
 * @param {array} listOfshapes
 * @param {array} fullList
 * @returns void
 */
function makeShapes (listOfshapes, fullList) {
    for (const shape of listOfshapes) {
        const tempbox = makeBox(shape.size, shape.border, shape.background, shape.radius, "");
        tempbox.id = shape.id;
        tempbox.style.margin = "10px";
        const temp = {
            id: shape.id,
            description: shape.description,
            box: tempbox
        };
        fullList.push(temp);
    };
};

/**
 * returns a list with HTMLelements and their description and id.
 * @function getAllShapes
 * @returns array
 */
function getAllShapes () {
    const allShapes = [];
    makeShapes(allSquares, allShapes);
    makeShapes(allRectangles, allShapes);
    makeShapes(allCircles, allShapes);
    makeTriangle(allTriangles, allShapes);
    return allShapes;
};

/**
 * Creates a box.
 * @function makeBox
 * @param {object} size width: "string", height: "string"
 * @param {string} border
 * @param {string} background
 * @param {string} radius
 * @param {string} text
 * @returns HTMLDivElement
 */
function makeBox (size, border, background, radius, text) {
    const shape = document.createElement("div");
    // const textElement = document.createElement("p");
    // textElement.innerHTML = text;
    // textElement.style.padding = "10px";

    shape.innerHTML = text;
    shape.style.padding = "10px";
    shape.style.textAlign = "center";
    shape.style.width = size.width;
    shape.style.height = size.height;
    shape.style.border = border;
    shape.style.backgroundColor = background;
    shape.style.borderRadius = radius;
    // shape.appendChild(textElement);
    shape.style.display = "inline-block";
    shape.style.marginInline = "10px";
    // shape.style.alignSelf = "end";
    // shape.style.justifySelf = "center";

    return shape;
};

/**
 * creates default start button
 * @function makeStartGameButton
 * @param {string} text
 * @returns HTMLDivElement
 */
function makeStartGameButton (text) {
    const size = { width: "200px", height: "60px" };
    const border = "1px solid black";
    const backgroundColor = "white";
    const radius = "5px";
    const box = makeBox(size, border, backgroundColor, radius, text);
    box.style.alignSelf = "end";
    box.style.justifySelf = "center";
    return box;
};

export { makeBox, makeStartGameButton, getAllShapes };
