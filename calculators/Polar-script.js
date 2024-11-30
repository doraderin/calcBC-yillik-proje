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

    // Replace 'x' with 'theta' in both equations (polar)
    const expr1 = equation1Input.replace(/x/g, "theta");
    const expr2 = equation2Input.replace(/x/g, "theta");

    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clears the entire canvas to update the graph

    drawAxes();  // Draw axes

    // Graphing range for angles (theta)
    const startTheta = 0;
    const endTheta = Math.PI * 2;  // One full rotation (0 to 2π)
    const step = 0.01;  // Smaller step for smooth graph

    // Graph for equation 1 (polar)
    ctx.beginPath();
    for (let theta = startTheta; theta <= endTheta; theta += step) {
        const r = evaluateExpression(expr1, theta);  // Compute r for the first equation
        const screenX = r * Math.cos(theta) + canvas.width / 2;  // Convert polar to Cartesian x
        const screenY = r * Math.sin(theta) + canvas.height / 2;  // Convert polar to Cartesian y

        if (theta === startTheta) {
            ctx.moveTo(screenX, screenY);
        } else {
            ctx.lineTo(screenX, screenY);
        }
    }
    ctx.strokeStyle = "violet";  // Color for the first equation
    ctx.stroke();

    // Graph for equation 2 (polar)
    ctx.beginPath();
    for (let theta = startTheta; theta <= endTheta; theta += step) {
        const r = evaluateExpression(expr2, theta);  // Compute r for the second equation
        const screenX = r * Math.cos(theta) + canvas.width / 2;  // Convert polar to Cartesian x
        const screenY = r * Math.sin(theta) + canvas.height / 2;  // Convert polar to Cartesian y

        if (theta === startTheta) {
            ctx.moveTo(screenX, screenY);
        } else {
            ctx.lineTo(screenX, screenY);
        }
    }
    ctx.strokeStyle = "#7a80e9";  // Color for the second equation
    ctx.stroke();
}

// Function to evaluate the mathematical expression
function evaluateExpression(expr, theta) {
    // Using a simple method to safely evaluate the expression
    const x = theta;
    try {
        return eval(expr);  // Evaluates the expression for each value of theta (polar)
    } catch (e) {
        alert("Invalid expression");
        return 0;
    }
}

//draws the axis
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
