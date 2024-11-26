// Get the canvas context
const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

// Function to plot the graph
function drawGraph() {
    const exprInput = document.getElementById("expression").value;

    if (!exprInput) {
        alert("Please enter an expression!");
        return;
    }

    const expr = exprInput.replace(/x/g, "x1");  // Replace 'x' with 'x1' to avoid conflicts with JS variable

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set up the axes
    drawAxes();

    // Set up the graphing range (adjust as needed)
    const startX = -canvas.width / 2;
    const endX = canvas.width / 2;
    const step = 0.1;

    // Draw the function
    ctx.beginPath();
    for (let x = startX; x <= endX; x += step) {
        const y = evaluateExpression(expr, x);
        const screenX = x + canvas.width / 2;
        const screenY = -y + canvas.height / 2;
        
        if (x === startX) {
            ctx.moveTo(screenX, screenY);
        } else {
            ctx.lineTo(screenX, screenY);
        }
    }
    ctx.strokeStyle = "blue";
    ctx.stroke();
}

// Function to evaluate the mathematical expression
function evaluateExpression(expr, x) {
    // Using a simple method to safely evaluate the expression
    const x1 = x;
    try {
        return eval(expr);
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
    ctx.strokeStyle = "black";
    ctx.stroke();
}
