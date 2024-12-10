const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

function drawGraph() {

    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    drawAxes();

    const equation1Input = document.getElementById("expression").value;  
    const equation2Input = document.getElementById("expression2").value;  

    const expr1 = equation1Input.replace(/x/g, "x1");
    const expr2 = equation2Input.replace(/x/g, "x1");

    const startX = -canvas.width / 2;
    const endX = canvas.width / 2;
    const step = 0.01;

    ctx.beginPath();
    for (let x = startX; x <= endX; x += step) {
        const y = evaluateExpression(expr1, x); 
        const screenX = x + canvas.width / 2;
        const screenY = -y + canvas.height / 2;

        if (x === startX) {
            ctx.moveTo(screenX, screenY);
        } else {
            ctx.lineTo(screenX, screenY);
        }
    }
    ctx.strokeStyle = "violet";  
    ctx.stroke();

    ctx.beginPath();
    for (let x = startX; x <= endX; x += step) {
        const y = evaluateExpression(expr2, x);  
        const screenX = x + canvas.width / 2;
        const screenY = -y + canvas.height / 2;

        if (x === startX) {
            ctx.moveTo(screenX, screenY);
        } else {
            ctx.lineTo(screenX, screenY);
        }
    }
    ctx.strokeStyle = "#7a80e9 "; 
    ctx.stroke();
}

function evaluateExpression(expr, x) {
    const x1 = x;
    try {
        return eval(expr);  x
    } catch (e) {
        alert("Invalid expression");
        return 0;
    }
}

function drawAxes() {
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "white";
    ctx.stroke();
}
