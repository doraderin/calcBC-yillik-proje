// Get the canvas context
const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

// Function to plot the graph
function drawGraph() {
    const equation1Input = document.getElementById("expression").value;  // Get first equation input
    const equation2Input = document.getElementById("expression2").value;  // Get second equation input

    if (!equation1Input || !equation2Input) {  // Check if both equations are empty
        alert("Please enter both expressions!");
        return;
    }

    // Replace 'x' with 'x1' for both equations
    const expr1 = equation1Input.replace(/x/g, "x1");
    const expr2 = equation2Input.replace(/x/g, "x1");

    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clears the entire canvas to update the graph

    drawAxes();

    // Graphing range, division by 2 gets center
    const startX = -canvas.width / 2;
    const endX = canvas.width / 2;
    const step = 0.01;

    // Graph for equation 1
    ctx.beginPath();
    for (let x = startX; x <= endX; x += step) {
        const y = evaluateExpression(expr1, x);  // Compute the y-value for the first equation
        const screenX = x + canvas.width / 2;
        const screenY = -y + canvas.height / 2;

        if (x === startX) {
            ctx.moveTo(screenX, screenY);
        } else {
            ctx.lineTo(screenX, screenY);
        }
    }
    ctx.strokeStyle = "violet";  // Color for the first equation
    ctx.stroke();

    // Graph for equation 2
    ctx.beginPath();
    for (let x = startX; x <= endX; x += step) {
        const y = evaluateExpression(expr2, x);  // Compute the y-value for the second equation
        const screenX = x + canvas.width / 2;
        const screenY = -y + canvas.height / 2;

        if (x === startX) {
            ctx.moveTo(screenX, screenY);
        } else {
            ctx.lineTo(screenX, screenY);
        }
    }
    ctx.strokeStyle = "#7a80e9 ";  // Color for the second equation
    ctx.stroke();
}

// Function to evaluate the mathematical expression
function evaluateExpression(expr, x) {
    // Using a simple method to safely evaluate the expression
    const x1 = x;
    try {
        return eval(expr);  // Evaluates the expression for each value of x
    } catch (e) {
        alert("Invalid expression");
        return 0;
    }
}

// Function to draw axes
function drawAxes() {
    ctx.beginPath();
    // X-axis (horizontal)
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    // Y-axis (vertical)
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "white";
    ctx.stroke();
}
